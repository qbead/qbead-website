<!--
@component
Live Bloch sphere for the paired bead, as on the gate trainer page: the state arrow follows the
bead in real time and leaves a trail, an armed gate shows its rotation axis (orange), the arc the
state will travel and where it ends (green), and `bead.target` is marked when set. A banner shows
the armed gate, a hint and how far it has been turned. Drag the sphere to look around. No props.

It only animates while visible, so many can be on one page.
-->
<script lang="ts">
  import { onMount } from 'svelte'
  import { bead } from '$lib/bead/bead.svelte'
  import { GATES, angleBetween, ketText, nearestKet, type Vec3 } from '$lib/bead/gates'
  import { drawSphere, type SphereView } from '$lib/bead/sphere-canvas'

  let canvas: HTMLCanvasElement
  const view: SphereView = { az: 0.55, el: 0.38 }
  let trail: Vec3[] = []

  const ket = $derived(nearestKet(bead.vector))
  const p0 = $derived(Math.round(((1 + bead.vector[2]) / 2) * 100))
  const hint = $derived.by(() => {
    if (!bead.armed) return ''
    if (bead.axisVertical)
      return 'The orange axis is almost vertical: tilt the bead until it lies flat.'
    if (bead.offAxis) return 'Wrong rotation axis! Roll the bead around the orange axis.'
    return `Roll the bead around the orange axis (${GATES[bead.armed].angle}°).`
  })

  function updateTrail(state: Vec3) {
    const last = trail[trail.length - 1]
    // a jump means the state was set (reset, new round): start a fresh trail
    if (last && angleBetween(last, state) > 60) trail = []
    if (!last || angleBetween(last, state) > 1.5) {
      trail.push([...state])
      if (trail.length > 900) trail.shift()
    }
  }

  onMount(() => {
    const ctx = canvas.getContext('2d')!
    let frame = 0
    let visible = false

    function render() {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr)
      if (canvas.height !== Math.round(h * dpr)) canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      updateTrail(bead.vector)
      drawSphere(ctx, w, h, view, {
        state: bead.vector,
        trail,
        gate: bead.armed && bead.armedFrom ? { name: bead.armed, from: bead.armedFrom } : null,
        target: bead.target,
        warn: !!bead.armed && bead.offAxis,
        now: performance.now(),
      })
      if (visible) frame = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(render)
    })
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  })

  // drag to rotate the view
  let drag: { x: number; y: number; az: number; el: number } | null = null
  function onpointerdown(e: PointerEvent) {
    drag = { x: e.clientX, y: e.clientY, az: view.az, el: view.el }
    canvas.setPointerCapture(e.pointerId)
  }
  function onpointermove(e: PointerEvent) {
    if (!drag) return
    view.az = drag.az - (e.clientX - drag.x) * 0.008
    view.el = Math.max(-1.35, Math.min(1.35, drag.el + (e.clientY - drag.y) * 0.008))
  }
  const onpointerup = () => (drag = null)
</script>

<div class="bead-sphere">
  <canvas
    bind:this={canvas}
    {onpointerdown}
    {onpointermove}
    {onpointerup}
    onpointercancel={onpointerup}
    aria-label="Bloch sphere showing the Qbead's current state"
  ></canvas>

  <div class="readout">
    <div class="ket">{ket ? ketText(ket) : 'general state'}</div>
    <div class="prob">P(0) = {p0} % &middot; P(1) = {100 - p0} %</div>
  </div>

  {#if bead.armed}
    <div class="banner" role="status">
      <div class="flex items-center gap-3">
        <span class="gate">{GATES[bead.armed].label}</span>
        <span class:warn={bead.offAxis || bead.axisVertical}>{hint}</span>
      </div>
      <div class="bar"><div style:width="{bead.progress * 100}%"></div></div>
    </div>
  {:else}
    <div class="drag-hint">Drag to look around</div>
  {/if}
</div>

<style>
  .bead-sphere {
    position: relative;
    aspect-ratio: 1;
    width: 100%;
    overflow: hidden;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #272c42;
    color: #f2f3f5;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
    cursor: grab;
    touch-action: none;
  }
  .readout {
    position: absolute;
    top: 10px;
    left: 12px;
    pointer-events: none;
  }
  .ket {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .prob {
    font-size: 0.75rem;
    color: #9aa0a8;
  }
  .banner {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(10, 11, 13, 0.75);
    font-size: 0.8rem;
    pointer-events: none;
  }
  .gate {
    font-weight: 800;
    font-size: 1.1rem;
    color: #f59e0b;
  }
  .warn {
    color: #fca5a5;
  }
  .bar {
    margin-top: 6px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.12);
    overflow: hidden;
  }
  .bar div {
    height: 100%;
    background: #f59e0b;
    transition: width 0.1s linear;
  }
  .drag-hint {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    color: #5d636c;
    pointer-events: none;
  }
</style>
