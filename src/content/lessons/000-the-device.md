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
headerImage: "../../../static/qbeadmedia/qbead_pic_round_nobck.png"
description: Introduction to the Qbead
nextLesson: _internal/reference # specifically used by lessons to add a "next lesson" below
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'
</script>

## What is the Qbead

The Qbead is a simulator that lets you interact with a qubit with your hands.

The light in the Qbead represents the quantum state of a qubit.
Think of the light spot in the Qbead as the tip of the state vector in a Bloch sphere.
You do not know what this means yet? No worries, we got you covered! Check out our qubit lesson FIXME @Stefan link here

![^Figure 1: The Qbead represents a qubit by showing the qubit vector as a lighted-up LED](/qbeadmedia/qbead_pic_round_nobck.png)
FIXME @Stefan can we add here a side by side comparison of the Qbead (just the picture above) and the bloch sphere widget?

But with the Qbead we do not only see quantum states: we change them!
- By rotating your Qbead in any direction you perform qubit gates! This means, the vector of the qubit rotates around the Bloch sphere.
- By gently tapping the Qbead you perform a quantum measurement, with its axis along the tapping direction!

FIXME @Stefan maybe some widget or videos of qubit rotations and measurements would be good!


<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubitArrow = new QubitDisplay(state)
  blochSphere.add(qubitArrow)
}} />


<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

  <div>
  Here is some content that can be anything. The
  layout will collapse to single column on small screens.
  </div>

  <figure>
    <BlochSphereElement options={{
      fontSize: .8,
      showGrid: false,
    }} created={(blochSphere) => {
      let state = BlochVector.random()
      const qubitArrow = new QubitDisplay(state)
      // hide the labels
      qubitArrow.angleIndicators.visible = false
      qubitArrow.arrow.label.visible = false
      blochSphere.add(qubitArrow)
      animate((progress) => {
        qubitArrow.set(BlochVector.fromAngles(state.theta, state.phi + progress * Math.PI * 2))
      }, 3000, 'linear', true)
    }} />
    <figcaption class="text-sm text-gray-500">
      Figure 1. A bloch sphere without grid
    </figcaption>
  </figure>
</div>

 With these tools, we can now do a lot of fun quantum experiments while learning very important concepts in quantum physics and engineering.

Features:
- All operations done via movement: rotate it! shake it! tap it!
- Fully programmable through USB and bluetooth
- Website-guided interactive lecture materials
- Open source (and cheap!) hardware and software - soon you will be able to request yours!


### Inside the Qbead: hardware

- The brains: Seeed XIAO nRF52840 Sense, containing
  - Microprocessor to run the code
  - USB port for charging, loading code, and reading variables
  - Bluetooth for wireless communication
  - Inertial measurement unit to read out the Qbead movements
- The power: Lithium polymer battery CLY502020 3.7V +140mAh 0.52Wh
- The color: custom-made LED flexPCB
  - Flex PCB
  - 62 smart LEDs in series
- The frame: custom-made 3D printed shells
  - Inner shell holding the board and battery
  - Outer transparent shell protecting the Qbead

<div class="flex flex-col items-center">

![^Figure 2: The components inside your Qbead](/qbeadmedia/qbead_components.png)

</div>

<div class="flex flex-col items-center">

<figure>
<video controls class="w-full max-w-3xl mx-auto my-8">
  <source src="/qbeadmedia/qbead_onshape_explode_crop.mp4" type="video/mp4" />
  Your browser doesn't support video playback.
</video>
<label>Figure 3: Blowup of the Qbead frame</label>
</figure>

</div>

### Inside the Qbead: software

- Firmware Qbead.h that lays out the library of functions
- Sketches for each experiment that use several functions and put them into loops
FIXME @Stefan links to Qbead.h and example lessons?

## Limitations of our Qbead vs. an ideal qubit

Our Qbead is of course not exactly a qubit (otherwise it wouldn't so hard to build those!). Some of the important differences are:
- This is an electronic gadget, and so all the quantum mechanical effects are simulated - coded into our scripts
- Observing states without measuring - in real qubits, observing a state means measuring it. In the Qbead we chose to let you see the state and choose when to measure it because we think this has more educational value (ok, it also looks cooler!)
- Discreteness - we only have a set number of LEDs, while qubit states can rotate continuously in the Bloch sphere
- Representing mixed-state density matrices -
- Accuracy of visualization - an ideal qubit state is a vector pointing to an infinitely small point in the sphere, while our LEDs are larger than infinitely small points
- Accuracy of gates when done via analog gestures - hand gestures are of course not as accurate as the pulse gates used to rotate qubits. For the Qbead, we choose to options depending on the educational goal of the experiment: 1 let the error be to showcase the real problems with errors in qubits, or 2 lock gates in software so that your gates are always perfect.
