---
title: CHSH Game - The Power of Entanglement
layout: lesson
keywords: quantum entanglement, correlation, CHSH Game, Bloch sphere
topics: quantum mechanics, theory, advanced math
difficulty: Advanced
objectives:
  - Understand how quantum entanglement works.
  - Play the CHSH Game using both classical and quantum strategies.
  - Visualize quantum entanglement and grasp the quantum advantage over classical correlation.
headerImage: /lessons/chsh_game_entanglement_lesson_cover.png
description: Learn how quantum entanglement works and its advantages by playing the CHSH game.
---

<script>
  import * as THREE from 'three'
  import Callout from '$lib/components/Callout/Callout.svelte'
  import ExtendableCallout from '$lib/components/Callout/ExtendableCallout.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import BeadPairing from '$lib/components/Bead/BeadPairing.svelte'
  import Picker from '$lib/components/Bead/Picker.svelte'
  import { classicalStrategyPicker } from '$lib/bead/exercises'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates, animate } from '@qbead/bloch-sphere'

  function addAxisLine(blochSphere, dir, color = 0xf97316, radius = 0.012) {
    const n = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
    const mat = new THREE.MeshBasicMaterial({ color })

    const geo = new THREE.CylinderGeometry(radius, radius, 2, 8)
    const line = new THREE.Mesh(geo, mat)
    line.quaternion.copy(quaternion)
    blochSphere.add(line)

    const headHeight = 0.12
    const headRadius = 0.045
    const headGeo = new THREE.ConeGeometry(headRadius, headHeight, 12)
    const head = new THREE.Mesh(headGeo, mat)
    head.quaternion.copy(quaternion)
    head.position.copy(n.clone().multiplyScalar(1 - headHeight / 2))
    blochSphere.add(head)
  }

  function createTraceLine(blochSphere, color = 0x38bdf8, maxPoints = 128) {
    const positions = new Float32Array(maxPoints * 3)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setDrawRange(0, 0)
    const material = new THREE.LineBasicMaterial({ color })
    const line = new THREE.Line(geometry, material)
    blochSphere.add(line)

    let count = 0
    let lastProgress = 0
    return function trace(point, progress) {
      if (progress < lastProgress) count = 0
      lastProgress = progress
      if (count < maxPoints) {
        positions[count * 3] = point.x
        positions[count * 3 + 1] = point.y
        positions[count * 3 + 2] = point.z
        count++
        geometry.attributes.position.needsUpdate = true
        geometry.setDrawRange(0, count)
      }
    }
  }

</script>

<!-- <BeadPairing /> -->

## Introduction

This lesson is about **quantum entanglement** and how it can be used to achieve correlations that cannot be explained classically. We will explore this concept through the **CHSH Game**, a simple game that demonstrates the power of entanglement.

### Lesson goals
  - Showcase the difference between classical and quantum correlation.
  - Explore the concept of entanglement and how it can be used to achieve correlations that cannot be explained classically.
  - Introduce the CHSH Game and its rules, and explore classical and quantum strategies.
  - Visualize the quantum advantage over classical correlation through a simulation.


## Entanglement Theory

In [previous lessons](/lessons), we focused on quantum properties of a single qubit: superposition, measurement and quantum gates. This time, we are going to take things further by studying and visualizing the interaction between **two** qubits. More specifically, we are going to talk about **quantum entanglement**.

### Classical correlation

Here is a though experiment. Imagine you and your friend have two gloves: one for the right hand and one for the left hand. You place both in a bag and randomly pick one of them. Without looking, you place it in a sealed box and give the box to your friend. Your friend takes the box with them and goes home. Once you are away from each other, you take the other glove out of the bag and check which one it is. As soon as you recognize that you have the left glove, you instantly know that your friend has the right glove, and viceversa. 

You knew this without the need to communicate with them! You did not know the information about their glove until you checked, and, when you did, you gained this information instantly! It is almost as though you managed to transmit information faster than the speed of light, right? Of course, we know this is not the case. In this dumb example, the information was always there, it was defined beforehand, when you randomly chose which glove to put in the box. **Classical correlation** is real, but the information was predefined.

### Quantum correlation

We can apply a similar experiment with qubits instead of gloves, and the situation gets trickier. We know that the two gloves in the bag had a relation with each other: they were both a single pair of gloves. Qubits can also have relations with each other. When this happens, we say that the two qubits are **entangled**. If this is the case, interacting with one of them will have an influence on the other. Specifically, measuring one will make the other one collapse in a certain manner.

Let us take a more formal look into quantum entanglement. As we saw in the [first lesson](/lessons/001-what-is-a-qubit), we can express the state of a single qubit using the **ket** notation:

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}
$$

Here, $\alpha$ and $\beta$ are related to the probabilities of encountering the states 0 and 1 when measuring. But, what if we have a system of two qubits? The **basis states** will now change to represent all the combinations of each of them being 0 or 1. Thus, the basis states are now $\ket{00}$, $\ket{01}$, $\ket{10}$ and $\ket{11}$. With this, we can express the state of our two-qubit system as

$$
\ket{\psi} = \alpha_{00}\ket{00} + \alpha_{01}\ket{01} + \alpha_{10}\ket{10} + \alpha_{11}\ket{11},
$$

where, for each basis state $\ket{ij}$, the term $\alpha_{ij}$ is the amplitude and $|\alpha_{ij}|^2$ represents the probability of measuring that state.

So, how do we describe entanglement mathematically, then? To answer this, we can take a look at our two-qubit system from a different perspective. If we consider the **whole system**, we can describe it using the basis vectors we just saw. However, if we consider **each of the qubits** as a separate system, we can write, in principle, their individual states like we did in previous lessons:

$$
\begin{align}
    \ket{\psi_1} = \alpha_1\ket{0} + \beta_1\ket{1} \\
    \ket{\psi_2} = \alpha_2\ket{0} + \beta_2\ket{1}
\end{align}
$$

Then, if we want to describe the whole system, we can combine the two individual states using the **tensor product**:

$$
\ket{\psi} = \ket{\psi_1} \otimes \ket{\psi_2} = (\alpha_1\ket{0} + \beta_1\ket{1}) \otimes (\alpha_2\ket{0} + \beta_2\ket{1}) = \alpha_1\alpha_2\ket{00} + \alpha_1\beta_2\ket{01} + \beta_1\alpha_2\ket{10} + \beta_1\beta_2\ket{11}
$$

There seems to be no problem here. Just two perspectives of the same system. However, there is a catch. Not all two-qubit states can be expressed as a tensor product of two individual qubits. If we have a state that **cannot** be expressed as a tensor product, we say that the two qubits are **entangled**. If two qubits are not entangled, we say that they are **separable**.

<Callout type="info" title="An example of entanglement">
Let us take a look at the following state:

$$
\ket{\psi} = \frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{11}
$$

If we try to express this state as a tensor product of two individual qubits, we will find that it is impossible. This means that the two qubits are **entangled**.
</Callout>

How does entanglement interact with **measurements**? If the two qubits are separable, measuring each of them independently will not affect the other. However, if they are entangled, measuring one of them will have an effect on the other. 

<Callout type="info" title="Measurement of separable qubits">
Consider the system of two separable qubits in the state:

$$
\ket{\psi} = \frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{01}
$$

We know they are separable because we can express them as a tensor product of two individual qubits:

$$
\ket{\psi} = \ket{0} \otimes \left(\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}\right)
$$

Here, we can see that the first qubit is in the state $\ket{0}$, and the second qubit is in a superposition of $\ket{0}$ and $\ket{1}$. If we measure the first qubit, we will always get 0, and the second qubit will remain in its superposition. The measurement of the first qubit **does not** affect the second qubit.
</Callout>

<Callout type="info" title="Measurement of entangled qubits">
Let us now consider the system of two entangled qubits in the same state as before:

$$
\ket{\psi} = \frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{11}
$$

Here, the first qubit is in a superposition of $\ket{0}$ and $\ket{1}$, and the second qubit is also in a superposition of $\ket{0}$ and $\ket{1}$. However, if we measure the first qubit and get 0, the second qubit will immediately collapse to $\ket{0}$, since that is the only possibility (there is no term with $\ket{01}$). If we measure the first qubit and get 1, the second qubit will collapse to $\ket{1}$. The measurement of the first qubit **does** affect the second qubit.
</Callout>

This is where we see **quantum correlation** in action. The measurement of one qubit affects the state of the other qubit, even if they are far apart. This is a fundamental property of quantum mechanics and is what makes entanglement so powerful. Keep in mind that this correlation is truly random, since the outcome of the measurement is not predetermined. The only thing we can say is that the two qubits will always be correlated in their outcomes. In other words, if we measure both qubits, we will always get the same result (both 0 or both 1), but we cannot predict which one we will get. This is a key difference between classical and quantum correlation.


### Bell's Theorem and the CHSH Game

When quantum mechanics, and specifically entanglement, was first described, it was met with skepticism. In particular, in the 1960s, John Stewart Bell introduced a result commonly known as **Bell's theorem**. This result stated some incompatibilities between quantum mechanics and classical physics. Under his assumption, the correlations between the outcomes of an entangled pair of qubits had to obey a specific mathematical constraint, which would later be named a **Bell inequality**. He then showed that quantum mechanics predicts correlations that violate this inequality, and thus cannot be explained by classical physics. Since then, many experiments have been performed to test this result, and to violate the Bell Inequalities, and they have all confirmed the predictions of quantum mechanics.

<ExtendableCallout type="book" title="More information about Bell's theorem" shortExplanation="To properly understand Bell's theorem, we need to go into the details of the assumptions that lead to the Bell Inequalities, diving into locality and hidden variables. This is a very interesting topic, but it is beyond the scope of this lesson. More information on this can be found by exploring these sources:">

- Clauser, J. F.; Horne, M. A.; Shimony, A.; Holt, R. A. (1969). Proposed experiment to test local hidden-variable theories. Physical Review Letters, 23(15), 880–884. (https://doi.org/10.1103/PhysRevLett.23.880)
- Aspect, A.; Dalibard, J.; Roger, G. (1982). Experimental test of Bell's inequalities using time-varying analyzers. Physical Review Letters, 49(25), 1804–1807. (https://doi.org/10.1103/PhysRevLett.49.1804)
- Hensen, B. et al. (2015). Loophole-free Bell inequality violation using electron spins separated by 1.3 kilometres. Nature, 526, 682–686. (https://doi.org/10.1038/nature15759)
- Nielsen, Michael A.; Chuang, Isaac L. (2010). Quantum Computation and Quantum Information (2nd ed.). Cambridge: Cambridge University Press. ISBN 978-1-107-00217-3. OCLC 844974180
- Wikipedia contributors. Bell's theorem. Wikipedia, The Free Encyclopedia. (https://en.wikipedia.org/wiki/Bell's_theorem)

</ExtendableCallout>

We are going to explore a specific version of the Bell inequality, known as the **CHSH Game**. This game is a simple way to demonstrate the power of entanglement and how it can lead to correlations that cannot be explained classically.


## Classical CHSH Game

Let us first introduce how the CHSH Game works. In this game, there are **two players**, Alice and Bob, who are separated and cannot communicate with each other. There is a referee who will give each player a random classical bit (0 or 1). These bits are **purely random** and **independent** of each other. Let us call Alice's input bit $x$ and Bob's input bit $y$.

After receiving their input bits, Alice and Bob must each produce an **output** classical bit. Let us call Alice's output bit $a$ and Bob's output bit $b$. Since they cannot communicate, the output bits must be produced based solely on their input bits and any pre-shared strategy they may have agreed upon before the game started. The goal of the game for them is to satisfy the following **winning condition**:

$$
xy = a \oplus b
$$

Here, $\oplus$ represents the XOR operation. To visualize this, we can create a table of all possible input combinations and the corresponding winning condition:

|$x$|$y$|**winning condition**|
|---|---|---|
|0|0|$a=b$|
|0|1|$a=b$|
|1|0|$a=b$|
|1|1|$a\neq b$|

Based on this, an important thing to notice is that Alice and Bob **cannot** always win. For example, if they both receive 1 as input, they must produce different outputs to win. However, if they both receive 0 as input, they must produce the same output to win. This means that there is no strategy that guarantees a win for all possible inputs: they have to come up with a strategy that **maximizes** their chances of winning, but they cannot win all the time.

### A naive classical strategy

A simple approach for Alice and Bob is to always output the same bit they receive as input. This means that $a=x$ and $b=y$. Let us see how this strategy performs against the winning condition:

|$x$|$y$|**win**|
|---|---|---|
|0|0|yes: $0=0$|
|0|1|no: $0\neq 1$|
|1|0|no: $1\neq 0$|
|1|1|no: $1=1$|

As we can see from the table, this strategy only wins in one out of four cases. This means that the probability of winning is 25%. This is not a very good strategy, but it is a starting point. Can you come up with a better classical strategy that increases the probability of winning?

<Picker exercise={classicalStrategyPicker}/>


### Optimal classical strategy

<ExtendableCallout type="question" title="What is the best classical strategy?" shortExplanation="Can you find the best classical strategy that maximizes the probability of winning? What is the maximum probability of winning that can be achieved with a classical strategy?">

It turns out that the maximum probability of winning the CHSH Game with any classical strategy is **75%**!

Let us prove that there are no other classical strategies that make the probability higher. Take any deterministic strategy. That is, Alice’s output depends only on her input and Bob’s only on his, 
$$
\begin{align}
a = f(x)\\
b = g(y)
\end{align}
$$

Then, winning more than 75% would mean that they win all of the time: 100%. That means winning for every combination of inputs. Winning all four combinations would require:
$$
\begin{align}
f(0) \oplus g(0) = 0\\
f(0) \oplus g(1) = 0\\
f(1) \oplus g(0) = 0\\
f(1) \oplus g(1) = 1
\end{align}
$$

Add all four equations mod 2. On the left, each of f(0), f(1), g(0) and g(1) appears exactly twice, and anything XORed with itself is 0, so the left side sums to 0. On the right, 0 + 0 + 0 + 1 = 1. That gives 0 = 1, a contradiction. So at least one row must fail for every deterministic strategy, meaning it wins at most 3 of 4 rows, at most 75%. Always-0 shows 3 of 4 is achievable, so 75% is the maximum.

Alice and Bob may use shared randomness (agreeing on a random strategy beforehand) or private randomness (flipping coins). Either way, a randomized strategy is just a probabilistic mixture of deterministic strategies: first a random choice of f and g is made, then they play it. The overall win probability is the average of the win probabilities of the deterministic strategies in the mixture. An average of numbers that are each at most 3/4 can’t exceed 3/4.

</ExtendableCallout>


## Quantum CHSH Game

Let us now explore how the CHSH Game can be pushed further using quantum mechanics. This time Alice and Bob will share a pair of **entangled qubits** before the game starts. The referee will still give them random classical bits as input, but now they can measure their entangled qubits to produce their output bits. The goal is still to satisfy the winning condition:

$$
xy = a \oplus b
$$

Say that Alice and Bob share the following entangled state:

$$
\ket{\psi} = \frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{11}
$$

Using this entangled state, they can perform measurements on their qubits. These measurements will be along different **axes** of the Bloch sphere, depending on the input bits they receive.

### A naive quantum strategy

Consider the following strategy: Alice and Bob both measure their qubits along the Z-axis of the Bloch sphere, **regardless** of their input bits. Then, their output bit will be determined by the measurement outcome. Since the entangled state is a superposition of $\ket{00}$ and $\ket{11}$, measuring along the Z-axis will yield correlated results. If Alice measures 0, Bob will also measure 0, and if Alice measures 1, Bob will also measure 1. Thus, they will always produce the same output bit ($a=b$). Let us see how this strategy performs against the winning condition:

|$x$|$y$|**win**|
|---|---|---|
|0|0|yes: $a=b$|
|0|1|yes: $a=b$|
|1|0|yes: $a=b$|
|1|1|no: $a=b$|

Clearly, this strategy is already better than the naive classical strategy, as it wins in three out of four cases. This means that the probability of winning is 75%. However, can we do even better than this?

### Try it with your QBead

Now it is time for you to try the CHSH Game with your QBeads. You can use the first phase of the Sketch to play the game with quantum strategies. Try to find the best quantum strategy that maximizes the probability of winning by trying different measurement axes for Alice and Bob based on the input bits they receive. Remember that the goal is to satisfy the winning condition

$$
xy = a \oplus b,
$$

which means that Alice and Bob must produce the same output bit when at least one of them receives 0 as input, and they must produce different output bits when both receive 1 as input.

### Deterministic VS Stochastic

There is an important difference between classical and quantum strategies that you can observe when playing the CHSH Game with your QBeads. In classical strategies, the output bits are **deterministic**, meaning that for a given input, the output is always the same. In quantum strategies, however, the output bits are **stochastic**, meaning that for a given input, the output can vary due to the probabilistic nature of quantum measurements. This is a key aspect of quantum mechanics and is what allows quantum strategies to achieve higher probabilities of winning in the CHSH Game.

<Callout type="info" title="Try it yourself">

Let us consider the four possible input bits for Alice and Bob. For each of them, first apply a classical strategy. Then, apply a quantum strategy and try it five times. Record the output bits. Then, check if the winning condition is satisfied for each case. You can use the following table to record your results:

<table>
<tbody>
<tr>
  <th rowspan="2" style="text-align: center;">$x$</th>
  <th rowspan="2" style="text-align: center;">$y$</th>
  <th rowspan="2" style="text-align: center;">Classical strategy</th>
  <th colspan="5" style="padding: 8px; text-align: center;">Quantum strategy</th>
</tr>
<tr>
  <th style="padding: 8px;">1st</th>
  <th style="padding: 8px;">2nd</th>
  <th style="padding: 8px;">3rd</th>
  <th style="padding: 8px;">4th</th>
  <th style="padding: 8px;">5th</th>
</tr>
<tr>
  <td style="text-align: center;">0</td>
  <td style="text-align: center;">0</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td style="text-align: center;">0</td>
  <td style="text-align: center;">1</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td style="text-align: center;">1</td>
  <td style="text-align: center;">0</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td style="text-align: center;">1</td>
  <td style="text-align: center;">1</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</tbody>
</table>

</Callout>

As you can see, the classical strategy is deterministic, while the quantum strategy is stochastic. This means that the quantum strategy can achieve a higher probability of winning in the CHSH Game, even though it does not guarantee a win in every case.

### Optimal quantum strategy

<ExtendableCallout type="question" title="What is the best quantum strategy?" shortExplanation="Can you find the best quantum strategy that maximizes the probability of winning? What is the maximum probability of winning that can be achieved with a quantum strategy?">


As it turns out, the maximum probability of winning with a quantum strategy is around **85%**!

Indeed, let us consider the following strategy: Alice measures her qubit in the **Z basis** when receiving 0 as an input and in the **X basis** when receiving 1. Bob, on the other hand, chooses the **$\frac{Z+X}{\sqrt{2}}$ basis** when the input is 0 and the **$\frac{Z-X}{\sqrt{2}}$ basis** when the input is 1. This strategy is the optimal winning strategy!

Let us prove this result.

We know that Alice and Bob share the entangled pair $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$. Now, suppose Alice measures along angle $\alpha$ and Bob along angle $\beta$. Define the correlation $E(\alpha,\beta) = P(\text{same result}) - P(\text{different result})$.

For $|\Phi^+\rangle$, when Alice gets a result along her axis, Bob’s qubit collapses to the state pointing in the same (or exactly opposite) direction on the Bloch sphere, matching her result. So if the angle between their axes is $\theta = \alpha - \beta$, Bob’s chance of agreeing with Alice is $\cos^2(\theta/2)$, and of disagreeing is $\sin^2(\theta/2)$. Therefore

$$E(\alpha,\beta) = \cos^2\tfrac{\theta}{2} - \sin^2\tfrac{\theta}{2} = \cos\theta = \cos(\alpha-\beta).$$

Let us take a look at the correlation for each input pair:

|x	|y|	Angle difference	|$E = \cos\theta$|
|--|--|-------------------|----------------|
|0|	0|	$0^\circ - 45^\circ = -45^\circ$|	$+\frac{1}{\sqrt2}$
|0|	1|	$0^\circ + 45^\circ = 45^\circ$|	$+\frac{1}{\sqrt2}$
|1|	0|	$90^\circ - 45^\circ = 45^\circ$|	$+\frac{1}{\sqrt2}$
|1|	1|	$90^\circ + 45^\circ = 135^\circ$|	$-\frac{1}{\sqrt2}$

The pattern is what we want: the first three rows are positively correlated and the last is anticorrelated, which is exactly the structure of the game.

The output bits are the same ($a \oplus b = 0$) with probability $\frac{1+E}{2}$, and different ($a \oplus b = 1$) with probability $\frac{1-E}{2}$.

Rows (0,0), (0,1), (1,0): they win when $a \oplus b = 0$, so

$$P(\text{win}) = \frac{1 + 1/\sqrt2}{2}$$
Row (1,1): they win when $a \oplus b = 1$, so

$$P(\text{win}) = \frac{1 - (-1/\sqrt2)}{2} = \frac{1 + 1/\sqrt2}{2}$$

All four rows give the same probability. Since x and y are uniformly random, the overall winning probability is

$$P(\text{win}) = \frac{1}{2} + \frac{1}{2\sqrt2} = \frac{2+\sqrt2}{4} = \cos^2\!\left(\frac{\pi}{8}\right) \approx 0.854.$$


</ExtendableCallout>


## Simulation to visualize the quantum advantage

Let us recap the results of the CHSH Game. As we saw, the best **classical** strategy can achieve a maximum probability of winning of **75%**. However, the best **quantum** strategy can achieve a maximum probability of winning of around **85%**. This is where we can see the **quantum advantage** over classical correlation. The entanglement of qubits allows for correlations that cannot be explained classically, leading to a higher probability of winning in the CHSH Game. To visualize this threshold, we can use a simulation that shows the winning probabilities for both classical and quantum strategies. The simulation will allow you to see how the probabilities change as you adjust the measurement axes for Alice and Bob.

<Callout type="info" title="Try it yourself">

Now switch to the second phase of the Sketch and try to find the best quantum strategy that maximizes the probability of winning. You can adjust the **measurement axes** for Alice and Bob for each of the four possible input bits. The simulation will show you the winning probabilities for both classical and quantum strategies, allowing you to see the quantum advantage in action.

</Callout>

## Reflection

Questions related to the lesson goals:
  - What is the difference between classical and quantum correlation?
  - How does entanglement allow for correlations that cannot be explained classically?
  - What is the CHSH Game and how does it demonstrate the power of entanglement?
  - How does the quantum strategy achieve a higher probability of winning compared to the classical strategy?
  