# Introduction

This is the first lesson in the course. We will cover the following topics:

## Topics

- Topic 1
- Topic 2
- Topic 3

```python
print("Hello, world!")
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

<script>
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
</script>

<CodeBlock lang="py" lineNumbers code={`
def sayHello():
  print("Hello, world!")
`}/>

```js
let template = `blah blah\n blah`
```

Here is some math

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

```latex
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
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

<button type="button" class="btn preset-filled-primary-500">test button</button>
