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
  import { Segment } from '@skeletonlabs/skeleton-svelte'
  const SegmentItem = Segment.Item

  let align = $state('left')
</script>

## Some subtitle

To solve for `x` we can apply the *quadratic formula*.

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a},
$$

where,

<Callout title="Lesson Note">

Here is a callout box that can be used throughout a lesson to highlight an important point, note, or something students generally will need to draw attention to or remember.

</Callout>

<Callout>

Here is a plain one without a title

</Callout>

<Callout type="alert">

Here is a warning

</Callout>

$$
\begin{aligned}
a &= 1 \\
b &= 1 \\
c &= -1
\end{aligned}
$$

Substituting the values we get:

$$
\begin{aligned}
x &= \frac{-1 \pm \sqrt{1^2 - 4(1)(-1)}}{2(1)} \\
&= \frac{-1 \pm \sqrt{1^2 + 4}}{2}
\end{aligned}
$$

<Segment name="align" value={align} onValueChange={(e) => (align = e.value)}>
<SegmentItem value="left">One</SegmentItem>
<SegmentItem value="center">Two</SegmentItem>
</Segment>
