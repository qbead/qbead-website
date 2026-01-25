---
title: Discover a quantum algorithm - dynamical decoupling
layout: lesson
keywords: quantum decoherence, qubit errors, quantum gates, dynamical decoupling
topics: quantum decoherence, dynamical decoupling
difficulty: Advanced
objectives:
  - Interact with the Qbead to play a game
  - Learn about the quantum protocol you just discovered - dynamical decoupling
  - Understand the realistic limitations of dynamical decoupling
description: Play with the Qbead and rediscover a quantum protocol by yourself! Observe the problem of decoherence and apply an error correction technique to restore coherence in our quantum state.
---

<script>
  import * as THREE from 'three'
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'

  function addTipDot(qubit, radius = 0.08, color = 0xffffff) {
    const ah = qubit.arrow.arrowHelper
    const geo = new THREE.SphereGeometry(radius, 16, 16)
    const mat = new THREE.MeshBasicMaterial({ color })
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

## The game

Goal: Get **only one LED** to light up

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Coherent state:** A single LED is on -- this is what you want to achieve and maintain!

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.ZERO)
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  addTipDot(qubit)
  blochSphere.add(qubit)
}} />

</div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Decohered state:** The LEDs spread out -- this is what happens when you leave the Qbead alone!

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const angles = [-0.4, -0.15, 0, 0.15, 0.4]
  const qubits = angles.map(offset => {
    const q = new QubitDisplay(BlochVector.fromAngles(0.3 + offset, offset * 2))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.06)
    blochSphere.add(q)
    return q
  })
  animate((progress) => {
    const spread = progress
    qubits.forEach((q, i) => {
      const offset = angles[i]
      q.set(BlochVector.fromAngles(0.3 + offset * spread * 2, offset * spread * 4))
    })
  }, 5000, 'linear', true)
}} />

</div>

</div>

<Callout type="info" title="Tips!">

Try **rotating** the Qbead with your hands and see what happens! To achieve the goal you only need to rotate it! -- but it may not be enough with rotating it once!

Gently **tapping** the Qbead once turns it off, and tapping again restarts the game: use this if things get too confusing!

</Callout>

<Callout type="question" title="What did you notice?">

Can you find a way to keep the Qbead light only in a **single LED**?
How about achieving this not permanently, but **regularly**?

</Callout>


## What have you done in this game?

You **discovered a quantum protocol**!
Or re-invented, as we know about it since 1998. But it probably took you less time than it took them! 
This is a crucial protocol used in all modalities of qubits in today's quantum computers: dynamical decoupling!

Your Qbead represents a qubit -- want to know more? Check the [device description](/lessons/000-the-device) and the [qubit lesson](/lessons/001-what-is-a-qubit).

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

A single LED on the Qbead corresponds to a single vector on the Bloch sphere -- a **coherent** qubit state.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const qubit = new QubitDisplay(BlochVector.fromAngles(Math.PI/4, Math.PI/3))
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  addTipDot(qubit)
  blochSphere.add(qubit)
}} />

</div>

</div>

Spreading LEDs is the way we represent **decoherence**, the most common error of today's real qubits!
Think of it as your quantum state drifting away from where it should be by itself, but you actually don't know where it goes!
This can be caused in real life by for example a constant magnetic field when your qubit is a single spin

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const n = 5
  const qubits = []
  for (let i = 0; i < n; i++) {
    const q = new QubitDisplay(BlochVector.fromAngles(Math.PI/4, 0))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.06)
    blochSphere.add(q)
    qubits.push(q)
  }
  animate((progress) => {
    const spread = Math.sin(progress * Math.PI) * 0.8
    qubits.forEach((q, i) => {
      const offset = (i - (n-1)/2) / (n-1)
      q.set(BlochVector.fromAngles(Math.PI/4 + offset * spread, offset * spread * 2))
    })
  }, 4000, 'linear', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">Decoherence: the state vectors spread apart over time</figcaption>

By rotating the Qbead you were performing **quantum gates** with your qubit.
Timing them to the decoherence timescales allowed you to compensate for this drift

If you do it well, you can see that at regular intervals, your Qbead goes back to a single LED. You (or the scientists in real life) can then apply your computational quantum gates in between your dynamical decoupling rotations.

This means **you are fighting the decoherence and winning!** So you don't lose your quantum information


## Reality check: is it really that easy?

In real quantum physics experiments, things are more complex.

For example, in our experiment we are seeing the quantum state as it decoheres. But in real life you cannot **observe a quantum state** without affecting it. To observe it you need to **measure** it, and you know what happens when we measure a quantum state in quantum mechanics, do you? No? Then check the [measurement lesson](/lessons/010-commuting-measurements).

In real systems, decoherence happens in an **arbitrary axis**, not only vertical as in our experiment, so scientists have to apply more quantum gates to compensate for it!

Our quantum gates are **not perfect**. This means that we introduce errors that slightly change the qubit state. Doing fewer gates is then better than doing many!

There are many **other sources of decoherence** and errors with different timescales. We have focused on slow drifts, but faster drifts also occur, and we scientists have to come up with smart ideas to fix those, either by improving the physical qubits themselves, or on the qubit control side! And for the unavoidable residual errors, we have quantum error correction!

## Decoherence in other words: an analogy

As you just saw by yourself, we call decoherence an **uncontrolled drift** in your quantum state. Let's see if we can explain what it is using an analogy with a classical system.

Imagine that you have a ball in a flat plane, the ball being your qubit state. It turns out that this plane is slightly tilted, so if you don't do anything, the ball falls to one side.
Your goal is to keep the ball in the center of your plane, because only there you can act on it (= do your quantum computation without errors, in our case!). But the plane cannot be made horizontal, you can only either tilt it to one side or the other

How would you keep the ball in the center?
You got it! Just tilt the plane from one side to the other! Then the ball oscillates and it passes the center regularly! That is exactly what you did!

# Dynamical decoupling: the science behind

## Quantum Decoherence and Dynamical Decoupling

Quantum decoherence is the loss of quantum coherence, where a loss of information of a system to its environment occurs due to noise. Quantum computing relies on quantum coherence. In order to suppress decoherence, a method, called Dynamic Decoupling (DD), can be applied. In this lesson you will use the QBead to explore decoherence and see how Dynamical Decoupling can help us solve it. By experimenting with the QBead, you will get a hands-on sense of how quantum information can be preserved!

## Topics

- Problem: Decoherence
- Solution: Perfect Dynamical Decoupling
- Challenge: Imperfect Dynamical Decoupling

## Decoherence

Quantum systems are fragile. When a system interacts with its environment (through thermal fluctuations, electromagnetic fields or other sources of noise), it gradually loses its ability to maintain coherent superpositions.
This process is called decoherence, and it destroys the interference effects that quantum computers rely on. Without coherence, operations on a quantum computer become unreliable.

## Example of decoherence in a real quantum system: spin precession

For this example, let's assume our quantum system is a spin-1/2 particle, and our environmental noise is an external constant magnetic field. Like in any other qubit, the quantum state of the spin can be visualized as a vector pointing somewhere on a sphere, the *Bloch Sphere*. This is the single LED in your Qbead!
When the external field is not aligned with the qubit state, it induces a torque on the system's magnetic moment that causes the system to "wobble" around the magnetic field axis. This wobbling is known as *precession*.

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI / 3
  const qubit = new QubitDisplay(BlochVector.fromAngles(theta, 0))
  qubit.angleIndicators.visible = false
  qubit.arrow.label.visible = false
  addTipDot(qubit)
  blochSphere.add(qubit)
  animate((progress) => {
    const phi = progress * Math.PI * 2
    qubit.set(BlochVector.fromAngles(theta, phi))
  }, 3000, 'linear', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">A qubit state precessing around the Z axis due to an external magnetic field</figcaption>

## Decoherence in Spin Systems

In real spin systems such as the one we simulate with our QBead, small variations in the magnetic field or random interactions with the environment cause different spins in an ensemble to precess at slightly different rates.
Over time, these small differences accumulate, causing the spins to fan out around the precession axis. This spreading represents a loss of phase coherence between individual spins, that is the manifestation of *decoherence*.

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI / 3
  const n = 5
  const speeds = [0.7, 0.85, 1.0, 1.15, 1.3]
  const colors = [0x4488ff, 0x88aaff, 0xffffff, 0xffaa88, 0xff4444]
  const qubits = speeds.map((speed, i) => {
    const q = new QubitDisplay(BlochVector.fromAngles(theta, 0))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.06, colors[i])
    blochSphere.add(q)
    return { qubit: q, speed }
  })
  animate((progress) => {
    qubits.forEach(({ qubit, speed }) => {
      const phi = progress * Math.PI * 2 * speed
      qubit.set(BlochVector.fromAngles(theta, phi))
    })
  }, 4000, 'linear', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">Different spins precess at slightly different rates, causing them to fan out (decohere)</figcaption>

## Dynamical Decoupling

The goal of this experiment is to demonstrate Dynamical Decoupling (DD), which is a quantum control procedure that can be used to reverse the decoherence of the ensemble. DD involves applying a rapid series of control pulses that invert the phase differences that accumulate between the states.
By carefully applying these pulses, we can reverse or suppress decoherence, keeping the spins more coherent for longer.


# Experiments

This lesson is comprised of three QBead experiments, which will increase in complexity to help you understand the basic principles of Decoherence and Dynamical Decoupling. The first experiment is a basic, non-interactive demonstration of the principle of decoherence, while the following two experiments are opportunities for you to try implementing the Dynamical Decoupling procedure yourself.

## Decoherence Visualisation

We can model the loss of coherence on the QBead as a "spreading-out" of a known state vector (representing a coherent ensemble) into a collection of vectors representing individual states that progressively lose coherence with each other. This is exactly what the first experiment shows; the initial coherent state is represented by an (unmoving) white LED, but as time passes, the decohering states begin to appear as red LEDs that slowly spread away from the white one. Watch how quickly the coherent phase of the system spreads out into a big collection of individual states!

This is a very big problem for quantum computers, as quantum systems are only useful for computation as long as they remain coherent. However, it is very challenging to eliminate quantum noise entirely, which is why quantum control protocols such as Dynamical Decoupling are required to maintain coherence.

## Simple Dynamical Decoupling

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI / 3
  const n = 3
  const speeds = [0.8, 1.0, 1.2]
  const colors = [0x4488ff, 0xffffff, 0xff4444]
  const qubits = speeds.map((speed, i) => {
    const q = new QubitDisplay(BlochVector.fromAngles(theta, 0))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.07, colors[i])
    blochSphere.add(q)
    return { qubit: q, speed }
  })
  const spreadRate = Math.PI * 2
  animate((progress) => {
    const flipStart = 0.46
    const flipEnd = 0.5
    const refocusEnd = 0.9
    if (progress < flipStart) {
      // Spreading: vectors fan out
      const t = progress / flipStart
      qubits.forEach(({ qubit, speed }) => {
        const phi = t * spreadRate * speed
        qubit.set(BlochVector.fromAngles(theta, phi))
      })
    } else if (progress < flipEnd) {
      // Flip: theta moves straight down, phi stays fixed
      const f = (progress - flipStart) / (flipEnd - flipStart)
      const currentTheta = theta + (Math.PI - 2 * theta) * f
      qubits.forEach(({ qubit, speed }) => {
        qubit.set(BlochVector.fromAngles(currentTheta, spreadRate * speed))
      })
    } else if (progress < refocusEnd) {
      // Refocusing: vectors converge back together
      const t = (progress - flipEnd) / (refocusEnd - flipEnd)
      qubits.forEach(({ qubit, speed }) => {
        const phi = spreadRate * speed * (1 - t)
        qubit.set(BlochVector.fromAngles(Math.PI - theta, phi))
      })
    } else {
      // Pause at refocused state
      qubits.forEach(({ qubit }) => {
        qubit.set(BlochVector.fromAngles(Math.PI - theta, 0))
      })
    }
  }, 6000, 'linear', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">Vectors spread apart, then a 180-degree flip reverses the drift and they refocus</figcaption>

This experiment gives you the opportunity to observe phase decoherence in a system on the QBead, and to implement the Dynamical Decoupling protocol yourself!

The quantum ensemble is modeled by a white light on the QBead that immediately begins to rotate around the green point at the top. This rotating behaviour is called *precession*; see the end of this lesson if you would like to learn more. As time progresses, notice how two other lights (a blue and a red one) begin to emerge from around the white one... these represent states in our quantum system that have decohered from the system itself, due to something called quantum noise.

After some time, these points will have spread out from one another, and now the Dynamical Decoupling procedure is required to bring them back together so that the system is once again coherent. This procedure is surprisingly straightforward; all you have to do is **flip the QBead upside down**!

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**Before the flip:** vectors spread apart as they precess at different speeds.

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI / 3
  const spreadRate = Math.PI * 2
  const speeds = [0.8, 1.0, 1.2]
  const colors = [0x4488ff, 0xffffff, 0xff4444]
  const qubits = speeds.map((speed, i) => {
    const q = new QubitDisplay(BlochVector.fromAngles(theta, 0))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.07, colors[i])
    blochSphere.add(q)
    return { qubit: q, speed }
  })
  animate((progress) => {
    qubits.forEach(({ qubit, speed }) => {
      const phi = progress * spreadRate * speed
      qubit.set(BlochVector.fromAngles(theta, phi))
    })
  }, 4000, 'linear', true)
}} />

</div>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

<div>

**After the flip:** the qubit that was "ahead" is now "behind" and vice versa, so they converge back together!

</div>

<div>

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI - Math.PI / 3
  const spreadRate = Math.PI * 2
  const speeds = [0.8, 1.0, 1.2]
  const colors = [0x4488ff, 0xffffff, 0xff4444]
  const qubits = speeds.map((speed, i) => {
    const q = new QubitDisplay(BlochVector.fromAngles(theta, spreadRate * speed))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.07, colors[i])
    blochSphere.add(q)
    return { qubit: q, speed }
  })
  animate((progress) => {
    qubits.forEach(({ qubit, speed }) => {
      const phi = spreadRate * speed * (1 - progress)
      qubit.set(BlochVector.fromAngles(theta, phi))
    })
  }, 4000, 'linear', true)
}} />

</div>

</div>

Once you have inverted the QBead, watch as the vectors begin to overlap with one another again; the blue vector is now "behind" the others and rushes to "catch up", while the red vector (now at the front) "slows" down. This means that the quantum noise is now undoing its previous decoherence!

In this Simple version of the experiment, the green LED is restricted in the orientations it can be. This means that it is locked to the closest 90-degree increment of the sphere to the top, so that the green point doesn't move around too much. This is done to stabilise the rotation of the blue, white, and red points, as in reality, shaky hands can disrupt the Dynamical Decoupling procedure! This is the problem that this simplified experiment is trying to fix; by restricting the possible orientations of the green point, the "flip" is easier to execute.

Please note that this experiment is equipped with a reset sequence which will engage periodically. This means you don't have to worry if you make a mistake with flipping the QBead, as the reset will bring you back to the start. The sequence is shown when the green LED begins to "blink" for a short period and all other vectors disappear.

## Challenge: Realistic Dynamical Decoupling

<BlochSphereElement options={{
  fontSize: 0.8,
  showGrid: true,
}} created={(blochSphere) => {
  const theta = Math.PI / 3
  const spreadRate = Math.PI * 2
  const speeds = [0.8, 1.0, 1.2]
  const colors = [0x4488ff, 0xffffff, 0xff4444]
  const thetaErrors = [-0.15, 0, 0.12]
  const qubits = speeds.map((speed, i) => {
    const q = new QubitDisplay(BlochVector.fromAngles(theta, 0))
    q.angleIndicators.visible = false
    q.arrow.label.visible = false
    addTipDot(q, 0.07, colors[i])
    blochSphere.add(q)
    return { qubit: q, speed, thetaErr: thetaErrors[i] }
  })
  animate((progress) => {
    const flipStart = 0.46
    const flipEnd = 0.5
    const refocusEnd = 0.9
    if (progress < flipStart) {
      const t = progress / flipStart
      qubits.forEach(({ qubit, speed }) => {
        const phi = t * spreadRate * speed
        qubit.set(BlochVector.fromAngles(theta, phi))
      })
    } else if (progress < flipEnd) {
      const f = (progress - flipStart) / (flipEnd - flipStart)
      qubits.forEach(({ qubit, speed, thetaErr }) => {
        const targetTheta = Math.PI - theta + thetaErr
        const currentTheta = theta + (targetTheta - theta) * f
        qubit.set(BlochVector.fromAngles(currentTheta, spreadRate * speed))
      })
    } else if (progress < refocusEnd) {
      const t = (progress - flipEnd) / (refocusEnd - flipEnd)
      qubits.forEach(({ qubit, speed, thetaErr }) => {
        const flippedTheta = Math.PI - theta + thetaErr
        const phi = spreadRate * speed * (1 - t)
        qubit.set(BlochVector.fromAngles(flippedTheta, phi))
      })
    } else {
      qubits.forEach(({ qubit, thetaErr }) => {
        qubit.set(BlochVector.fromAngles(Math.PI - theta + thetaErr, 0))
      })
    }
  }, 6000, 'linear', true)
}} />

<figcaption class="text-sm text-gray-500 text-center mt-2">In realistic DD, imperfect flips cause vectors to drift out of plane -- the refocusing is never perfect</figcaption>

In this advanced version of the Dynamical Decoupling procedure, the magnetic field axis is no longer restricted to 90-degree increments, meaning the green LED always points *truly* vertical. This means that moving or rotating the QBead even a small amount can shift the blue, white, and red points out of plane with one another, making it almost impossible to successfully implement the Dynamical Decoupling procedure! This also means that when you do apply the procedure, the flip must be both (a) instantaneous and (b) perfectly 180 degrees, as otherwise the planes of precession can again become misaligned. It is difficult to get right, but the experiment is otherwise identical to the simple version. This experiment demonstrates how careful we need to be with these quantum systems in the real world, and how perfectly we need to apply quantum control protocols.


# Learn More

## More on the Dynamical Decoupling Experiment

*What is exactly happening when applying Dynamical Decoupling on the QBead?*

Dynamical Decoupling (DD) is a procedure that reverses the decoherence of the ensemble. The key idea is to flip the QBead by 180 degrees around an axis perpendicular to the main precession axis. This inverts the phase differences that have accumulated, effectively refocusing the ensemble.

If you measure the time that the three vectors have been decohering for (since they were all in-phase) to be $\tau$, then $\tau$ time after you apply the decoupling procedure you will see that the ensemble is again coherent as the three vectors overlap one another again. Now, you can let the ensemble begin to decohere for another period of $\tau$, apply the decoupling procedure again, and so forth, thus creating a periodic routine of decoherence and decoupling. The stricter the tolerance you require is (i.e., the "amount" of decoherence that you find to be acceptable), the more often you will need to apply the decoupling procedure (i.e., the shorter $\tau$ should be).

Your routine should look like this:

1. Begin the experiment, and watch the vectors spread out for a time $\tau$.
2. Apply the decoupling procedure at time $\tau$. At time $2\tau$, notice that the ensemble is once again coherent.
3. At time $3\tau$, apply the procedure once more.
4. Repeat!

Notice that after you let the ensemble decohere for time $\tau$, applying the dynamical decoupling procedure every $2\tau$ periods of time will maintain a (semi) coherent ensemble!

If the ensemble has decohered, each state in the system is precessing on *different* planes while the QBead is being flipped, since each of their planes are no longer aligned while their orientation relative to the magnetic field changes. Once the system has been flipped fully, then the planes of precession of every state in the ensemble are re-aligned, but in the moment of the flip they can become disaligned if the flip is not quick enough.

## Frequency Of The Pulses

The timing/frequency of the pulses determines how well the decoherence can be reversed. Each pulse ("flip") inverts the phase errors that have built up over a time period, denoted by $\tau$ in the experiment. If the system is allowed to decohere for too long before a pulse is applied, the states will spread out too far and cannot be perfectly re-aligned. If the pulses are applied frequently enough, the system remains mostly coherent. Thus, the frequency of the pulses must be chosen so that each flip happens just as the phase errors begin to accumulate, continually refocusing the quantum ensemble and maintaining coherence over time.
