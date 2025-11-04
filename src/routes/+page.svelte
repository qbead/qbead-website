<script lang="ts">
  import IconDot from '@lucide/svelte/icons/dot'
  import IconBrain from '@lucide/svelte/icons/brain'
  import IconCode from '@lucide/svelte/icons/code-2'
  import IconBookOpen from '@lucide/svelte/icons/book-open'
  import IconArrowRight from '@lucide/svelte/icons/arrow-right'
  import IconZap from '@lucide/svelte/icons/zap'
  import IconHand from '@lucide/svelte/icons/hand'
  import BioBox from '$lib/components/BioBox/BioBox.svelte'
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { BlochVector, QubitDisplay } from '@qbead/bloch-sphere'
</script>

<div class="flex flex-col gap-60 py-28">
  <section class="centered-layout gap-10">
    <div>
      <span class="badge preset-filled-surface-200-800 text-surface-950-5 text-sm">
        <IconZap size="12" />
        For Your Hands-On Discovery of Quantum Phenomena
      </span>
    </div>
    <div id="hero" class="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-36">
      <img src="https://picsum.photos/600/400" alt="Placeholder" class="rounded-xl md:order-last" />
      <div>
        <h1 class="h1 mb-8 text-6xl">
          Put Your Hands on a <span class="text-primary-500">Qubit!</span>
        </h1>
        <p class="text-xl">
          We built a custom interactive toy that uses LED lights to show quantum states in
          real-time. Play with qubits, learn about spin and superposition, and code your own quantum
          experiments. Perfect for curious minds from middle school through college.
        </p>
      </div>
      <svg
        viewBox="0 0 600 600"
        width="600"
        height="600"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        class="circles-background"
      >
        <title id="svgTitle">Three scattered circles</title>
        <desc id="svgDesc"
          >Three circles of varying sizes positioned around the viewbox for decorative use.</desc
        >

        <!-- optional subtle shadow -->
        <defs>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.12" />
          </filter>
        </defs>

        <!-- circles (classed for styling) -->
        <circle class="dot large" cx="110" cy="500" r="23" fill="#531716" />
        <circle class="dot medium" cx="440" cy="550" r="20" fill="#396D7C" />
        <circle class="dot small" cx="440" cy="40" r="13" fill="#885418" />
      </svg>
    </div>
    <div class="flex flex-col gap-10">
      <div class="flex flex-wrap gap-4">
        <a href="/about" class="btn btn-lg preset-filled-primary-500"> Discover Qbead </a>
        <a href="/lessons" class="btn btn-lg preset-filled-surface-100-900"> Explore Lessons </a>
      </div>
      <ul class="flex flex-wrap gap-4">
        <li class="flex items-center">
          <IconDot size={10} class="text-primary-500 h-10 w-10" />
          <span class="ml-[-6px]">Available by Request</span>
        </li>
        <li class="flex items-center">
          <IconDot size={10} class="text-secondary-500 h-10 w-10" />
          <span class="ml-[-6px]">Middle School to College</span>
        </li>
        <li class="flex items-center">
          <IconDot size={10} class="h-10 w-10 text-red-400" />
          <span class="ml-[-6px]">Learn to Code</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="centered-layout gap-24">
    <div class="text-center">
      <span
        class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
        >About</span
      >
      <h2 class="h2 mb-6">Introducing the <span class="text-primary-500">Qbead</span></h2>
      <p class="m-auto max-w-3xl text-lg">
        The Qbead is a gadget you can hold in your hand that represents a qubit (a quantum bit) and
        can teach you about quantum computing.
      </p>
    </div>
    <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-24">
      <div class="prose prose-lg">
        <h3 class="h3">How It Works</h3>
        <p class="text-xl">
          Our Qbead uses LED lights to visualize the current quantum state a qubit is in. Students
          can see and manipulate concepts like spin, superposition, and other fundamental aspects of
          quantum physics that are usually impossible to observe.
        </p>
        <p class="text-xl">
          Users can play with the Qbead, use it to teach classes, or even program it themselves. We
          designed it as a learning tool that's available by request, perfect for curious students
          from middle school through college.
        </p>
        <a href="/about" class="btn preset-outlined-secondary-500 text-secondary-500">
          <span>Learn More</span><IconArrowRight size={16} />
        </a>
      </div>
      <img class="rounded-xl" src="https://picsum.photos/600/400" alt="Placeholder" />
    </div>
    <div class="items-fill grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
      <div class="bg-surface-100-900 rounded-xl p-8">
        <div class="bg-surface-200-800 mb-6 inline-block rounded-xl p-5">
          <IconBrain size={32} class="text-secondary-500" />
        </div>
        <h4 class="h5 mb-4 text-xl">Learn By Doing</h4>
        <p class="text-lg">
          Manipulate quantum states, explore superposition, and understand qubits through hands-on
          interaction.
        </p>
      </div>
      <div class="bg-surface-100-900 rounded-xl p-8">
        <div class="bg-surface-200-800 mb-6 inline-block rounded-xl p-5">
          <IconCode size={32} class="text-primary-500" />
        </div>
        <h4 class="h5 mb-4 text-xl">Code Your Own</h4>
        <p class="text-lg">
          Program the Qbead yourself to create custom quantum experiments and learning scenarios.
        </p>
      </div>
      <div class="bg-surface-100-900 rounded-xl p-8">
        <div class="bg-surface-200-800 mb-6 inline-block rounded-xl p-5">
          <IconBookOpen size={32} class="text-red-400" />
        </div>
        <h4 class="h5 mb-4 text-xl">Teaching Tool</h4>
        <p class="text-lg">
          Perfect for educators looking to bring quantum physics concepts into their classroom.
        </p>
      </div>
    </div>
  </section>

  <section class="centered-layout gap-20">
    <div class="text-center">
      <span
        class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
        >Interactive</span
      >
      <h2 class="h2 mb-6">Intro to <span class="text-primary-500">Bloch Spheres</span></h2>
      <p class="m-auto max-w-3xl text-lg">
        A Bloch Sphere is a way to represent the state of a quantum bit or qubit, which is the basic
        unit of quantum computing.
      </p>
    </div>
    <div class="grid grid-cols-[2fr_1fr] items-center gap-10">
      <div class="prose px-8 text-xl">
        <p>
          The north pole of the sphere represents the "0" state, and the south pole represents the
          "1" state. Instead of just being 0 or 1 (like a regular computer bit), a qubit can be
          anywhere on this sphere, meaning it can be a mix of both 0 and 1 at the same time.
        </p>
        <p>
          Since a qubit can be anywhere on the surface of the sphere, it can hold much more
          information in a fuzzy, in-between way.
        </p>
      </div>
      <figure class="relative order-first m-auto w-full">
        <figcaption
          class="pointer-events-none absolute start-5 top-4 z-2 flex items-center gap-2 text-lg text-gray-500"
        >
          <IconHand size="32" />
          <span>Drag to interact!</span>
        </figcaption>
        <BlochSphereElement
          created={(blochSphere) => {
            let state = BlochVector.random()
            const qubitArrow = new QubitDisplay(state)
            // @ts-ignore
            qubitArrow.angleIndicators.visible = false
            blochSphere.add(qubitArrow)
          }}
        />
      </figure>
    </div>
  </section>

  <section class="bg-surface-100-900 centered-layout gap-20 py-64">
    <div class="text-center">
      <span
        class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
        >Team</span
      >
      <h2 class="h2 mb-6">Meet Our <span class="text-primary-500">Team</span></h2>
      <p class="m-auto max-w-3xl text-lg">
        We are a group of volunteers with a passion for teaching science, building beautiful things,
        and harnessing quantum phenomena to create the technology of tomorrow.
      </p>
    </div>
    <div class="grid grid-flow-row-dense gap-6 md:grid-cols-4">
      <BioBox
        name="Carlos"
        role="Delft University of Technology, QuTech"
        imgSrc="/team/carlos_s.jpg"
      >
        <p class="mb-6">
          Carlos loves science, crafts, and art, and sometimes combines them into a beautiful gadget
          like the Qbead...
        </p>
        <a
          href="/team"
          class="btn preset-outlined-secondary-500 text-secondary-500 inline-flex items-center gap-1"
        >
          <span>Read More</span>
          <IconArrowRight size={16} />
        </a>
      </BioBox>
      <BioBox name="Stefan" role="University of Massachusetts Amherst" imgSrc="/team/stefan_s.jpg">
        <p class="mb-6">
          Since high school Stefan has enjoyed sharing the wonders of science with others,
          organizing extraculicular courses and summer break Physics events...
        </p>
        <a
          href="/team"
          class="btn preset-outlined-secondary-500 text-secondary-500 inline-flex items-center gap-1"
        >
          <span>Read More</span>
          <IconArrowRight size={16} />
        </a>
      </BioBox>

      <BioBox name="Hugo" role="MIT" imgSrc="/team/hugo_s.jpg">
        <p class="mb-6">
          Hugo appreciates taking part in various efforts promoting higher education in STEM to
          various communities...
        </p>
        <a
          href="/team"
          class="btn preset-outlined-secondary-500 text-secondary-500 inline-flex items-center gap-1"
        >
          <span>Read More</span>
          <IconArrowRight size={16} />
        </a>
      </BioBox>

      <BioBox name="Saumil" role="MIT" imgSrc="/team/saumil_s.jpg">
        <p class="mb-6">
          Saumil has always held a fascination for building things. As a graduate student at MIT,
          Saumil worked on silicon photonics...
        </p>
        <a
          href="/team"
          class="btn preset-outlined-secondary-500 text-secondary-500 inline-flex items-center gap-1"
        >
          <span>Read More</span>
          <IconArrowRight size={16} />
        </a>
      </BioBox>
    </div>
  </section>

  <section class="centered-layout mb-30 gap-20">
    <div class="text-center">
      <span
        class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
      >
        Play
      </span>
      <h2 class="h2 mb-6">The <span class="text-primary-500">Lessons</span></h2>
      <p class="m-auto max-w-3xl text-lg">
        Everything you need to learn with, teach with, and program your Qbead. From basic quantum
        concepts to advanced coding tutorials.
      </p>
    </div>
    <div class="text-center">
      <a href="/lessons" class="btn btn-lg preset-filled-primary-500">
        <span>View the Lessons</span>
        <IconArrowRight size={24} />
      </a>
    </div>
  </section>
</div>

<style lang="postcss">
  #hero {
    position: relative;

    &:hover .circles-background {
      transform: scale(1.1);
    }

    .circles-background {
      position: absolute;
      top: -20%;
      right: 0;
      z-index: -1;
      width: 50%;
      transition: transform ease 0.5s;

      .dot {
        transform-origin: center;
        animation: hoverFloat 6s ease-in-out infinite;
        opacity: 0.3;
      }

      .dot.large {
        animation-duration: 7s;
        animation-delay: 0s;
      }
      .dot.medium {
        animation-duration: 5.5s;
        animation-delay: 1s;
      }
      .dot.small {
        animation-duration: 4.5s;
        animation-delay: 2s;
      }
    }
  }
</style>
