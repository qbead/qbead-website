---
title: Learn About the Qbead
highlight: Qbead
keywords: qbead
---
<script>
  import FancyHeader from '$lib/components/FancyHeading/FancyHeading.svelte'
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

<FancyHeader title={title} highlightText={highlight} altText="About"/>
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

</div>
