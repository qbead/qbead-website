---
title: Example Lesson 1
layout: lesson
keywords: example, lesson, learning
headerImage: https://spinwearables.com/images/banners/sensor_controller_actuator.png
description: Learn how to make a lesson
---

<script>
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
