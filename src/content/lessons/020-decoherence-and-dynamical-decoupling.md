---
title: Discover a quantum algorithm: dynamical decoupling
layout: lesson
# topics can be keywords for SEO
keywords: quantum decoherence, qubit errors, quantum gates
# below is metadata for lessons
topics: quantum decoherence
difficulty: Advanced
objectives:
  - Interact with the Qbead to play a game
  - Learn about the quantum protocol you just dicovered - dynamical decoupling
  - Understand the realistic limitations of dynamical decoupling
headerImage: https://lipsum.app/random/800x450?_CHANGE_ME
description: Play with the Qbead and rediscover a quantum protocol ann by yourself! Observe the problem of decoherence and apply an error correction technique to restore coherence in our quantum state.
nextLesson: lessons/example-lesson-1
---

## The game
Goal: Get **only one LED** to light up, with as small of a light spot as possible

The only rule: You can only rotate the Qbead

Tips
- Try rotating and see what happens!
- It may not be enough with rotating it once
- If things get too confusing you can re-start the game by shaking the Qbead

What do you see? Can you find a way to keep the Qbead lights indifinitely small? How about small at a known period of time?

## Introduction
Welcome to another lecture on the QBead! In this lecture, we will observe the problem of Decoherence and apply an error correction technique to restore coherence in our quantum state.

## Quantum Decoherence and Dynamical Decoupling
Quantum decoherence is the loss of quantum coherence, where a loss of information of a system to its environment occurs due to noise. Quantum computing relies on quantum coherence. In order to suppress decoherence, a method, called Dynamic Decoupling (DD), can be applied. In this lesson you will use the QBead to explore decoherence and see how Dynamical Decoupling can help us solve it. By experimenting with the QBead, you will get a hands-on sense of how quantum information can be preserved!

## Topics
- Problem : Decoherence
- Solution : Perfect Dynamical Decoupling
- Challenge : Imperfect Dynamical Decoupling

## Spin Precession
In this lesson, we have assumed that our quantum system is a spin-1/2 particle placed inside an external magnetic field. In this case, the quantum state of the spin can be visualized as a vector pointing somewhere on a sphere, the *Bloch Sphere*.
When the field is not aligned with the phase of the system, it induces a torque on the system's magnetic moment that causes the system to `wobble' around the magnetic field axis. This wobbling is known as *precession*.

% Widget of precessing vector!

## Decoherence
Quantum systems are fragile. When a system interacts with its environment (through thermal fluctiations, electromagnetic fields or other sources of noise), it gradually loses its ability to maintain coherent superpositions.
This process is called decoherence, and it destroys the interference effects that quantum computers rely on. Without coherence, operations on a quantum computer become unreliable.

## Decoherence in Spin Systems
In real spin systems such as the one we simulate with our QBead, small variations in the magnetic field or random interactions with the environment cause different spins in an ensemble to precess at slightly different rates.
Over time, these small differences accumulate, causing the spins to fan out around the precession axis. This spreading represents a loss of phase coherence between individual spins, that is the manifestation of *decoherence*.

## Dynamical Decoupling
The goal of this experiment is to demonstrate Dynamical Decoupling (DD), which is a quantum control procedure that can be used to reverse the decoherence of the ensemble. DD involves applying a rapid series of control pulses that invert the phase differences that accumulate between the states.
By carefully applying these pulses, we can reverse or suppress decoherence, keeping the spins more coherent for longer.


# Experiments

This lesson is comprised of three QBead experiments, which will increase in complexity to help you understand the basic principles of Decoherence and Dynamical Decoupling. The first experiment is a basic, non-interactive demonstration of the principle of decoherence, while the following two experiments are opportunities for you to try implementing the Dynamical Decoupling procedure yourself.

## Decoherence Visualisation

% Decoherence Widget

We can model the loss of coherence on the QBead as a 'spreading-out' of a known state vector (representing a coherent ensemble) into a collection of vectors representing individual states that progressively lose coherence with each other. This is exactly what the first experiment shows; the initial coherent state is represented by an (unmoving) white LED, but as time passes, the decohering states begin to appear as red LEDs that slowly spread away from the white one. Watch how quickly the coherent phase of the system spreads out into a big collection of individual states!

This is a very big problem for quantum computers, as quantum systems are only useful for computation as long as they remain coherent. However, it is very challenging to eliminate quantum noise entirely, which is why quantum control protocols such as Dynamical Decoupling are required to maintain coherence.

## Simple Dynamical Decoupling

% Dynamical Decoupling Widget

This experiment gives you the opportunity to observe phase decoherence in a system on the QBead, and to implement the Dynamical Decoupling protocol yourself!

The quantum ensemble is modeled by a white light on the QBead that immediately begins to rotate around the green point at the top. This rotating behaviour is called *precession*; see the end of this lesson if you would like to learn more. As time progresses, notice how two other lights (a blue and a red one) begin to emerge from around the white one... these represent states in our quantum system that have decohered from the system itself, due to something called quantum noise.

After some time, these points will have spread out from one another, and now the Dynamical Decoupling procedure is required to bring them back together so that the system is once again coherent. This procedure is surprisingly straightforward; all you have to do is flip the QBead upside down!

% figure/demonstration of how to flip the QBead

Once you have inverted the QBead, watch as the vectors begin to overlap with one another again; the blue vector is now  "behind" the others and rushes to "catch up", while the red vector (now at the front) "slows" down. This means that the quantum noise is now undoing its previous decoherence!

In this Simple version of the experiment, the the green LED is restricted in the orientations it can be. This means that it is locked to the closest 90-degree increment of the sphere to the top, so that the green point doesn't move around too much. This is done to stabilise the rotation of the blue, white, and red points, as in reality, shaky hands can disrupt the Dynamical Decoupling procedure! This is the problem that this simplified experiment is trying to fix; by restricting the possible orientations green point, the "flip" is easier to execute.

% another figure

Please note that this experiment is equipped with a reset sequence which will engage periodically. This means you don't have to worry if you make a mistake with flipping the QBead, as the reset will bring you back to the start. The sequence is shown when the green LED begins to "blink" for a short period and all other vectors disappear.

## Challenge: Realistic Dynamical Decoupling

% video of realistic dynamical decoupling applied

In this advanced version of the Dynamical Decoupling procedure, the magnetic field axis is no longer restricted to 90-degree increments, meaning the green LED always points *truly* vertical. This means that moving or rotating the QBead even a small amount can shift the blue, white, and red points out of plane with one another, making it almost impossible to successfully implement the Dynamical Decoupling procedure! This also means that when you do apply the procedure, the flip must be both (a) instantaneous and (b) perfectly 180 degrees, as otherwise the planes of precession can again become misaligned. It is difficult to get right, but the experiment is otherwise identical to the simple version. This experiment demonstrates how careful we need to be with these quantum systems in the real world, and how perfectly we need to apply quantum control protocols.


# Learn More

## More on the Dynamical Decoupling Experiment
*What is exactly happening when applying Dynamical Decoupling on the QBead?*

Dynamical Decoupling (DD) is a procedure that reverses the decoherence of the ensemble. The key idea is to flip the QBead by 180° around an axis perpendicular to the main precession axis. This inverts the phase differences that have accumulated, effectively refocusing the ensemble.

If you measure the time that the three vectors have been decohering for (since the were all in-phase) to be $\tau$, then $\tau$ time after you apply the decoupling procedure you will see that the ensemble is again coherent as the three vectors overlap one another again. Now, you can let the ensemble begin to decohere for another period of $\tau$, apply the decoupling procedure again, and so forth, thus creating a periodic routine of decoherence and decoupling. The stricter the tolerance you require is (i.e., the ``amount'' of decoherence that you find to be acceptable), the more often you will need to apply the decoupling procedure (i.e., the shorter $\tau$ should be).

Your routine should look like this:

1. Begin the experiment, and watch the vectors spread out for a time $\tau$.
2. Apply the decoupling procedure at time $\tau$. At time $2\tau$, notice that the ensemble is once again coherent.
3. At time $3\tau$, apply the procedure once more.
4. Repeat!

Notice that after you let the ensemble decohere for time $\tau$, applying the dynamical decoupling procedure every $2\tau$ periods of time will maintain a (semi) coherent ensemble!

If the ensemble has decohered, each state in the system is precessing on *different* planes while the QBead is being flipped, since each of their planes are no longer aligned while their orientation relative to the magnetic field changes. Once the system has been flipped fully, then the planes of precession of every state in the ensemble are re-aligned, but in the moment of the flip they can become disaligned if the flip is not quick enough.

## Frequency Of The Pulses
The timing/frequency of the pulses determines how well the decoherence can be reversed. Each pulse ("flip") inverts the phase errors that have built up over a time period, denoted by $\tau$ in the experiment. If the system is allowed to decohere for too long before a pulse is applied, the states will spread out too far and cannot be perfectly re-aligned. If the pulses are applied frequently enough, the system remains mostly coherent. Thus, the frequency of the pulses must be chosen so that each flip happens just as the phase errors begin to accumulate, continually refocusing the quantum ensemble and maintaining coherence over time.