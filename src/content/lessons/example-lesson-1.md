---
title: Example Lesson 1
layout: lesson
keywords: example, lesson, learning
difficulty: Beginner
objectives:
  - Learn how to add metadata
  - Learn how to add equations
  - Create your own lesson
headerImage: https://spinwearables.com/images/banners/sensor_controller_actuator.png
description: Learn how to make a lesson
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'

  let a = 1
</script>

## This is a section title

This is some body text. You can use **bold text** to draw the eye to important information. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper, justo eget vehicula vestibulum, enim enim suscipit lectus, et sagittis nibh risus vel metus. Quisque eu ornare ante, et gravida mauris. Vivamus massa justo, sagittis non viverra sed, sodales non nisi. Nunc semper, massa a aliquet dictum, enim nisi malesuada orci, et elementum lectus turpis et velit.

### And Here is a Subsection

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

<div class="grid grid-cols-2 items-start gap-6">

<div>

A side-by-side may be useful when referring to code blocks or outlining/describing sections of code, though these can be formatted in any way you'd like.

</div>

```py
def say_hello():
  print("Oh. Hi there.")
```

</div>

## Images

You can easily add an image the normal markdown way. But to align it
and to add captions, you'll have to wrap it in a `figure` with appropriate
classes.

<figure class="flex flex-col items-center">

![Some image](https://spinwearables.com/images/banners/compass.png)

<figcaption>Figure 1: Some figure.</figcaption>
</figure>