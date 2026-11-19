/**
 * The shared bead store: one connection and one state for the whole page.
 *
 * Components read its reactive fields (`bead.status`, `bead.vector`, ...) and call its methods.
 * Code that wants to react to events (a gate finished, a measurement) uses `bead.on(...)`.
 */
import { connectBle, supportsBluetooth } from './ble'
import { KETS, type GateName, type KetName, type Run, type Vec3 } from './gates'
import type { BeadLink, Connect } from './link'
import { commands, parseLine, splitLines, type BeadMessage } from './protocol'

/**
 * `unsupported`: no Web Bluetooth. `idle`: not paired. `connecting`: device picker open.
 * `waiting`: connected, waiting for the bead's READY. `live`: ready to use.
 */
export type BeadStatus = 'unsupported' | 'idle' | 'connecting' | 'waiting' | 'live'

/** Events emitted by the store, with their payloads. */
export type BeadEvents = {
  /** New state from the bead's periodic status line. */
  state: Vec3
  /** A gate finished. */
  gate: { gate: GateName; vector: Vec3 }
  /** A measurement finished. */
  measure: { bit: 0 | 1; vector: Vec3 }
}

type Listener<K extends keyof BeadEvents> = (payload: BeadEvents[K]) => void

class Bead {
  /** Connection status. */
  status = $state<BeadStatus>('idle')
  /** Last connection problem to show the reader, or an empty string. */
  error = $state('')
  /** Current state as a Bloch vector. */
  vector = $state<Vec3>([0, 0, 1])
  /** The gate currently armed on the bead, if any. */
  armed = $state<GateName | null>(null)
  /** The state when the armed gate was armed: the start of its rotation arc. */
  armedFrom = $state<Vec3 | null>(null)
  /** How far the armed gate has been turned, 0 to 1. */
  progress = $state(0)
  /** The reader is turning the bead about the wrong axis. */
  offAxis = $state(false)
  /** The armed gate's axis points (almost) up, so the bead cannot be turned about it. */
  axisVertical = $state(false)
  /** A basis state to highlight on the sphere (e.g. a challenge's target), or `null`. */
  target = $state<KetName | null>(null)
  /** Gates applied so far, grouped into runs. The last run is the current one. */
  runs = $state<Run[]>([{ start: '0', gates: [] }])
  /** How many times 0 and 1 were measured since the last reset. */
  counts = $state<[number, number]>([0, 0])
  /**
   * Id of the component currently driving the bead (a started challenge runner), or `null`.
   * Components that react to gate events should only do so while they are the controller.
   */
  controller = $state<string | null>(null)

  #link: BeadLink | null = null
  #rx = ''
  #helloTimer: ReturnType<typeof setInterval> | undefined
  #listeners: { [K in keyof BeadEvents]?: Set<Listener<any>> } = {}

  /** Mark the store `unsupported` if this browser has no Web Bluetooth. Call once on mount. */
  detect() {
    if (!supportsBluetooth()) this.status = 'unsupported'
  }

  /** Subscribe to an event. Returns the unsubscribe function (usable as an `$effect` cleanup). */
  on<K extends keyof BeadEvents>(event: K, fn: Listener<K>): () => void {
    const set = (this.#listeners[event] ??= new Set()) as Set<Listener<K>>
    set.add(fn)
    return () => {
      set.delete(fn)
    }
  }

  #emit<K extends keyof BeadEvents>(event: K, payload: BeadEvents[K]) {
    ;(this.#listeners[event] as Set<Listener<K>> | undefined)?.forEach((fn) => fn(payload))
  }

  /** Pair a bead. `connect` defaults to Bluetooth; pass another `Connect` for another transport. */
  async connect(connect: Connect = connectBle) {
    if (this.#link || this.status === 'unsupported' || this.status === 'connecting') return
    this.error = ''
    this.status = 'connecting'
    let droppedWhileConnecting = false
    let link: BeadLink
    try {
      link = await connect({
        onText: (chunk) => this.#onText(chunk),
        onClose: () => {
          if (this.#link) this.#onClosed('The bead disconnected.')
          else droppedWhileConnecting = true
        },
      })
    } catch (e) {
      this.status = 'idle'
      if ((e as Error).name !== 'NotFoundError') {
        this.error = `Could not connect: ${(e as Error).message}`
      }
      return
    }
    if (droppedWhileConnecting) {
      await link.close()
      this.status = 'idle'
      this.error = 'The bead disconnected.'
      return
    }
    this.#link = link
    this.status = 'waiting'
    this.#rx = ''
    this.#send(commands.hello())
    this.#helloTimer = setInterval(() => this.#send(commands.hello()), 1000)
  }

  /** Disconnect from the bead. */
  async disconnect() {
    const link = this.#link
    this.#onClosed('')
    await link?.close()
  }

  #onClosed(message: string) {
    if (!this.#link) return
    clearInterval(this.#helloTimer)
    this.#link = null
    this.status = 'idle'
    this.#setArmed(null)
    this.controller = null
    this.target = null
    this.error = message
  }

  #send(line: string) {
    const link = this.#link
    link?.write(line).catch((e: Error) => {
      if (this.#link === link) this.error = `Sending failed: ${e.message}`
    })
  }

  #onText(chunk: string) {
    const { lines, rest } = splitLines(this.#rx, chunk)
    this.#rx = rest
    for (const line of lines) {
      const message = parseLine(line)
      if (message) this.#onMessage(message)
    }
  }

  #onMessage(m: BeadMessage) {
    switch (m.type) {
      case 'ready':
        clearInterval(this.#helloTimer)
        if (this.status !== 'live') {
          this.status = 'live'
          this.runs = [{ start: '0', gates: [] }]
          this.counts = [0, 0]
          this.vector = [...KETS['0']]
          this.#send(commands.level(KETS['0']))
        }
        break
      case 'state':
        this.#setArmed(m.armed)
        this.vector = m.vector
        this.progress = m.armed ? m.progress : 0
        this.offAxis = m.offAxis
        this.axisVertical = m.axisVertical
        this.#emit('state', m.vector)
        break
      case 'gate':
        this.runs[this.runs.length - 1].gates.push(m.gate)
        this.#setArmed(null)
        this.vector = m.vector
        this.#emit('gate', { gate: m.gate, vector: m.vector })
        break
      case 'measure':
        this.counts[m.bit]++
        this.vector = m.vector
        this.#emit('measure', { bit: m.bit, vector: m.vector })
        break
    }
  }

  /** Set the armed gate, remembering the state it starts from (for drawing its rotation). */
  #setArmed(gate: GateName | null) {
    if (gate && gate !== this.armed) this.armedFrom = [...this.vector]
    if (!gate) {
      this.armedFrom = null
      this.progress = 0
      this.offAxis = false
      this.axisVertical = false
    }
    this.armed = gate
  }

  /** Arm a gate; the reader then rotates the bead to apply it. Arming the armed gate cancels it. */
  arm(gate: GateName) {
    if (this.status !== 'live') return
    if (this.armed === gate) return this.cancel()
    this.#setArmed(gate)
    this.#send(commands.arm(gate))
  }

  /** Cancel the armed gate. */
  cancel() {
    this.#setArmed(null)
    this.#send(commands.cancel())
  }

  /** Measure in the Z basis (the reader can also tap the bead). */
  measure() {
    if (this.status === 'live') this.#send(commands.measure())
  }

  /**
   * Put the bead into a basis state and start a new run from it. With a `target`, the bead also
   * lights the target green and `bead.target` is set (Gate Golf); without, any target is cleared.
   */
  setKet(ket: KetName, target: KetName | null = null) {
    if (this.status !== 'live') return
    if (this.armed) this.cancel()
    this.#send(target ? commands.level(KETS[ket], KETS[target]) : commands.set(KETS[ket]))
    this.target = target
    this.vector = [...KETS[ket]]
    const last = this.runs[this.runs.length - 1]
    if (last.gates.length === 0) last.start = ket
    else this.runs.push({ start: ket, gates: [] })
  }

  /** Play the bead's victory animation with 1 to 3 stars. */
  celebrate(stars: number) {
    if (this.status === 'live') this.#send(commands.win(stars))
  }

  /** Back to |0> with the measurement counters cleared. */
  reset() {
    this.setKet('0')
    this.counts = [0, 0]
  }
}

/** The one shared bead. */
export const bead = new Bead()
