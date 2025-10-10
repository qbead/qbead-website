<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton-svelte'
  import IconDot from '@lucide/svelte/icons/dot'
  import IconBrain from '@lucide/svelte/icons/brain'
  import IconCode from '@lucide/svelte/icons/code-2'
  import IconBookOpen from '@lucide/svelte/icons/book-open'
  import IconArrowRight from '@lucide/svelte/icons/arrow-right'
  import BioBox from '$lib/components/BioBox/BioBox.svelte'
</script>

<div class="outer-container py-36">
  <article class="flex flex-col gap-60">
    <section class="">
      <div class="flex flex-col gap-10">
        <header class="grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-36">
          <img
            src="https://placeholdit.com/500x300/dddddd/999999"
            alt="Placeholder"
            class="rounded-xl md:order-last"
          />
          <div>
            <h1 class="h1 mb-8">
              Put Your Hands on a <span class="text-primary-500">Qubit!</span>
            </h1>
            <p class="text-xl">
              We built a custom interactive toy that uses LED lights to show quantum states in
              real-time. Play with qubits, learn about spin and superposition, and code your own
              quantum experiments. Perfect for curious minds from middle school through college.
            </p>
          </div>
        </header>
        <div class="flex flex-wrap gap-4">
          <a class="btn btn-lg preset-filled-primary-500"> Discover Qbead </a>
          <a class="btn btn-lg preset-filled-surface-100-900"> View Documentation </a>
        </div>
        <ul class="flex flex-wrap gap-4">
          <li class="flex items-center">
            <IconDot size={10} class="text-primary-500 h-10 w-10" />
            <span>Available by Request</span>
          </li>
          <li class="flex items-center">
            <IconDot size={10} class="text-secondary-500 h-10 w-10" />
            <span>Middle School to College</span>
          </li>
          <li class="flex items-center">
            <IconDot size={10} class="h-10 w-10 text-red-400" />
            <span>Learn to Code</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="flex flex-col gap-24">
      <header class="text-center">
        <span
          class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4"
          >About</span
        >
        <h2 class="h2 mb-6">The <span class="text-primary-500">Qbead</span></h2>
        <p class="text-lg">
          A Bloch Sphere is a way to represent the state of a quantum bit or qubit, which is the
          basic unit of quantum computing.
        </p>
      </header>
      <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-24">
        <div class="prose prose-lg">
          <h3 class="h3">How It Works</h3>
          <p>
            Our Qbead uses LED lights to visualize the current quantum state a qubit is in. Students
            can see and manipulate concepts like spin, superposition, and other fundamental aspects
            of quantum physics that are usually impossible to observe.
          </p>
          <p>
            Users can play with the Qbead, use it to teach classes, or even program it themselves.
            We designed it as a learning tool that's available by request, perfect for curious
            students from middle school through college.
          </p>
        </div>
        <img
          class="rounded-xl"
          src="https://placeholdit.com/600x400/dddddd/999999"
          alt="Placeholder"
        />
      </div>
      <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
        <div class="bg-surface-100-900 rounded-xl p-8">
          <div class="bg-surface-200-800 mb-12 inline-block rounded-xl p-6">
            <IconBrain size={40} class="text-secondary-500" />
          </div>
          <h4 class="h5 mb-4 text-2xl">Learn By Doing</h4>
          <p class="text-xl">
            Manipulate quantum states, explore superposition, and understand qubits through hands-on
            interaction.
          </p>
        </div>
        <div class="bg-surface-100-900 rounded-xl p-8">
          <div class="bg-surface-200-800 mb-12 inline-block rounded-xl p-6">
            <IconCode size={40} class="text-primary-500" />
          </div>
          <h4 class="h5 mb-4 text-2xl">Code Your Own</h4>
          <p class="text-xl">
            Program the Qbead yourself to create custom quantum experiments and learning scenarios.
          </p>
        </div>
        <div class="bg-surface-100-900 rounded-xl p-8">
          <div class="bg-surface-200-800 mb-12 inline-block rounded-xl p-6">
            <IconBookOpen size={40} class="text-red-400" />
          </div>
          <h4 class="h5 mb-4 text-2xl">Teaching Tool</h4>
          <p class="text-xl">
            Perfect for educators looking to bring quantum physics concepts into their classroom.
          </p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-20">
      <header class="text-center">
        <span
          class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4"
          >Interactive</span
        >
        <h2 class="h2 mb-6">Intro to <span class="text-primary-500">Bloch Spheres</span></h2>
        <p class="text-lg">
          A Bloch Sphere is a way to represent the state of a quantum bit or qubit, which is the
          basic unit of quantum computing.
        </p>
      </header>
      <div class="grid grid-cols-1 items-center gap-8">
        <div class="text-xl">
          <p>
            The north pole of the sphere represents the "0" state, and the south pole represents the
            "1" state. Instead of just being 0 or 1 (like a regular computer bit), a qubit can be
            anywhere on this sphere, meaning it can be a mix of both 0 and 1 at the same time. Since
            a qubit can be anywhere on the surface of the sphere, it can hold much more information
            in a fuzzy, in-between way.
          </p>
        </div>
      </div>
      <img
        class="rounded-xl"
        src="https://placeholdit.com/1200x900/dddddd/999999"
        alt="Placeholder"
      />
    </section>

    <section class="flex flex-col gap-20">
      <header class="text-center">
        <span
          class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4"
          >Team</span
        >
        <h2 class="h2 mb-6">Meet Our <span class="text-primary-500">Team</span></h2>
        <p class="text-lg">
          We are a group of volunteers with a passion for teaching science, building beautiful
          things, and harnessing quantum phenomena to create the technology of tomorrow.
        </p>
      </header>
      <div class="grid grid-flow-row-dense gap-12 md:grid-cols-2">
        <BioBox
          name="Carlos"
          role="Delft University of Technology, QuTech"
          imgSrc="https://qbead.org/images/teampics/carlos_s.jpg"
          tags={['Quantum Physics', 'Art', 'Engineering']}
        >
          Carlos loves science, crafts, and art, and sometimes combines them into a beautiful gadget
          like the Qbead. On top of that, he enjoys mentoring and contributing to diversity in
          science and engineering. Examples are organizing science-art workshops with asylum seekers
          in Sweden and the quantum hackathon iQuHACK at MIT. Now at Delft University of Technology
          and QuTech, Carlos is a professor exploring quantum photonics while he continues to lead
          outreach projects to democratize science and technology.
        </BioBox>
        <BioBox
          name="Stefan"
          role="University of Massachusetts Amherst"
          imgSrc="https://qbead.org/images/teampics/stefan_s.jpg"
          tags={['Quantum Physics', 'Art', 'Engineering']}
        >
          Since high school Stefan has enjoyed sharing the wonders of science with others,
          organizing extraculicular courses and summer break Physics events. While a graduate
          student at Yale's Quantum Institute he felt most at home in Yale's makerspace, preparing
          contraptions to be used in middle- and high-school outreach events. He continued his
          reasearch work on photonic quantum computers jointly at MIT and Harvard, but spends much
          of his free time designing hands-on outreach materials, including the SpinWheel. Now, as a
          professor at UMass Amherst, he is designing the Qbead as a way to bring the maker ethos to
          teaching Quantum Information Science.
        </BioBox>

        <BioBox
          name="Hugo"
          role="MIT"
          imgSrc="https://qbead.org/images/teampics/hugo_s.jpg"
          tags={['Quantum Physics', 'Art', 'Engineering']}
        >
          Hugo appreciates taking part in various efforts promoting higher education in STEM to
          various communities. Since his undergraduate studies at the University of Ottawa, these
          have included participation in the university's mini-courses program and engaging with
          elementary school students about being a grad student. He is currently a doctoral student
          in electrical engineering at MIT.
        </BioBox>

        <BioBox
          name="Saumil"
          role="MIT"
          imgSrc="https://qbead.org/images/teampics/saumil_s.jpg"
          tags={['Quantum Physics', 'Art', 'Engineering']}
        >
          Saumil has always held a fascination for building things. As a graduate student at MIT,
          Saumil worked on silicon photonics, where he spent a great deal of time hacking together
          electronics and microcontrollers to run his experiments. He also enjoys teaching and has
          helped develop several courses and hands-on labs to introduce students to photonic
          hardware. Saumil is now a postdoc jointly at MIT and NTT Research, where he has continued
          his research at the intersection of optics and computing. He hopes to share his love of
          building hardware through the Qbead and inspire the next generation of quantum scientists
          and engineers.
        </BioBox>
      </div>
    </section>

    <section class="flex flex-col gap-20">
      <header class="text-center">
        <span
          class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4"
          >Play</span
        >
        <h2 class="h2 mb-6">The <span class="text-primary-500">Learning Guide</span></h2>
        <p class="text-lg">
          Everything you need to learn with, teach with, and program your Qbead. From basic quantum
          concepts to advanced coding tutorials.
        </p>
      </header>
      <div class="text-center">
        <a class="btn btn-lg preset-filled-primary-500">
          <span>View the Full Guide</span>
          <IconArrowRight size={24} />
        </a>
      </div>
    </section>
  </article>
</div>
