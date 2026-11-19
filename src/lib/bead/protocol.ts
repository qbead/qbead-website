/**
 * The bead's text protocol: one command or message per line.
 *
 * Pure functions only. See the header of `Gate_Trainer.ino` for the full command list.
 */
import { GATES, type GateName, type Vec3 } from './gates'

/** A message from the bead, parsed from one line of text. */
export type BeadMessage =
  | { type: 'ready' }
  /**
   * Periodic status (~15 Hz): current state, the armed gate (if any) and how far it has turned
   * (`progress`, 0 to 1). `offAxis`: the bead is being turned about the wrong axis.
   * `axisVertical`: the gate's axis points (almost) up, so it cannot be turned about.
   */
  | {
      type: 'state'
      vector: Vec3
      progress: number
      armed: GateName | null
      offAxis: boolean
      axisVertical: boolean
    }
  /** A gate finished; `vector` is the new state. */
  | { type: 'gate'; gate: GateName; vector: Vec3 }
  /** A Z-basis measurement finished with result `bit`; `vector` is the collapsed state. */
  | { type: 'measure'; bit: 0 | 1; vector: Vec3 }

const isGate = (s: string): s is GateName => Object.hasOwn(GATES, s)

function vec3(parts: string[], from: number): Vec3 | null {
  const v = [Number(parts[from]), Number(parts[from + 1]), Number(parts[from + 2])]
  return v.every(Number.isFinite) ? (v as Vec3) : null
}

/** Parse one line from the bead. Returns `null` for unknown or malformed lines. */
export function parseLine(line: string): BeadMessage | null {
  const p = line.trim().split(/\s+/)
  switch (p[0]) {
    case 'READY':
      return { type: 'ready' }
    case 'S': {
      const vector = p.length >= 8 ? vec3(p, 1) : null
      if (!vector) return null
      const progress = Number(p[4])
      return {
        type: 'state',
        vector,
        progress: Number.isFinite(progress) ? progress : 0,
        armed: isGate(p[5]) ? p[5] : null,
        offAxis: p[6] === '1',
        axisVertical: p[7] === '1',
      }
    }
    case 'DONE': {
      const vector = p.length >= 5 && isGate(p[1]) ? vec3(p, 2) : null
      return vector ? { type: 'gate', gate: p[1] as GateName, vector } : null
    }
    case 'MEAS': {
      const vector = p.length >= 5 && (p[1] === '0' || p[1] === '1') ? vec3(p, 2) : null
      return vector ? { type: 'measure', bit: p[1] === '1' ? 1 : 0, vector } : null
    }
    default:
      return null
  }
}

/**
 * Split incoming text into complete lines. BLE delivers small packets that can cut a line anywhere,
 * so keep `rest` and pass it back in as `buffer` with the next chunk.
 */
export function splitLines(buffer: string, chunk: string): { lines: string[]; rest: string } {
  const parts = (buffer + chunk).split('\n')
  const rest = parts.pop() ?? ''
  return { lines: parts.map((l) => l.trim()).filter(Boolean), rest }
}

const vec = (v: Vec3) => v.map((c) => +c.toFixed(4)).join(' ')

/** Builders for the lines the page sends to the bead (without the trailing newline). */
export const commands = {
  hello: () => 'HELLO',
  /** Start state; with a `target` the bead also lights the target (Gate Golf). */
  level: (v: Vec3, target?: Vec3) => `LEVEL ${vec(v)}${target ? ' ' + vec(target) : ''}`,
  /** Victory animation on the bead with 1 to 3 stars. */
  win: (stars: number) => `WIN ${stars}`,
  /** Set the current state, e.g. `commands.set([0, 0, 1])` for |0>. */
  set: (v: Vec3) => `SET ${vec(v)}`,
  /** Arm a gate: the bead completes it when the reader rotates it about the shown axis. */
  arm: (g: GateName) => `ARM ${g}`,
  cancel: () => 'CANCEL',
  measure: () => 'MEASURE',
}
