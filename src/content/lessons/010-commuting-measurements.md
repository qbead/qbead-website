---
title: Measuring a Quantum System
layout: lesson
keywords: measurement, quantum, commuting, non-commuting, qbead
topics: quantum mechanics, measurement, qbead
difficulty: Beginner
objectives:
  - Understand how measuring a classical system works
  - Discover that quantum measurements along different axes do not commute
  - Explore non-commuting measurements hands-on with the qbead
description: Learn how quantum measurements differ from classical ones by exploring non-commuting measurements with the Qbead.
nextLesson: lessons/020-decoherence-and-dynamical-decoupling
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates } from '@qbead/bloch-sphere'
</script>

## Measuring a Classical System

In the [previous lesson](/lessons/001-what-is-a-qubit) we described how we can use probability to describe a bit (or a coin) that we are uncertain about. When we observe that random bit -- that is, when we **measure** it -- our uncertainty disappears. The probability of one outcome jumps to 100%.

For example, imagine a coin hidden under a cup. You know it is 50/50 heads or tails. You lift the cup and see heads. Now you know for certain: it is heads.

**What happens if you measure it again?** You just look at the coin a second time -- it is still heads. Repeating a measurement on a classical system always gives the same answer.

Now think of something with more than one feature -- like a ball sitting on a table. You can measure both its **position** and its **color**. Checking the color does not change where the ball is. Checking the position does not change the color. For classical objects, measuring one property does not disturb another property. The order in which you measure them does not matter.

<Callout type="info" title="Commutativity">

When the order of two actions does not matter, we say they **commute**. Classical measurements of different properties commute -- you get the same answers regardless of which you check first.

</Callout>

## Measuring a Quantum System

About a century ago, physicists discovered something shocking: for quantum systems, measurements of different properties **do not always commute**. Measuring one feature can scramble another feature, even if they seem unrelated.

For a qubit, we can measure along different axes of the Bloch sphere. Think of each axis as asking a different yes/no question about the qubit:

- The **vertical axis** (Z) asks: "Are you pointing up or down?"
- The **horizontal axis** (X) asks: "Are you pointing left or right?"

Here is the strange part: if the qubit is pointing sideways (along X), measuring along Z gives a completely random result -- 50/50 up or down. And after that Z measurement, the qubit is now pointing purely up or down, so it has "forgotten" that it was pointing sideways.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Before Z measurement:** qubit points along X (equator of the Bloch sphere).

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.PLUS)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
}} />

</div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**After Z measurement:** qubit collapses to north or south pole (random).

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
}} />

</div>

</div>

## Try It with Your QBead

The qbead simulates a qubit. When you **tap** it, you perform a measurement along the vertical axis (Z). The bead lights up:

- **Red** = measured "up" (the $|0\rangle$ state)
- **Blue** = measured "down" (the $|1\rangle$ state)

### Experiment 1: Repeated measurements along the same axis

1. Tap the qbead once and note the color.
2. Without rotating the bead, tap it again. And again.

You should get the **same color every time**. Just like a classical system, repeating the same measurement gives the same answer.

### Experiment 2: Measurements along different axes

Now try this:

1. Tap the qbead to measure along the Z axis. Note the color.
2. **Rotate the bead 90 degrees** (so you are now measuring along a perpendicular axis, X).
3. Tap again. Note the new color.
4. **Rotate back** to the original orientation (Z axis again).
5. Tap once more.

Does the final measurement match your first measurement? Try this several times.

<Callout type="question" title="What did you notice?">

The first and last measurements are along the **same axis**, but they do not always agree! The measurement along the perpendicular axis in step 3 **scrambled** the information from step 1. This is what it means for measurements to **not commute**.

</Callout>

## Why Does This Happen?

On the Bloch sphere, the Z axis and the X axis are perpendicular. A qubit that is definite along Z (sitting at the north or south pole) is completely uncertain along X (50/50 left or right), and vice versa.

When you measure along Z, the qubit is forced to the north or south pole. It now has a definite Z value -- but it has lost all information about X. If you then measure along X, you get a random result, and the qubit moves to the equator, losing its Z information.

This is very different from the classical ball on a table, where checking the color never affects the position.

<Callout type="info" title="The Uncertainty Principle">

This inability to know both properties at once is related to the **Heisenberg uncertainty principle**. For a qubit, the Z and X measurement outcomes cannot both be certain at the same time. Making one definite makes the other random.

</Callout>

## Summary

| Classical system | Quantum system (qubit) |
|---|---|
| Repeated measurement gives the same result | Same -- repeated measurement gives the same result |
| Measuring one property does not affect another | Measuring along one axis can randomize another axis |
| Order of measurements does not matter (they commute) | Order of measurements **does** matter (they may not commute) |


<Callout type="book" title="A Bit More Detail (Optional)">

Mathematically, what is happening is that the Z and X measurements correspond to different **bases**. A qubit that is a basis state in one basis is a superposition in the other. For a classical random bit, there is only one valid basis, so this issue never arises. The fact that quantum mechanics has multiple incompatible bases is one of the key features that makes quantum computing powerful.

</Callout>
