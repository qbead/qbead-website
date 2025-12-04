---
title: The Device
layout: lesson
# topics can be keywords for SEO
keywords: example, lesson, learning
# below is metadata for lessons
topics: example, lesson, learning
difficulty: Beginner
objectives:
  - What is the Qbead
  - Inside the Qbead: hardware
  - Inside the Qbead: software
  - How is it meant to represent a qubit
headerImage: https://spinwearables.com/images/banners/sensor_controller_actuator.png
description: Introduction to the qbead toy
nextLesson: _internal/reference # specifically used by lessons to add a "next lesson" below
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
</script>

## What is the Qbead

The Qbead is a simulator that allows you to interact with a qubit with your hands
- Operations done via movement
- Fully programmable via USB and bluetooth
- Website-guided lecure materials
- Open source (and cheap!) hardware and software

<div class="flex flex-col items-center">

![^Figure 1: One of our Qbead prototypes]("https://github.com/qbead/qbead-website/blob/main/static/qbeadmedia/qbead_pic_round_nobck.png")

</div>

### Inside the Qbead: hardware

- The brains: Seeed XIAO nRF52840 Sense
  - Processor
  - USB port
  - Bluetooth chip
  - Inertial measurement unit
- The power: LiPo battery CLY502020 3.7V +140mAh 0.52Wh
- The colors: custom-made LED flexPCB
  - Flex PCB
  - 62 LEDs
- The frame: custom-made 3D printed cages
  - Inner cage holding the board and battery
  - Outer cage protecting the Qbead

<div class="flex flex-col items-center">

![^Figure 2: The components inside your Qbead]("https://github.com/qbead/qbead-website/blob/main/static/qbeadmedia/qbead_components.png")

</div>

<div class="flex flex-col items-center">

![^Figure 3: Blowup of the Qbead frame]("https://github.com/qbead/qbead-website/blob/main/static/qbeadmedia/qbead_onshape_explode_crop.mp4")

</div>

### Inside the Qbead: software

## Qbead vs. qubit 

<Callout title="Lesson Note">

Here is a callout box that can be used throughout a lesson to highlight an important point, note, or something students generally will need to draw attention to or remember.

</Callout>

<Callout>

Here is a plain one without a title

</Callout>

<Callout type="alert">

Here is a warning

</Callout>

## You can also add math

<Callout type="question">

Solve for $x$ given,

$
x^2 + x - 2 = 0
$

</Callout>

To solve for $x$ we can apply the *quadratic formula*.

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a},
$$

where,

$$
\begin{aligned}
a &= 1 \\
b &= 1 \\
c &= -2
\end{aligned}
$$

Substituting the values we get:

$$
\begin{aligned}
x &= \frac{-1 \pm \sqrt{1^2 - 4(1)(-2)}}{2(1)} \\
&= \frac{-1 \pm \sqrt{1^2 + 8}}{2} \\
&= -0.5 \pm 3/2 \\
&= -2, 1
\end{aligned}
$$

## You could even add some code

```py
def say_hello():
  print("Oh. Hi there.")
```


<div class="grid grid-cols-2 items-start gap-6">

<div>

A side-by-side may be useful when referring to code blocks or outlining/describing sections of code, though these can be formatted in any way you'd like.

However, this won't _collapse_ on mobile.

</div>

```html
<!-- Create a side-by-side layout -->
<div class="grid grid-cols-2 items-start gap-6">

<div>

Left Side.

</div>

<div>

Right Side.

</div>

</div>
```

</div>

<div class="grid grid-cols-1 md:grid-cols-2 items-start md:gap-6">

<div>

So to collapse on mobile, set the default grid cols to 1
with `grid-cols-1` then specify that on medium and up
we want 2 cols: `md: grid-cols-2`.

Do the same for the gap: `md:gap-6`.

</div>

```html
<!-- Create a side-by-side layout that collapses on mobile -->
<div class="grid grid-cols-1 md:grid-cols-2 items-start md:gap-6">

<div>

Left Side.

</div>

<div>

Right Side.

</div>

</div>
```

</div>




## Images

You can easily add an image the normal markdown way. To add a caption,
you can add a `^` to the image text like so: `![^some caption](url)`.
But to align it you'll have to wrap it in a `<div>` with appropriate
classes.

<div class="flex flex-col items-center">

![^Figure 1: Some image](https://spinwearables.com/images/banners/compass.png)

</div>
