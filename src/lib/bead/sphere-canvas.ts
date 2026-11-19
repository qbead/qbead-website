/**
 * A small 2D-canvas Bloch sphere renderer, ported from the gate trainer page
 * (the original gate trainer web app). It draws the state arrow and its trail, the armed gate's axis and
 * rotation arc, and an optional target state. No three.js, so many can share a page cheaply.
 *
 * Only `drawSphere` touches the canvas; everything it draws comes from the `SphereScene` passed in.
 */
import { GATES, KETS, ketText, rotate, type GateName, type KetName, type Vec3 } from './gates'

/** Camera angles in radians: `az` around the z axis, `el` up from the equator. */
export type SphereView = { az: number; el: number }

/** Everything one frame shows. */
export type SphereScene = {
  /** The current state. */
  state: Vec3
  /** Earlier states, oldest first, drawn as a faint line. */
  trail: Vec3[]
  /** The armed gate and the state it started from, if a gate is armed. */
  gate: { name: GateName; from: Vec3 } | null
  /** A basis state to mark as the goal, if any. */
  target: KetName | null
  /** Draw the state arrow red: the reader is turning about the wrong axis. */
  warn: boolean
  /** Time in ms (e.g. `performance.now()`), used to pulse the target. */
  now: number
}

/** Colours, matching the gate trainer. */
const COLORS = {
  state: '#3b82f6',
  warn: '#ef4444',
  trail: '#60a5fa',
  gate: '#f59e0b',
  target: '#22c55e',
  line: '#ffffff',
  label: '#c9cdd3',
}

const DEG = Math.PI / 180
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const scale = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s]
const circle = (fn: (t: number) => Vec3, n = 120) =>
  Array.from({ length: n + 1 }, (_, i) => fn((i / n) * 2 * Math.PI))

/**
 * Draw one frame onto `ctx`. `width` and `height` are in CSS pixels; the caller sets up the
 * device-pixel-ratio transform.
 */
export function drawSphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  view: SphereView,
  scene: SphereScene
) {
  const R = Math.min(width, height) * 0.34
  const cx = width / 2
  const cy = height / 2
  const { az, el } = view
  const c: Vec3 = [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)]
  const r: Vec3 = [-Math.sin(az), Math.cos(az), 0]
  const u: Vec3 = [-Math.sin(el) * Math.cos(az), -Math.sin(el) * Math.sin(az), Math.cos(el)]
  // project onto the screen; d > 0 means the point faces the viewer
  const P = (v: Vec3) => ({ x: cx + R * dot(v, r), y: cy - R * dot(v, u), d: dot(v, c) })

  function strokePath(
    points: Vec3[],
    color: string,
    lineWidth: number,
    frontAlpha: number,
    backAlpha: number,
    dashBack = true
  ) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    for (let i = 0; i < points.length - 1; i++) {
      const a = P(points[i])
      const b = P(points[i + 1])
      const front = (a.d + b.d) / 2 >= 0
      ctx.globalAlpha = front ? frontAlpha : backAlpha
      ctx.setLineDash(!front && dashBack ? [3, 5] : [])
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    ctx.setLineDash([])
    ctx.globalAlpha = 1
  }

  function dotAt(v: Vec3, radius: number, color: string, glow = false) {
    const p = P(v)
    ctx.globalAlpha = p.d < 0 ? 0.45 : 1
    if (glow) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.2)
      g.addColorStop(0, color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius * 3.2, 0, 7)
      ctx.fill()
    }
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, 7)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  function label(v: Vec3, text: string, color: string, size = 15) {
    const p = P(v)
    ctx.globalAlpha = p.d < -0.2 ? 0.4 : 0.95
    ctx.fillStyle = color
    ctx.font = `700 ${size}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, p.x, p.y)
    ctx.globalAlpha = 1
  }

  ctx.clearRect(0, 0, width, height)

  // sphere body
  const grad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
  grad.addColorStop(0, 'rgba(59,130,246,0.10)')
  grad.addColorStop(1, 'rgba(59,130,246,0.02)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, 7)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, 7)
  ctx.stroke()

  // grid: latitudes, equator and the two meridians
  for (const lat of [-60, -30, 30, 60]) {
    const z = Math.sin(lat * DEG)
    const rr = Math.cos(lat * DEG)
    strokePath(
      circle((t) => [rr * Math.cos(t), rr * Math.sin(t), z]),
      COLORS.line,
      1,
      0.07,
      0.03,
      false
    )
  }
  strokePath(
    circle((t) => [Math.cos(t), Math.sin(t), 0]),
    COLORS.line,
    1.4,
    0.35,
    0.12
  )
  strokePath(
    circle((t) => [Math.cos(t), 0, Math.sin(t)]),
    COLORS.line,
    1,
    0.16,
    0.06
  )
  strokePath(
    circle((t) => [0, Math.cos(t), Math.sin(t)]),
    COLORS.line,
    1,
    0.16,
    0.06
  )

  // axes and basis-state labels
  for (const a of [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ] as Vec3[]) {
    strokePath([scale(a, -1), [0, 0, 0], a], COLORS.line, 1, 0.35, 0.15)
  }
  for (const [k, v] of Object.entries(KETS) as [KetName, Vec3][]) {
    dotAt(v, 3, 'rgba(255,255,255,0.55)')
    label(scale(v, 1.2), ketText(k), COLORS.label)
  }

  // trail of the state
  if (scene.trail.length > 1) strokePath(scene.trail, COLORS.trail, 2, 0.35, 0.15, false)

  // armed gate: axis, full circle the state can travel, the arc it will travel, and its end point
  if (scene.gate) {
    const { axis, angle, label: name } = GATES[scene.gate.name]
    const from = scene.gate.from
    strokePath([scale(axis, -1.3), scale(axis, 1.3)], COLORS.gate, 2.5, 0.95, 0.4)
    label(scale(axis, 1.45), name, COLORS.gate, 18)
    strokePath(
      circle((t) => rotate(from, axis, t / DEG), 90),
      COLORS.gate,
      1.2,
      0.35,
      0.15
    )
    const arc = Array.from({ length: 41 }, (_, i) => rotate(from, axis, (angle * i) / 40))
    strokePath(arc, COLORS.gate, 3, 0.9, 0.4, false)
    dotAt(arc[arc.length - 1], 6, COLORS.target, true)
  }

  // target state, pulsing
  if (scene.target) {
    dotAt(KETS[scene.target], 5.5 + Math.sin(scene.now / 280) * 1.2, COLORS.target, true)
  }

  // state arrow
  const col = scene.warn ? COLORS.warn : COLORS.state
  const tip = P(scene.state)
  const o = P([0, 0, 0])
  ctx.globalAlpha = tip.d < 0 ? 0.55 : 1
  ctx.strokeStyle = col
  ctx.lineWidth = 3.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(o.x, o.y)
  ctx.lineTo(tip.x, tip.y)
  ctx.stroke()
  ctx.globalAlpha = 1
  dotAt(scene.state, 7, col, true)
}
