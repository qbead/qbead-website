---
title: What is a qubit?
layout: lesson
keywords: qubit, bit, quantum, superposition, bloch sphere
topics: quantum mechanics, basics, theory
difficulty: Beginner
objectives:
  - What is a bit?
  - What is a random bit?
  - What is a qubit?
  - How is the qbead toy meant to represent a qubit?
headerImage: https://spinwearables.com/images/banners/sensor_controller_actuator.png
description: Introduction to bits and qubits
nextLesson: _internal/reference
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'
</script>

## What is a bit?

A **bit** is the smallest piece of information possible. It can be one of two values: **0** or **1**. That's it -- just two choices, like a light switch that is either off or on, or a coin showing heads or tails. Every piece of data in a computer -- every photo, song, and video game -- is built out of long strings of bits.

## What is a random bit?

Sometimes we don't know for sure what a bit is. Imagine flipping a coin that hasn't landed yet -- you know it will be heads or tails, but you don't know which one. This is a **random bit**.

Even though we don't know the answer for certain, we can still say something useful about a random bit: we can describe **how likely** each outcome is. For a fair coin, there is a 50% chance of heads and a 50% chance of tails. But a weighted coin might have a 70% chance of heads and a 30% chance of tails. These probabilities tell us everything there is to know about our random bit.

Random bits are surprisingly useful. For example, computers use large batches of random bits to search for big prime numbers, which are the basis of internet security.

Mathematicians like to write these two probabilities as a column, which they call a **probability vector**:

$$
\begin{pmatrix} \text{probability of 0} \\ \text{probability of 1} \end{pmatrix}
$$

For a fair coin, that would be $\begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix}$. The two entries always add up to 1, because the bit has to end up as *something*.

A bit of a known value is just a special case of a random bit where one of the probabilities is 100% and the other one is 0%.

## What is a quantum bit (qubit)?

Over the last 150 years, physicists have discovered something surprising: nature does not follow the rules of ordinary probability at its smallest scales. Instead, it follows a different, deeper set of rules -- **quantum mechanics**.

A **qubit** is like a random bit, but one that obeys these quantum rules instead of regular probability rules. What makes it different?

In regular probability, each outcome gets a probability -- a number between 0 and 1. In quantum mechanics, each outcome gets a **probability amplitude** -- a number that can be **positive or negative** (and even complex). To get the actual probability from an amplitude, you take its square.

We write a qubit state using a special notation called a **ket**:

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

Here $|0\rangle$ and $|1\rangle$ are the two possible outcomes (the **basis states**), and $\alpha$ and $\beta$ are the probability amplitudes. The probability of measuring 0 is $\alpha^2$, and the probability of measuring 1 is $\beta^2$.

<Callout type="info" title="Why does this matter?">

Because amplitudes can be negative, they can **cancel each other out** (destructive interference) or **reinforce each other** (constructive interference). This is what gives quantum computers their power -- and it has no equivalent in regular probability.

</Callout>

## Graphical representation of bit, random bit, and qubit


![^A bit, a random bit, and a qubit](/lessons/bit-randbit-qubit.png)

A regular bit is just one of two points: 0 or 1. A random bit lives somewhere on a line segment between them (described by a single probability). But a qubit lives on the surface of a **sphere** -- the **Bloch sphere**. The extra freedom of the sphere (compared to a line) is what makes qubits more powerful.

### The 0 state

The "zero" state sits at the north pole of the Bloch sphere.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

$$
|0\rangle = 1\cdot|0\rangle + 0\cdot|1\rangle
$$

When measured, this qubit gives 0 with 100% certainty.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  blochSphere.add(qubit)
}} />

</div>

</div>

### The 1 state

The "one" state sits at the south pole.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

$$
|1\rangle = 0\cdot|0\rangle + 1\cdot|1\rangle
$$

When measured, this qubit gives 1 with 100% certainty.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ONE)
  blochSphere.add(qubit)
}} />

</div>

</div>

### The "+" superposition state

This qubit is in an equal superposition -- 50% chance of 0 and 50% chance of 1. It sits on the equator.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

$$
|+\rangle = \frac{1}{\sqrt 2}|0\rangle + \frac{1}{\sqrt 2}|1\rangle
$$

Both amplitudes are positive.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.PLUS)
  blochSphere.add(qubit)
}} />

</div>

</div>

### The "-" state -- same probabilities, different phase

This qubit also gives 50/50 measurement results, but it points in the opposite direction on the equator.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

$$
|-\rangle = \frac{1}{\sqrt 2}|0\rangle - \frac{1}{\sqrt 2}|1\rangle
$$

The second amplitude is now **negative**. This is a different **phase**.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.MINUS)
  blochSphere.add(qubit)
}} />

</div>

</div>

<Callout type="question" title="Something to think about">

The $|+\rangle$ and $|-\rangle$ states give the exact same measurement results when you check whether the qubit is 0 or 1 -- both give 50/50. Yet they are genuinely different states pointing in opposite directions on the Bloch sphere. In future lessons we will see how to tell them apart and why this hidden difference is a key source of computational power for quantum computers.

</Callout>

## A bit more mathematical rigor

<Callout type="info" title="Optional section">

This section is for those interested in linear algebra. Feel free to skip it -- it is not needed to understand the rest of the lessons.

</Callout>

Let us restate what we covered above more precisely:

- A **bit**'s value is an element of the set $\{0, 1\}$.
- A **random bit** is completely described by a **stochastic vector** -- a vector of non-negative entries that sum to 1 (normalized under the 1-norm):

$$
\begin{pmatrix} p \\ 1-p \end{pmatrix}, \quad p \in [0,1]
$$

- A **qubit** is completely described by a **state vector** -- a vector of complex entries whose squared magnitudes sum to 1 (normalized under the 2-norm):

$$
\begin{pmatrix} \alpha \\ \beta \end{pmatrix}, \quad |\alpha|^2 + |\beta|^2 = 1
$$

### Operations

The most general operation on a random bit is a **stochastic matrix** -- the most general linear map that preserves the 1-norm. For a qubit, the corresponding operations are **unitary matrices** -- the most general linear maps that preserve the 2-norm. It turns out that unitary transformations are richer and more powerful for encoding computation than stochastic ones.

### Measurement

For a random bit, the entries of the stochastic vector directly give the probabilities of observing 0 or 1. For a qubit, you must take the **squared magnitude** of each entry:

$$
P(0) = |\alpha|^2, \quad P(1) = |\beta|^2
$$

This squaring rule (known as the Born rule) is what allows amplitudes to be negative or complex while still producing valid probabilities.
