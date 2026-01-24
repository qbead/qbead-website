---
layout: literate
---
<div class="literate-text">

# Dynamical Decoupling (Bar Visualization)

This example demonstrates dynamical decoupling using a bar visualization.
Instead of tracking a single quantum state vector, we track the "spread"
that many such vectors might have accumulated over time.

The spread increases based on the device orientation (inner product between
the zero axis and gravity). A bar is drawn around the equator showing the
current spread - the wider the bar, the more decoherence has occurred.

The user can tap the Qbead to reset the spread back to zero.

</div>

<div class="literate-text">

First, let's include the Qbead library and set up a few useful data structures.

</div>

```cpp class=codeblock
#include <Qbead.h>

Qbead::Qbead bead;
```

<div class="literate-text">

The zero axis is the fixed axis around which decoherence rotates.

</div>

```cpp class=codeblock
BlochVector zero_axis(0, 0);
```

<div class="literate-text">

Track the spread of the quantum state ensemble.

</div>

```cpp class=codeblock
float spread = 0;
```

<div class="literate-text">

The section (theta level) at which to draw the bar.

</div>

```cpp class=codeblock
const int bar_section = 3;
```

<div class="literate-text">

Prepare some colors for the visualization during the game.

</div>

```cpp class=codeblock
uint32_t purple = color(255, 0, 255);
uint32_t white = color(255, 255, 255);
```

<div class="literate-text">

## Setup

The setup function is called once when the Qbead is powered on and it is used to initialize the Qbead and set up the game.

</div>

```cpp class=codeblock
void setup() {
  bead.begin();
  bead.setBrightness(25);
```

<div class="literate-text">

Test the pixels by flashing a colorful pattern to make sure they are working.

</div>

```cpp class=codeblock
  bead.testPixels();
}
```

<div class="literate-text">

## Event loop

The loop function is called repeatedly until the Qbead is powered off.
It is used to read the IMU and update the spread of the ensemble.

</div>

```cpp class=codeblock
void loop() {
  static bool bar_visible = true;
```

<div class="literate-text">

Read the IMU to get the current gravity direction.

</div>

```cpp class=codeblock
  bead.readIMU(false);
```

<div class="literate-text">

Clear the display.

</div>

```cpp class=codeblock
  bead.clear();
```

<div class="literate-text">

### Draw the bar showing the current spread.

</div>

<div class="literate-text">

The bar is only visible when the user has tapped to reveal it.
Each tap toggles the visibility on or off.

</div>

```cpp class=codeblock
  if (bar_visible) {
    int spread_int = int(abs(spread));
    float spread_frac = abs(spread) - spread_int;
```

<div class="literate-text">

Draw a bar from -spread_int to +spread_int around the equator.

</div>

```cpp class=codeblock
    for (int leg = -spread_int; leg <= spread_int; leg++) {
      bead.setLegPixelColor(leg, bar_section, purple);
    }
```

<div class="literate-text">

Partially light the outermost LEDs based on the fractional part of spread.

</div>

```cpp class=codeblock
    if (spread_int < QB_NLEGS / 2) {
      uint32_t edge_color = scaleColorQuad(spread_frac, purple);
      bead.setLegPixelColor(spread_int + 1, bar_section, edge_color);
      bead.setLegPixelColor(-(spread_int + 1), bar_section, edge_color);
    }
  }
```

<div class="literate-text">

Show the result.

</div>

```cpp class=codeblock
  bead.show();
```

<div class="literate-text">

### Simulate the decoherence

The spread increases based on the inner product between the zero axis and gravity.
This represents how the ensemble of quantum states would spread out over time.

</div>

```cpp class=codeblock
  float spread_rate = 0.004 * innerProductGeom(zero_axis, BlochVector(bead.x, bead.y, bead.z));
  spread += spread_rate;
```

<div class="literate-text">

Keep spread within bounds of plus-or-minus half the number of legs.

</div>

```cpp class=codeblock
  float max_spread = QB_NLEGS / 2.0;
  spread = constrain(spread, -max_spread, max_spread);
```

<div class="literate-text">

### Check for taps

If the user taps the Qbead, toggle the visibility and reset the spread.

</div>

```cpp class=codeblock
  if (bead.wasTapped()) {
    Serial.println("TAP");
    bar_visible = !bar_visible;
  }

  bar_visible = bar_visible || (millis() < 5000);

  Serial.print(millis());
  Serial.print("  | Visible: ");
  Serial.print(bar_visible);
  Serial.print(" | Spread: ");
  Serial.print(spread);
  Serial.print(" | Rate: ");
  Serial.println(spread_rate);
}
```
