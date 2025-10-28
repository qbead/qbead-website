---
title: Lesson 1
date: 2020-08-01
layout: article
---

<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector } from '@qbead/bloch-sphere'
</script>

# {title}

This is the first lesson in the course. We will cover the following topics:

## Lists

- Topic 1
- Topic 2
- Topic 3

## Code blocks (using different methods)

```python
print("Hello, world!")
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

```cpp
void loop() {
  int t = millis();
  int t_repeating = t % 2500;
  int b = t_repeating / 10;
  SpinWheel.setLargeLEDsUniform(b, b, b);
  SpinWheel.drawFrame();
}
```

```js
let template = `blah blah\n blah`
```

## Math

Here is some math

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

```latex
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
```

## Html elements

<button type="button" class="btn preset-filled-primary-500">test button</button>

## Bloch sphere

<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubitArrow = new QubitDisplay(state)
  blochSphere.add(qubitArrow)
}} />

## Bloch sphere at the side

<figure class="xl:float-right xl:ml-6 mt-0 xl:w-120">
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
  }} />
  <figcaption class="text-sm text-gray-500">
    Figure 1. A bloch sphere without grid
  </figcaption>
</figure>

A bloch sphere created without labels by using the following code:

```js
let state = BlochVector.random()
const qubitArrow = new QubitDisplay(state)
// hide the labels
qubitArrow.angleIndicators.visible = false
qubitArrow.arrow.label.visible = false
blochSphere.add(qubitArrow)
```

<div class="clear-both"></div>

## Prose

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
