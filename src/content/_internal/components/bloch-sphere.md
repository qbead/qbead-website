---
title: Bloch Sphere Component
layout: article
section: _internal
description: Guide to using the BlochSphereElement component for quantum visualizations
robots: false
---

<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates } from '@qbead/bloch-sphere'
</script>

# Bloch Sphere Component

The `BlochSphereElement` provides a "svelty" way to include the bloch sphere widget.

**Also See**: the [Bloch Sphere Widget API docs](https://qbead.gitbook.io/bloch-sphere).

## Basic Usage

### Step 1: Import

Add these imports at the top of your markdown file:

```svelte
<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector} from '@qbead/bloch-sphere'
</script>
```

### Step 2: Add to Content

Use the component in your markdown:

```svelte
<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />
```

## Live Examples

### Example 1: Random Qubit State

<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />

**Code:**
```svelte
<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />
```

### Example 2: Specific State (|+> state)

<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  // Create |+> state (superposition)
  let state = BlochVector.PLUS
  // let state = BlochVector.fromAngles(Math.PI/2, 0)
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />

**Code:**
```svelte
<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  // Create |+> state (superposition)
  let state = BlochVector.PLUS
  // let state = BlochVector.fromAngles(Math.PI/2, 0)
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />
```

### Example 3: Without Grid

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: false,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/4, Math.PI/3)
  const qubit = new QubitDisplay(state)
  // Hide angle indicators and label for cleaner look
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
}} />

**Code:**
```svelte
<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: false,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/4, Math.PI/3)
  const qubit = new QubitDisplay(state)
  // Hide angle indicators and label for cleaner look
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
}} />
```

## Component Options

The `BlochSphereOptions` object from the [Bloch Sphere Widget API docs](https://qbead.gitbook.io/bloch-sphere/type-aliases/blochsphereoptions).

## Creating Quantum States

### Using BlochVector

The `BlochVector` class creates quantum state vectors:

#### From Angles (theta, phi)

```javascript
// theta: polar angle from |0> (0 to pi)
// phi: azimuthal angle around z-axis (0 to 2*pi)
let state = BlochVector.fromAngles(theta, phi)
```

**Common states:**
```javascript
// |0> state (north pole)
let zero = BlochVector.ZERO

// |1> state (south pole)
let one = BlochVector.ONE

// |+> state (superposition on x-axis)
let plus = BlochVector.PLUS

// |-> state (superposition on x-axis)
let plus = BlochVector.MINUS

// |i> state (superposition on y-axis)
let iState = BlochVector.PLUS_I

// |-i> state (superposition on y-axis)
let iState = BlochVector.MINUS_I
```

#### Random State

```javascript
let state = BlochVector.random()
```

## Practical Patterns

### Pattern 1: Side-by-Side Comparison

Show before and after states:


<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Before Hadamard Gate:**

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const state = BlochVector.fromAngles(0, 0)  // |0> state
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />

</div>

<div>

**After Hadamard Gate:**

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(0, 0)
  const gate = gates.hadamard()
  state = state.applyOperator(gate)
  const qubit = new QubitDisplay(state)
  const gateView = new OperatorDisplay(gate)
  blochSphere.add(qubit)
  blochSphere.add(gateView)
}} />

</div>

</div>

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Before Hadamard Gate:**

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const state = BlochVector.fromAngles(0, 0)  // |0> state
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />

</div>

<div>

**After Hadamard Gate:**

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(0, 0)
  const gate = gates.hadamard()
  state = state.applyOperator(gate)
  const qubit = new QubitDisplay(state)
  const gateView = new OperatorDisplay(gate)
  blochSphere.add(qubit)
  blochSphere.add(gateView)
}} />

</div>

</div>
```

### Pattern 2: With Explanation

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

The $|+\rangle$ state is a superposition:

$$
|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)
$$

On the Bloch sphere, it appears on the equator at phi = 0 degrees.

</div>

<figure>
<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: false,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/2, 0)
  const qubit = new QubitDisplay(state)
  qubit.angleIndicators.visible = false
  blochSphere.add(qubit)
}} />
<figcaption class="text-sm text-gray-500 text-center mt-2">
  Figure: The $|+\rangle$ state on the Bloch sphere
</figcaption>
</figure>

</div>

**Code:**
```svelte
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

The $|+\rangle$ state is a superposition:

$$
|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)
$$

On the Bloch sphere, it appears on the equator at phi = 0 degrees.

</div>

<figure>
<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: false,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/2, 0)
  const qubit = new QubitDisplay(state)
  qubit.angleIndicators.visible = false
  blochSphere.add(qubit)
}} />
<figcaption class="text-sm text-gray-500 text-center mt-2">
  Figure: The $|+\rangle$ state on the Bloch sphere
</figcaption>
</figure>

</div>
```
