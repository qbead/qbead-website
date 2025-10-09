<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton-svelte'
  import IconAtom from '@lucide/svelte/icons/atom'
</script>

<div class="main-content">
  <article class="flex flex-col gap-60">
    <section class="grid grid-cols-[1fr_auto] items-center gap-36">
      <div class="flex flex-col gap-10">
        <h1 class="h1">
          Put Your Hands on a <span class="text-primary-500">Qubit!</span>
        </h1>
        <p class="text-xl">
          We built a custom interactive toy that uses LED lights to show quantum states in
          real-time. Play with qubits, learn about spin and superposition, and code your own quantum
          experiments. Perfect for curious minds from middle school through college.
        </p>
        <div class="flex gap-4">
          <a class="btn btn-lg preset-filled-primary-500"> Discover Qbead </a>
          <a class="btn btn-lg preset-filled-surface-100-900"> View Documentation </a>
        </div>
        <div class="flex gap-4"></div>
      </div>
      <div class="bg-surface-800 h-64 w-64 rounded-xl"></div>
    </section>

    <section class="">
      <header class="text-center">
        <h2>The <span class="text-primary-500">Qbead</span></h2>
        <p class="text-lg">
          A Bloch Sphere is a way to represent the state of a quantum bit or qubit, which is the
          basic unit of quantum computing.
        </p>
      </header>
    </section>

    <section>
      <header><h3 class="mb-4 text-4xl font-bold text-yellow-400">A Bloch Sphere</h3></header>
      <p class="mb-6 text-xl font-normal">
        is a way to represent the state of a <span class="text-rose-400">quantum bit</span> or
        <span class="text-rose-400">qubit</span>, which is the basic unit of quantum computing.
      </p>

      <p class="mb-6">
        The north pole of the sphere represents the "0" state, and the south pole represents the "1"
        state. Instead of just being 0 or 1 (like a regular computer bit), a qubit can be anywhere
        on this sphere, meaning it can be a mix of both 0 and 1 at the same time. Since a qubit can
        be anywhere on the surface of the sphere, it can hold much more information in a fuzzy,
        in-between way.
      </p>

      <a class="btn preset-filled-warning-500 mt-6"> Learn more </a>
    </section>
  </article>
</div>
