---
title: Quantum Gates
layout: lesson
keywords: quantum gates, unitary, reversible, X gate, Y gate, Z gate, S gate, Hadamard gate, Bloch sphere
topics: quantum mechanics, theory, advanced math
difficulty: Advanced
objectives:
  - Explain what a quantum gate is and how it acts on a qubit
  - Show why every quantum gate must be unitary and reversible
  - Identify the X, Y, Z, S, T, and Hadamard gates as matrices and as rotations on the Bloch sphere
  - Combine simple gates in sequence and predict the resulting state
  - Recognize the real-world limitations of physical quantum gates
headerImage: /lessons/QuantumGatesThumbnail.png
description: Learn what a quantum gate is, why every gate must be unitary and reversible, and explore the X, Y, Z, S, T, and Hadamard gates as matrices and as rotations on the Bloch sphere.
nextLesson: lessons/040-chsh-game
---

<script>
  import * as THREE from 'three'
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import BeadPairing from '$lib/components/Bead/BeadPairing.svelte'
  import BeadExercise from '$lib/components/Bead/BeadExercise.svelte'
  import GateGolf from '$lib/components/Bead/GateGolf.svelte'
  import BeadOnly from '$lib/components/Bead/BeadOnly.svelte'
  import { gatesXY, gatesZS, gatesH, gatesCombining } from '$lib/bead/exercises'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'

  function addAxisLine(blochSphere, dir, color = 0xf97316, radius = 0.012) {
    const n = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
    const mat = new THREE.MeshBasicMaterial({ color })

    const geo = new THREE.CylinderGeometry(radius, radius, 2, 8)
    const line = new THREE.Mesh(geo, mat)
    line.quaternion.copy(quaternion)
    blochSphere.add(line)

    const headHeight = 0.12
    const headRadius = 0.045
    const headGeo = new THREE.ConeGeometry(headRadius, headHeight, 12)
    const head = new THREE.Mesh(headGeo, mat)
    head.quaternion.copy(quaternion)
    head.position.copy(n.clone().multiplyScalar(1 - headHeight / 2))
    blochSphere.add(head)
  }

  function createTraceLine(blochSphere, color = 0x38bdf8, maxPoints = 128) {
    const positions = new Float32Array(maxPoints * 3)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setDrawRange(0, 0)
    const material = new THREE.LineBasicMaterial({ color })
    const line = new THREE.Line(geometry, material)
    blochSphere.add(line)

    let count = 0
    let lastProgress = 0
    return function trace(point, progress) {
      if (progress < lastProgress) count = 0
      lastProgress = progress
      if (count < maxPoints) {
        positions[count * 3] = point.x
        positions[count * 3 + 1] = point.y
        positions[count * 3 + 2] = point.z
        count++
        geometry.attributes.position.needsUpdate = true
        geometry.setDrawRange(0, count)
      }
    }
  }

</script>

<BeadPairing />

## What Is a Quantum Gate?

In the experiment, you changed a qubit's state and watched it move along the Qbead until you reached the correct state. The thing you applied was a **quantum gate**.

A quantum gate is a controlled operation that takes a qubit from one state to another. It plays the same role for qubits that logic gates like NOT or AND play for classical bits. The difference is that a qubit's state isn't just 0 or 1, so a gate can also create and change superpositions.

### Gates as Matrices

As mentioned in the [What is a qubit?](/lessons/001-what-is-a-qubit) lesson, any qubit state can be written as

$$
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle.
$$

A single-qubit gate is a $2\times2$ matrix $G$, and applying it is matrix multiplication,

$$
|\psi'\rangle = G|\psi\rangle.
$$

### Quantum Gates Are Unitary and Reversible

Not every matrix can be a quantum gate. A gate must always turn a valid qubit state into another valid qubit state, which simply means the probabilities must still add up to 1. The matrices that guarantee this property are called **unitary matrices**.

A matrix $U$ is unitary if

$$
U^\dagger U = UU^\dagger = I
$$

holds. Here $I$ is the identity matrix (the "do nothing" matrix) and $U^\dagger$ is the conjugate transpose of $U$. To find it, flip the matrix over its diagonal (swap rows and columns), then replace every number with its complex conjugate.

Geometrically, unitary gates are rotations. On the Bloch sphere, a gate moves the state around the sphere but never pulls it off the surface.

#### Every Gate Can Be Undone

The same equation $U^\dagger U = I$ also tells us something else: every gate $U$ has an inverse, $U^\dagger$, that undoes it:

$$
U^\dagger U|\psi\rangle = |\psi\rangle.
$$

If a gate rotates the state one way on the Bloch sphere, the inverse rotates it straight back.

<Callout type="info" title="A note on the Bloch sphere">

The Bloch sphere itself is not a law of nature. The qubit state does not actually rotate or spin along the sphere. Rather, the Bloch sphere is simply a mathematical convention used to formulate the qubit state. The same goes for its axes -- X, Y, and Z are just labels we chose, not physical directions in the real world.

</Callout>

### Why This Matters

Reversibility is what makes quantum gates different from many classical operations. A classical NOT gate is reversible, but a gate like AND is not. If the output is 0, you can't tell whether the inputs were 00, 01, or 10, because information has been thrown away.

A quantum gate never does this. Information about the state is not lost, so a gate can always be reversed.

The only exception is measurement. Measuring a qubit is not reversible, and we treat it separately.

In the next sections, we'll look at the most important single-qubit gates and see each one both as a matrix and as a rotation on the Bloch sphere.

## The X and Y Gates

The X and Y gates are two of the most basic single-qubit gates. They do almost the same job, but around different axes of the Bloch sphere, so we can study them together.

### The X Gate: The Quantum NOT

The X gate flips the two basis states,

$$
X|0\rangle = |1\rangle,
\qquad
X|1\rangle = |0\rangle.
$$

This is why it is often called the **quantum NOT gate**. But unlike a classical NOT, it also works on superpositions. As a matrix, X is represented by

$$
X =
\begin{pmatrix}
0 & 1\\
1 & 0
\end{pmatrix}.
$$

Applying it to a state $|\psi\rangle= \alpha|0\rangle+\beta|1\rangle$ gives

$$
X|\psi\rangle
=
\beta|0\rangle + \alpha|1\rangle,
$$

so the X gate simply swaps the two amplitudes.

### The Y Gate

The Y gate also flips $|0\rangle$ and $|1\rangle$, but it adds a factor of $i$ or $-i$,

$$
Y =
\begin{pmatrix}
0 & -i\\
i & 0
\end{pmatrix},
\qquad
Y|0\rangle = i|1\rangle,
\qquad
Y|1\rangle = -i|0\rangle.
$$

Here $i$ is the imaginary unit, defined by $i^2=-1$.

The extra factors are **phases**. A phase is a number that changes the "direction" of an amplitude without changing its size. Notice that a factor in front of the *whole* state, such as the $i$ in $i|1\rangle$, changes nothing you could ever measure -- that is, $i|1\rangle$ and $|1\rangle$ are the same state when it comes down to measuring probability. (See the [more mathematically rigorous section](/lessons/001-what-is-a-qubit#a-bit-more-mathematical-rigor) of the previous lesson for more on this.)

### Seeing It on the Bloch Sphere

Both gates are 180° rotations of the Bloch sphere:

- The X gate rotates the qubit state half a turn around the X axis.
- The Y gate rotates the qubit state half a turn around the Y axis.

Each gate leaves the states on its own axis unchanged and flips the states on the other two axes. This is the real difference between the gates. Both send north to south, but only X leaves the X-axis states alone, and only Y leaves the Y-axis states alone. So the X gate does not just flip 0 and 1 -- it rotates the entire state around an axis.

Watch each gate rotate the state $|0\rangle$ around its own axis, then reset back to the start:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere) 
  animate((progress) => {
    const theta = progress * Math.PI
    const v = BlochVector.fromAngles(theta, -Math.PI / 2)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">The X gate rotates the state half a turn around the X axis, from $|0\rangle$ through $|{-i}\rangle$ to $|1\rangle$.</figcaption>

</figure>

</div>

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  animate((progress) => {
    const theta = progress * Math.PI
    const v = BlochVector.fromAngles(theta, 0)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">The Y gate rotates the state half a turn around the Y axis, from $|0\rangle$ through $|+\rangle$ to $|1\rangle$.</figcaption>

</figure>

</div>

</div>

| Starting state | After X | After Y |
|---|---|---|
| $|0\rangle$ (north pole, $+Z$) | $|1\rangle$ | $i|1\rangle$ |
| $|1\rangle$ (south pole, $-Z$) | $|0\rangle$ | $-i|0\rangle$ |
| $|+\rangle$ ($+X$) | $|+\rangle$ | $-i|-\rangle$ |
| $|-\rangle$ ($-X$) | $-|-\rangle$ | $i|+\rangle$ |
| $|+i\rangle$ ($+Y$) | $-i|-i\rangle$ | $|+i\rangle$ |
| $|-i\rangle$ ($-Y$) | $-i|+i\rangle$ | $-|-i\rangle$ |

### Applying Them Twice

Two half-turns make a full turn, so applying either gate twice brings the qubit back to its original state. What that means is that when either gate is applied two times in a row, the end result is the identity matrix, which does not change the state of the qubit,

$$
X^2 = I,
\qquad
Y^2 = I.
$$

For example, we can check how Y acts on $|0\rangle$ when applied twice. The intermediate state has a factor of $i$, but the second application cancels it,

$$
|0\rangle
\xrightarrow{Y}
i|1\rangle
\xrightarrow{Y}
i\cdot(-i)|0\rangle
=
|0\rangle.
$$

So X and Y can undo themselves -- just apply the same gate again and the qubit state is back where it started.

<BeadExercise exercise={gatesXY}>

<Callout type="question" title="Try it yourself">

1. Start with $|0\rangle$ and apply X. Then start again and apply Y. What do you notice about the two results on the sphere?
2. Prepare $|+\rangle$ (using the H gate). Apply X. Does anything change? Now reset, prepare $|+\rangle$ again, and apply Y. What happens?
3. Apply X twice, then Y twice. Where does the qubit state end up?

</Callout>

</BeadExercise>

## The Z, S, and T Gates

The Z, S, and T gates are the phase gates. All three rotate the qubit state around the Z axis, the line running through the north and south poles. Z makes a half-turn (180°), S makes a quarter-turn (90°), and T makes an eighth-turn (45°), so we can study them together.

### The Z Gate: A Half Turn

Unlike X and Y, the Z gate does not swap $|0\rangle$ and $|1\rangle$. It leaves $|0\rangle$ alone and puts a minus sign in front of $|1\rangle$,

$$
Z|0\rangle = |0\rangle,
\qquad
Z|1\rangle = -|1\rangle.
$$

As a matrix, the Z gate is represented as

$$
Z =
\begin{pmatrix}
1 & 0\\
0 & -1
\end{pmatrix}.
$$

For a general state, the Z gate keeps $\alpha$ and flips the sign of $\beta$,

$$
Z\left(\alpha|0\rangle + \beta|1\rangle\right)
=
\alpha|0\rangle - \beta|1\rangle.
$$

<span id="minus-sign-matter"></span>

<Callout type="book" title="Advanced Topic: why does a minus sign matter?">

If you measure a qubit, only the size of the amplitude counts, and a minus sign does not change it, so Z never changes the measurement probabilities.

However, the minus sign changes the **relative phase** -- the sign or angle of $|1\rangle$'s amplitude compared to $|0\rangle$'s. Two states can give identical measurement results and still be completely different states. We will see later that there exist gates, such as the Hadamard gate, that can turn that hidden difference into a visible one.

The minus sign in front of the *whole* state is invisible. Z is different because it flips the sign of only one part of the state, and that changes the state itself.

</Callout>

### The S Gate: A Quarter Turn

The S gate does the same kind of job as Z, but with a smaller turn. It also leaves $|0\rangle$ alone, but instead of a minus sign it multiplies $|1\rangle$ by $i$,

$$
S =
\begin{pmatrix}
1 & 0\\
0 & i
\end{pmatrix},
\qquad
S|0\rangle = |0\rangle,
\qquad
S|1\rangle = i|1\rangle.
$$

Its action on a general state can be written as

$$
S\left(\alpha|0\rangle + \beta|1\rangle\right)
=
\alpha|0\rangle + i\beta|1\rangle.
$$

The number in front of $|1\rangle$ determines where the state points around the equator. Multiply it by $-1$ and the state moves to the opposite side of the sphere; multiply it by $i$ and the state moves a quarter of the way around.

### The T Gate: An Eighth Turn

The T gate performs the smallest turn of the three. It also leaves $|0\rangle$ alone, but multiplies $|1\rangle$ by $e^{i\pi/4}$,

$$
T =
\begin{pmatrix}
1 & 0\\
0 & e^{i\pi/4}
\end{pmatrix},
\qquad
T|0\rangle = |0\rangle,
\qquad
T|1\rangle = e^{i\pi/4}|1\rangle.
$$

Its action on a general state can be written as

$$
T\left(\alpha|0\rangle + \beta|1\rangle\right)
=
\alpha|0\rangle + e^{i\pi/4}\beta|1\rangle.
$$

Applying T twice gives the same phase as one S gate, since $e^{i\pi/4}\cdot e^{i\pi/4} = e^{i\pi/2} = i$ -- two eighth-turns make one quarter-turn.

That is the key difference between Z, S, and T -- how far they rotate the state. All three gates spin the qubit state around the Z axis: Z rotates it by 180°, S rotates it by 90°, and T rotates it by 45°.

<Callout type="book" title="What does that exponent mean?">

A number raised to an imaginary power looks strange at first, but it has an important geometric meaning.

For any angle $\theta$, **Euler's formula** tells us that

$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$

What this means is that $e^{i\theta}$ is just the point on a circle of radius 1, at angle $\theta$, drawn in the complex plane (the plane where the horizontal axis is the real numbers and the vertical axis is the imaginary numbers). As $\theta$ grows, the point spins around the circle.

For $\theta = \pi/4$ (that is, 45°), this gives

$$
e^{i\pi/4} = \cos 45^\circ + i\sin 45^\circ = \frac{\sqrt{2}}{2} + i\frac{\sqrt{2}}{2}.
$$

Since this point always sits on a circle of radius 1, multiplying by $e^{i\theta}$ never changes the size of a number, only its angle. That is exactly why multiplying $|1\rangle$'s amplitude by $e^{i\pi/4}$ does not change the measurement probability, but does rotate the state by 45° around the Z axis of the Bloch sphere.

</Callout>

### Seeing It on the Bloch Sphere

Since $|0\rangle$ and $|1\rangle$ lie *on* the Z axis, they do not move. This is our axis rule from the X and Y gates again: states on the axis stay put.

The interesting action is on the equator. Take $|+\rangle$, which points along the X axis:

- Z swings it half a turn to the opposite side, giving $|-\rangle$.
- S swings it a quarter turn, to the Y axis, giving $|+i\rangle$.
- T swings it an eighth turn, landing halfway between the X and Y axes on the equator.

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.PLUS)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  animate((progress) => {
    const phi = progress * Math.PI
    const v = BlochVector.fromAngles(Math.PI / 2, phi)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">After Z gate: $|+\rangle \to |-\rangle$</figcaption>

</figure>

</div>

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.PLUS)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  animate((progress) => {
    const phi = progress * (Math.PI / 2)
    const v = BlochVector.fromAngles(Math.PI / 2, phi)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">After S gate: $|+\rangle \to |{+i}\rangle$</figcaption>

</figure>

</div>

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.PLUS)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  animate((progress) => {
    const phi = progress * (Math.PI / 4)
    const v = BlochVector.fromAngles(Math.PI / 2, phi)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">After T gate: $|+\rangle \to \frac{1}{\sqrt{2}}(|0\rangle + e^{i\pi/4}|1\rangle)$</figcaption>

</figure>

</div>

</div>

### Applying Them Repeatedly

Half-turns, quarter-turns, and eighth-turns add up:

- Applying Z twice gives a full turn, so
  $$
  Z^2 = I.
  $$
  For example, the Z gate acting on $|+\rangle$ two times in a row returns it back to its original state,
  $$
  |+\rangle \xrightarrow{Z} |-\rangle \xrightarrow{Z} |+\rangle.
  $$
- S twice is a half-turn, which is the same as one Z gate,
  $$
  S^2 = Z.
  $$
- Applying the S gate four times gives a full turn,
  $$
  S^4 = I.
  $$
- T twice is a quarter-turn, the same as one S gate,
  $$
  T^2 = S.
  $$
- T four times is a half-turn, the same as one Z gate,
  $$
  T^4 = Z.
  $$
- Applying the T gate eight times gives a full turn,
  $$
  T^8 = I.
  $$

Notice that two S gates do the job of one Z, and two T gates do the job of one S -- so four T gates also do the job of one Z. To undo an S gate in one step, you would need a quarter-turn the other way, the inverse gate $S^\dagger$; likewise, undoing a T gate in one step needs an eighth-turn the other way, the inverse gate $T^\dagger$, both from the [reversibility section](#every-gate-can-be-undone) above.

<BeadExercise exercise={gatesZS}>

<Callout type="question" title="Try it yourself">

1. Start with $|0\rangle$ and apply Z. Does anything change on the sphere?
2. Prepare $|+\rangle$ with the H gate and apply S once, then again. Compare with applying Z once.
3. Apply T four times in a row and watch the state travel around the equator. How does the result compare to applying S twice?

</Callout>

</BeadExercise>

## The Hadamard Gate

So far, every gate you have encountered moves a qubit state between definite states or changes its phase. Here we will encounter a new type of gate that creates superpositions: the **Hadamard (H) gate**. It takes a qubit that is definitely 0 or definitely 1 and turns it into a perfect 50/50 mix of both. Almost every quantum algorithm starts with it.

### Creating Superposition

Applied to the basis states, H gives

$$
H|0\rangle
=
\frac{|0\rangle+|1\rangle}{\sqrt{2}}
=
|+\rangle,
\qquad
H|1\rangle
=
\frac{|0\rangle-|1\rangle}{\sqrt{2}}
=
|-\rangle.
$$

Notice that $|+\rangle$ and $|-\rangle$ give the same measurement results -- they both give 0 half the time and 1 half the time. The difference is in the sign of the $|1\rangle$ amplitude, which is the relative phase from the [advanced note on relative phase](#minus-sign-matter) above.

### The H Matrix

The H gate is represented by the matrix

$$
H=
\frac{1}{\sqrt{2}}
\begin{pmatrix}
1 & 1\\
1 & -1
\end{pmatrix}.
$$

Applying it to the general state $|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$ gives

$$
H|\psi\rangle
=
\frac{\alpha+\beta}{\sqrt{2}}|0\rangle
+
\frac{\alpha-\beta}{\sqrt{2}}|1\rangle.
$$

Instead of simply swapping amplitudes or changing their signs, H combines the two amplitudes to create new ones. Each output amplitude is built from both of the original amplitudes.

### Seeing It on the Bloch Sphere

On the Bloch sphere, H is also a half-turn rotation, but around a tilted axis: the line halfway between the X axis and the Z axis, marked orange in the animations below.

- The north pole $|0\rangle$ moves to $|+\rangle$, and the south pole $|1\rangle$ moves to $|-\rangle$.
- $|+\rangle$ moves back to $|0\rangle$, and $|-\rangle$ moves to $|1\rangle$.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  addAxisLine(blochSphere, [1, 0, 1])
  animate((progress) => {
    const theta = progress * Math.PI
    const x = (1 - Math.cos(theta)) / 2
    const y = -Math.sin(theta) / Math.sqrt(2)
    const z = (1 + Math.cos(theta)) / 2
    const v = BlochVector.from(x, y, z)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">After H gate: $|0\rangle \to |+\rangle$</figcaption>

</figure>

</div>

<div>

<figure>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ONE)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  blochSphere.add(qubit)
  const trace = createTraceLine(blochSphere)
  addAxisLine(blochSphere, [1, 0, 1])
  animate((progress) => {
    const theta = progress * Math.PI
    const x = -(1 - Math.cos(theta)) / 2
    const y = Math.sin(theta) / Math.sqrt(2)
    const z = -(1 + Math.cos(theta)) / 2
    const v = BlochVector.from(x, y, z)
    qubit.set(v)
    trace(v, progress)
  }, 2500, 'sinInOut', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">After H gate: $|1\rangle \to |-\rangle$</figcaption>

</figure>

</div>

</div>

### Applying H Twice

For basis states, H performs a half-turn, from the pole to the equator and vice versa. Since it's a half-turn, two of them make a full turn, and the qubit state returns to where it started,

$$
|0\rangle
\xrightarrow{H}
|+\rangle
\xrightarrow{H}
|0\rangle,
$$

meaning that $H^2=I$ holds, and H undoes itself just like X, Y, and Z.

The interesting part is what happens in the middle. After the first H, the qubit is in a 50/50 superposition, the state $|+\rangle=\frac{1}{\sqrt{2}}|0\rangle + \frac{1}{\sqrt{2}}|1\rangle$. The second H does not make things *more* random by introducing another superposition -- instead it turns the superposition into a certain answer. This happens because H combines amplitudes, as we have seen before,

$$
H|+\rangle
=
\frac{1}{\sqrt{2}}
\left(
\frac{|0\rangle+|1\rangle}{\sqrt{2}}
+
\frac{|0\rangle-|1\rangle}{\sqrt{2}}
\right)
=
|0\rangle.
$$

The $|0\rangle$ parts add up, and the $|1\rangle$ parts completely cancel out. This effect is called **interference**, and it is one of the reasons quantum computers can do things classical computers cannot.

<BeadExercise exercise={gatesH}>

<Callout type="question" title="Try it yourself">

1. Start with $|0\rangle$ and apply H. Where does the state end up?
2. Start with $|+\rangle$ and apply H. Where does the state end up? What does this tell you about applying H twice?
3. Start with $|0\rangle$, apply Z, then H. Compare it with applying H alone.

</Callout>

</BeadExercise>

## Combining Quantum Gates

So far we have applied one gate at a time. Real quantum algorithms apply gates one after another, and the result can be something none of the single gates does on its own.

### Gates in a Row

To combine gates, apply them in order, each acting on the result of the one before. The order of the gates matters, since we are dealing with matrix multiplication. For example, start with the state $|0\rangle$ and compare:

- H acting first, then X,
  $$
  |0\rangle \xrightarrow{H} |+\rangle \xrightarrow{X} |+\rangle.
  $$
- X acting first, then H,
  $$
  |0\rangle \xrightarrow{X} |1\rangle \xrightarrow{H} |-\rangle.
  $$

Now let's try a sequence of three gates: H, then Z, then H. Starting with the state $|0\rangle$,

$$
|0\rangle
\xrightarrow{H}
|+\rangle
\xrightarrow{Z}
|-\rangle
\xrightarrow{H}
|1\rangle.
$$

Notice that this is exactly what X does to the state $|0\rangle$. Starting with $|1\rangle$,

$$
|1\rangle
\xrightarrow{H}
|-\rangle
\xrightarrow{Z}
|+\rangle
\xrightarrow{H}
|0\rangle.
$$

Again, this matches the action of the X gate. In this case, the three gates together do the same job as one,

$$
HZH = X.
$$

Feel free to check that this equality holds by multiplying the matrices that represent the H and Z gates.

<BeadExercise exercise={gatesCombining}>

<Callout type="question" title="Try it yourself">

1. Start with $|0\rangle$ and apply H, then Z, then H. What is the final state?
2. Do the same starting from $|+\rangle$. What happens, and what does X do to $|+\rangle$?

</Callout>

</BeadExercise>

<BeadOnly>

<p class="h2" id="test-yourself">Test Yourself</p>

You now know the X, Y, Z, S, T, and Hadamard gates. Time to put them to the test with a game of **Gate Golf**.

In golf you want to sink the ball in as few strokes as possible. In Gate Golf the ball is the **qubit**, the hole is a **target state**, and every stroke is a **quantum gate**. On the Qbead, the current state of the qubit lights up blue and the target state green. Each level allows only a few gates and has a **par**, the smallest number of gates that solves it. Hit par and you get three stars. Some levels are impossible: if you think so, say so with the "Impossible!" button.

**How to play:** pick a gate. Its rotation axis lights up **orange** on the Qbead. Hold that axis horizontal and roll the Qbead around it until the gate snaps in. Every gate is simply a rotation of the Bloch sphere.

<GateGolf />

</BeadOnly>

## Quantum Gates in Reality

In the Qbead experiment that you performed, every gate is perfect -- that is, it yields the desired state every time, and every qubit keeps its state forever. Real quantum gates are more complicated.

On many real devices, a gate is a pulse of microwaves or laser light. While the pulse is on, the qubit's state slowly rotates on the Bloch sphere, going from $|0\rangle$ toward $|1\rangle$ and back. This back-and-forth motion is called a **Rabi oscillation**.

The pulse length sets the period of oscillation between the two states. The correct gate is obtained when the pulse is switched on just long enough to turn the state into the desired final state.

If the pulse is too long, the state overshoots and lands near the wanted state instead of on it. A measurement can then give a result that the ideal gate would never produce.

Errors also come from interaction with the environment. Qubits are never perfectly isolated, so heat and unwanted electrical signals from their surroundings disturb them. This noise slowly destroys superposition. This loss of quantum behavior is called **decoherence**, and it gives every qubit a limited lifetime. It is one reason many quantum computers are cooled to extremely low temperatures.

Small errors also add up, and useful algorithms require thousands of gates. The problem is reduced with more precise hardware, shorter circuits, and error correction.
