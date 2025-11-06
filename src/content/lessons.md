<script lang="ts">
  import { resolve } from '$app/paths'
  import IconBookUp2 from '@lucide/svelte/icons/book-up-2'
  import { getAllContent } from '$lib/content.ts'
  type Lesson = {
    title: string
    href: string
    headerImage: string
    topics?: string[]
    difficulty: string
  }

  const mockImage = () =>
    `https://lipsum.app/random/640x480?${Math.random().toFixed(6)}`

  const _pages: Lesson[] = [
    {
      title: 'What Is Quantum Information?',
      href: '/lessons/what-is-quantum-information',
      headerImage: mockImage(),
      topics: ['classical vs quantum information', 'qubits', 'measurement'],
      difficulty: 'beginner'
    },
    {
      title: 'Superposition and the Nature of Qubits',
      href: '/lessons/superposition-and-qubits',
      headerImage: mockImage(),
      topics: ['superposition', 'state vectors', 'Bloch sphere'],
      difficulty: 'beginner'
    },
    {
      title: 'Quantum Entanglement Basics',
      href: '/lessons/quantum-entanglement-basics',
      headerImage: mockImage(),
      topics: ['entanglement', 'Bell pairs', 'nonlocality'],
      difficulty: 'intermediate'
    },
    {
      title: 'Quantum Gates and Circuits',
      href: '/lessons/quantum-gates-and-circuits',
      headerImage: mockImage(),
      topics: ['Pauli matrices', 'Hadamard gate', 'CNOT gate'],
      difficulty: 'intermediate'
    },
    {
      title: 'Measuring Quantum States',
      href: '/lessons/measuring-quantum-states',
      headerImage: mockImage(),
      topics: ['projection', 'probability amplitudes', 'wavefunction collapse'],
      difficulty: 'intermediate'
    },
    {
      title: 'Quantum Teleportation Explained',
      href: '/lessons/quantum-teleportation',
      headerImage: mockImage(),
      topics: ['entanglement swapping', 'classical channel', 'information transfer'],
      difficulty: 'advanced'
    }
  ]

  function toLesson(page): Lesson {
    return {
      title: page.metadata.title,
      href: resolve('/[...path]', { path: page.slug }),
      headerImage: page.metadata.headerImage,
      topics: page.metadata.topics,
      difficulty: page.metadata.difficulty
    }
  }

  const pages = getAllContent('lessons').then(p => {
    return p.map(toLesson).concat(_pages)
  })

</script>

# Lessons

<div class="flex flex-col items-center">
<ol class="hex-grid not-prose">
{#await pages then pages}
  {#each pages as entry}
    <li>
      <a href={entry.href}>
        <img src={entry.headerImage}/>
        <div class="content">
          <h5 class="title leading-1">{entry.title}</h5>
          {#if entry.difficulty}
            <p>
              <span class="badge text-sm bg-surface-50-950 text-surface-50">
                <IconBookUp2 size="12" />
                {entry.difficulty}
              </span>
            </p>
          {/if}
        </div>
      </a>
    </li>
  {/each}
{/await}
</ol>
</div>

<style lang="postcss">
  .hex-grid {
    --border-size: 2px;
    --background-color: var(--color-surface-900);
    --border-color: color-mix(in lab, var(--background-color) 88%, white);
    padding: 0;
    display: grid;
    max-width: 50em;
    width: 106.25%;
    grid-template-columns: 1fr 1fr;
    position: relative;
    left: 6.25%;
    padding-bottom: 20%;

    > * {
      position: relative;
      list-style: none;
      margin: 1rem;
      padding: 0;
      overflow: hidden;
      /* we create a fake border */
      background: var(--border-color);

      aspect-ratio: calc(2 / sqrt(3));
      clip-path: polygon(
        25% 0%, 75% 0%,
        100% 50%, 75% 100%,
        25% 100%, 0% 50%
      );

      transform: scale(1);
      transition: transform .15s ease;

      &:hover, &:focus {
        transform: scale(1.05);
      }
    }
    > *:nth-child(2n+1) {
      margin-left: 0;
    }
    > *:nth-child(2n) {
      top: 50%;
      right: 25%;
      margin-right: 0;
    }

    > * > a {
      position: relative;
      top: var(--border-size);
      left: var(--border-size);
      width: calc(100% - 2 * var(--border-size));
      height: calc(100% - 2 * var(--border-size));
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      clip-path: inherit;
      overflow: hidden;
      background: var(--background-color);

      img {
        transition: all .3s ease-out;
      }
      &:hover, &:focus {
        img {
          transform:  translateY(-10%) scale(1.2);
          transition-duration: 2s;
        }
      }
    }

    img {
      margin: 0;
      height: 50%;
      width: 100%;
      object-fit: cover;
    }

    img:not([src]){
      content-visibility: hidden;
      background: var(--color-surface-800);
    }

    .content {
      display: inline-block;
      width: 50%;
      height: 50%;
      text-align: center;
      padding-top: 1rem;
      margin: auto;
    }

    .title {
      display: block;
      line-height: 1.5;
      margin-bottom: 1em;
    }

  }
</style>
