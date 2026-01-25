---
title: The Qbead
layout: lesson
# topics can be keywords for SEO
keywords: example, lesson, learning
# below is metadata for lessons
topics: example, lesson, learning
difficulty: Beginner
objectives:
  - What is the Qbead
  - Inside the Qbead - hardware and software
  - Qbead vs qubit - how is the Qbead meant to represent a qubit
headerImage: "/qbeadmedia/qbead_pic_round_nobck.png"
description: Introduction to the Qbead
nextLesson: lessons/001-what-is-a-qubit
---

<script>
  import * as THREE from 'three'
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'

  function addTipDot(qubit, radius = 0.08) {
    const ah = qubit.arrow.arrowHelper
    const geo = new THREE.SphereGeometry(radius, 16, 16)
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const dot = new THREE.Mesh(geo, mat)
    dot.position.set(0, 1, 0)
    ah.add(dot)
  }

  function setQubitOpacity(qubit, opacity) {
    qubit.traverse((child) => {
      if (child.material) {
        child.material.transparent = true
        child.material.opacity = opacity
      }
    })
  }
</script>

## What is the Qbead

The Qbead is a **simulator** that lets you interact with a qubit with your hands.

With it we want you to explore the **strange laws of quantum mechanics**, all by yourself! No math or physics background required!
Try rotating it, tapping it, shaking it and see what happens!

But wait, how is this a qubit?
The **light** in the Qbead represents the **quantum state** of a qubit.
Think of the light spot in the Qbead as the tip of the state vector in a Bloch sphere.
You do not know what this means yet? No worries, we got you covered! Check out our [qubit lesson](/lessons/001-what-is-a-qubit).

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<figure>
<img src="/qbeadmedia/qbead_pic_round_nobck.png" alt="The Qbead device" />
<figcaption class="text-sm text-gray-500 text-center mt-2">Figure 1: The Qbead represents a qubit by showing the qubit vector as a lighted-up LED</figcaption>
</figure>

<figure>
<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.fromAngles(Math.PI/2, Math.PI/2))
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  addTipDot(qubit)
  blochSphere.add(qubit)
}} />
<figcaption class="text-sm text-gray-500 text-center mt-2">The same state shown on the Bloch sphere</figcaption>
</figure>

</div>

But with the Qbead we do not only see quantum states: **we change them**.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

By **rotating** your Qbead in any direction you can perform **qubit gates**. This means, the state vector of the qubit rotates to another position in the Bloch sphere.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const startTheta = Math.random() * Math.PI
  const startPhi = Math.random() * Math.PI * 2
  const qubit = new QubitDisplay(BlochVector.fromAngles(startTheta, startPhi))
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  addTipDot(qubit)
  blochSphere.add(qubit)
  animate((progress) => {
    const swing = Math.sin(progress * Math.PI * 2) * 0.8
    qubit.set(BlochVector.fromAngles(startTheta, startPhi + swing))
  }, 4000, 'linear', true)
}} />

</div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

By gently **tapping** the Qbead you perform a **quantum measurement**, with its axis along the tapping direction!

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const startTheta = Math.random() * Math.PI
  const startPhi = Math.random() * Math.PI * 2
  const randomQubit = new QubitDisplay(BlochVector.fromAngles(startTheta, startPhi))
  const zeroQubit = new QubitDisplay(BlochVector.ZERO)
  const oneQubit = new QubitDisplay(BlochVector.ONE)
  for (const q of [randomQubit, zeroQubit, oneQubit]) {
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q)
    blochSphere.add(q)
  }
  setQubitOpacity(zeroQubit, 0)
  setQubitOpacity(oneQubit, 0)
  setQubitOpacity(randomQubit,  0)
  const target = Math.random() < Math.cos(startTheta / 2) ** 2 ? zeroQubit : oneQubit
  animate((progress) => {
    setQubitOpacity(randomQubit, progress < 0.2 ? 1 : 0)
    setQubitOpacity(target, progress)
  }, 2000, 'linear', true)
}} />

</div>

</div>


With these tools, we can now do a lot of fun quantum experiments while learning very important concepts in quantum physics and engineering.

In short, the Qbead features:
- **Interactivity**, as all operations are done via movement: rotate it! shake it! tap it!
- **Fully programmable** through USB and bluetooth
- **Website-guided** interactive lecture materials
- **Open source** (and cheap!) hardware and software - soon you will be able to request yours!


### Inside the Qbead: hardware

The **brains** 
Seeed XIAO nRF52840 Sense arduino board, containing
- A microprocessor to run the code
- A USB port for charging, loading code, and reading sensors or other variables
- Bluetooth for wireless communication
- An inertial measurement unit to read out the Qbead movement

The **power**
Lithium polymer battery CLY502020 3.7V +140mAh 0.52Wh

The**light**
Custom-made LED flexible printed circuit board with 62 smart LEDs

The **frame**
Custom-made 3D printed shells including:
- Inner shell holding the board and battery
- Outer transparent shell protecting the Qbead

<div class="flex flex-col items-center">

![^Figure 2: The components inside your Qbead](/qbeadmedia/qbead_components.png)

</div>

<div class="w-full md:w-1/2 mx-auto">

<figure>
<video
autoplay
loop
muted
playsinline
on:loadedmetadata={e => { e.target.playbackRate = 2; }}>
  <source src="/qbeadmedia/qbead_onshape_explode_crop.mp4" type="video/mp4" />
  Your browser doesn't support video playback.
</video>
<figcaption>Figure 3: Blowup of the Qbead frame</figcaption>
</figure>

</div>

### Inside the Qbead: software

We have built a **library of functions** to code the Qbead [Qbead.h](/codedoc/Qbead.h). Think of these as the parts of your experiment. One example is a function that reads the inertial measurement unit sensors and outputs its measurements. Another example is a function that lights up a LED representing a specific quantum vector in a specific color.

Using this library, we put together one sketch for each experiment, each of them containing several of these functions into a loop [Sketches](/codedoc/Tap_to_Measure.ino). For example, the following loop is used for the Tap to measure experiment:
1. Read the inertial measurement unit
2. Calculate if the measurement is a tap
3. Calculate in which direction
4. Turn LED red or blue in that axis
5. Slowly turn LED white
6. Start again from 1.

These are our experiments, but you can edit, change, and code whatever you like!

## Limitations of our Qbead vs. an ideal qubit

Our Qbead is of course **not a real qubit** (otherwise it wouldn't so hard to build those!). Some of the important differences are:
- This is an electronic gadget, and so all the quantum mechanical effects are simulated - coded into our sketches
- Observing states without measuring - in real qubits, observing a state means measuring it. In the Qbead we chose to let you see the state and choose when to measure it because we think this has more educational value (ok, it also looks cooler!)
- Discreteness - we only have a set number of LEDs, while qubit states can rotate continuously in the Bloch sphere
- Representing mixed-state density matrices -
- Accuracy of visualization - an ideal qubit state is a vector pointing to an infinitely small point in the sphere, while our LEDs are larger than infinitely small points
- Accuracy of gates when done via analog gestures - hand gestures are of course not as accurate as the pulse gates used to rotate qubits. For the Qbead, we choose to options depending on the educational goal of the experiment: 1 let the error be to showcase the real problems with errors in qubits, or 2 lock gates in software so that your gates are always perfect.
