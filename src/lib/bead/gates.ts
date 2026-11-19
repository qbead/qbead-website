/**
 * Single-qubit gates and Bloch-vector helpers.
 *
 * Pure functions only (no browser or Svelte APIs), shared by the bead store and the exercises.
 * Gate axes and angles match the bead firmware (`Gate_Trainer.ino`).
 */

/** A point on the Bloch sphere as [x, y, z]. */
export type Vec3 = [number, number, number]

/** Wire name of a gate. `D` is S-dagger, as in the bead firmware. */
export type GateName = 'X' | 'Y' | 'Z' | 'H' | 'S' | 'D' | 'T'

/** The six basis states on the Bloch axes: |0>, |1>, |+>, |->, |+i>, |-i>. */
export type KetName = '0' | '1' | '+' | '-' | '+i' | '-i'

/**
 * The gates applied since the bead was last set to a known state.
 * Exercise tasks are checked against runs that start from |0>.
 */
export type Run = { start: KetName; gates: GateName[] }

/** A gate is a rotation of `angle` degrees about the unit vector `axis`. */
export type Gate = { axis: Vec3; angle: number; label: string }

const R2 = Math.SQRT1_2
const DEG = Math.PI / 180

/** All gates the bead firmware knows. */
export const GATES: Record<GateName, Gate> = {
  X: { axis: [1, 0, 0], angle: 180, label: 'X' },
  Y: { axis: [0, 1, 0], angle: 180, label: 'Y' },
  Z: { axis: [0, 0, 1], angle: 180, label: 'Z' },
  H: { axis: [R2, 0, R2], angle: 180, label: 'H' },
  S: { axis: [0, 0, 1], angle: 90, label: 'S' },
  D: { axis: [0, 0, -1], angle: 90, label: 'S†' },
  T: { axis: [0, 0, 1], angle: 45, label: 'T' },
}

/** Bloch vectors of the six basis states. */
export const KETS: Record<KetName, Vec3> = {
  '0': [0, 0, 1],
  '1': [0, 0, -1],
  '+': [1, 0, 0],
  '-': [-1, 0, 0],
  '+i': [0, 1, 0],
  '-i': [0, -1, 0],
}

/** The six basis-state names, in display order. */
export const KET_NAMES = Object.keys(KETS) as KetName[]

/** Display text for a basis state, e.g. `ketText('-i')` is `|-i>` with proper bra-ket symbols. */
export const ketText = (k: KetName) => `|${k.replace('-', '−')}⟩`

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]

/** Angle between two vectors in degrees (0 if either has zero length). */
export function angleBetween(a: Vec3, b: Vec3): number {
  const la = Math.hypot(...a)
  const lb = Math.hypot(...b)
  if (la === 0 || lb === 0) return 0
  return Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (la * lb)))) / DEG
}

/** Rotate `v` by `deg` degrees about the unit vector `axis` (right-hand rule, Rodrigues). */
export function rotate(v: Vec3, axis: Vec3, deg: number): Vec3 {
  const t = deg * DEG
  const c = Math.cos(t)
  const s = Math.sin(t)
  const k = cross(axis, v)
  const d = dot(axis, v) * (1 - c)
  return [
    v[0] * c + k[0] * s + axis[0] * d,
    v[1] * c + k[1] * s + axis[1] * d,
    v[2] * c + k[2] * s + axis[2] * d,
  ]
}

/** Apply a gate to a Bloch vector. */
export function applyGate(v: Vec3, gate: GateName): Vec3 {
  const { axis, angle } = GATES[gate]
  return rotate(v, axis, angle)
}

/** The basis state `v` points at, or `null` if it is not within `tolerance` degrees of one. */
export function nearestKet(v: Vec3, tolerance = 4): KetName | null {
  for (const k of KET_NAMES) if (angleBetween(v, KETS[k]) < tolerance) return k
  return null
}

/** The basis state a gate takes `ket` to, or `null` if the result is not a basis state. */
export function gateResult(ket: KetName, gate: GateName): KetName | null {
  return nearestKet(applyGate(KETS[ket], gate))
}
