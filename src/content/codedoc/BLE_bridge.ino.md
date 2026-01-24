---
layout: literate
---
```cpp class=codeblock
#include <Qbead.h>

Qbead::Qbead bead;

void setup() {
  bead.begin();
  Serial.println("Running BLE_bridge -- the Qbead will report its IMU readings over BLE and will present itself as a \"dumb\" spherical display.");
}

void loop() {
```

<div class="literate-text">

read IMU and sent over BLE (without printing to Serial)

</div>

```cpp class=codeblock
  bead.readIMU(false);
```

<div class="literate-text">

set Bloch Sphere Visualizer to last values received over BLE

</div>

```cpp class=codeblock
  bead.clear();
  bead.setBloch_deg_smooth(bead.t_ble, bead.p_ble, bead.c_ble);
  bead.show();
}
```
