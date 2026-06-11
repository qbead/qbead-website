<script lang="ts">
  import { resolve } from '$app/paths'
  import IconBookUp2 from '@lucide/svelte/icons/book-up-2'
  import { getAllContent } from '$lib/content'
  import FancyHeading from '$lib/components/FancyHeading/FancyHeading.svelte'
  import { onMount } from 'svelte'
  import FilterSelector from '$lib/components/FilterSelector/FilterSelector.svelte'
  type Lesson = {
    title: string
    slug: string
    href: string
    headerImage: string
    topics?: string[]
    difficulty: string
    nextLesson?: string
  }

  function toLesson(page: any): Lesson {
    return {
      title: page.metadata.title,
      slug: page.slug,
      href: resolve('/[...path]', { path: page.slug }),
      headerImage: page.metadata.headerImage,
      topics: page.metadata.topics.split(/\s*,\s*/g),
      difficulty: page.metadata.difficulty,
      nextLesson: page.metadata.nextLesson,
    }
  }

  function sortLessons(lessons: Lesson[]) {
    const bySlug = new Map(lessons.map((l) => [l.slug, l]))
    const nextToPrev = new Map()
    const prevToNext = new Map()

    // Build bidirectional lookup
    for (const lesson of lessons) {
      if (lesson.nextLesson && bySlug.has(lesson.nextLesson)) {
        prevToNext.set(lesson.slug, lesson.nextLesson)
        nextToPrev.set(lesson.nextLesson, lesson.slug)
      }
    }

    // Find all possible heads (slugs that aren't referenced as nextLesson)
    const heads = lessons.map((l) => l.slug).filter((slug) => !nextToPrev.has(slug))

    // Fallback: if no head (i.e. circular chain), pick any node to start
    const startSlugs = heads.length ? heads : [lessons[0].slug]

    const sorted = []
    const visited = new Set()

    for (const startSlug of startSlugs) {
      let current = startSlug
      while (current && !visited.has(current)) {
        const node = bySlug.get(current)
        if (!node) break

        sorted.push(node)
        visited.add(current)
        current = prevToNext.get(current)
      }
    }

    // Prepend any disconnected nodes that weren't visited
    for (const l of lessons) {
      if (!visited.has(l.slug)) sorted.unshift(l)
    }

    return sorted
  }

  let topicFilter = $state('')
  let diffFilter = $state('')

  let allData: {
    lessons: Lesson[]
    difficulties: string[]
    topics: string[]
  } = $state({
    lessons: [],
    difficulties: [],
    topics: [],
  })
  const pages = $derived(
    allData.lessons?.filter(
      (l) =>
        (topicFilter ? l.topics?.includes(topicFilter) : true) &&
        (diffFilter ? l.difficulty === diffFilter : true)
    )
  )
  const topics = $derived(allData.topics)
  const difficulties = $derived(allData.difficulties)

  onMount(async () => {
    allData = await getAllContent('lessons').then((p) => {
      const lessons = sortLessons(p.map(toLesson))
      const difficulties = new Set(lessons.map((p) => p.difficulty)) as Set<string>
      const topics = new Set(lessons.flatMap((d) => d.topics)) as Set<string>
      const sortedDiff = Array.from(difficulties.values())
      sortedDiff.sort()
      const sortedTopics = Array.from(topics.values())
      sortedTopics.sort()
      return {
        lessons,
        difficulties: sortedDiff,
        topics: sortedTopics,
      }
    })
  })
</script>

<div class="lesson-list-layout m-auto my-32 max-w-7xl px-10">
  <div class="head-area">
    <FancyHeading
      title="The Learning Guide"
      highlightText="Learning Guide"
      altText="Play"
      class="lg:mb-20"
    >
      Everything you need to learn with, teach with, and program your Qbead. From basic quantum
      concepts to advanced coding tutorials.
    </FancyHeading>
  </div>
  <div class="filter-menu-area">
    <div class="top-32 m-auto grid max-w-md grid-cols-1 gap-8 md:sticky">
      <aside class=" bg-surface-100-900 rounded-lg p-8 text-lg">
        <h2 class="h4 mb-4">Topics</h2>
        <FilterSelector
          selection={topicFilter}
          onSelect={(value) => {
            topicFilter = value
          }}
          items={[{ label: 'All', value: '' }, ...topics.map((t) => ({ label: t, value: t }))]}
        />
      </aside>

      <aside class="bg-surface-100-900 rounded-lg p-8 text-lg">
        <h2 class="h4 mb-4">Level</h2>
        <FilterSelector
          selection={diffFilter}
          onSelect={(value) => {
            diffFilter = value
          }}
          items={[
            { label: 'All', value: '' },
            ...difficulties.map((d) => ({ label: d, value: d })),
          ]}
        />
      </aside>
    </div>
  </div>
  <div class="lesson-area">
    <div class="flex flex-col items-center">
      {#if pages.length === 0}
        <p class="text-surface-500 text-center">No lessons found. Try adjusting your filters.</p>
      {/if}
      <ol class="hex-grid not-prose">
        {#each pages as entry}
          {#key entry.slug}
            <li>
              <a href={entry.href}>
                <img src={entry.headerImage} alt={entry.title} />
                <div class="content">
                  <h5 class="title h6 leading-1">{entry.title}</h5>
                  {#if entry.difficulty}
                    <p>
                      <span class="badge bg-surface-50-950 text-surface-50 text-sm">
                        <IconBookUp2 size="12" />
                        {entry.difficulty}
                      </span>
                    </p>
                  {/if}
                </div>
              </a>
            </li>
          {/key}
        {/each}
      </ol>
    </div>
  </div>
</div>

<style lang="postcss">
  .lesson-list-layout {
    display: grid;
    gap: 2rem;
    grid-template-areas:
      'head'
      'filter-menu'
      'lesson-area';

    @media screen and (width >= 64rem) {
      grid-template-columns: 1fr 3fr;
      grid-template-areas:
        'filter-menu head'
        'filter-menu lesson-area';
    }

    .head-area {
      grid-area: head;
    }
    .filter-menu-area {
      grid-area: filter-menu;
    }
    .lesson-area {
      grid-area: lesson-area;
    }
  }

  .hex-grid {
    --border-size: 2px;
    --background-color: var(--color-surface-900);
    --border-color: color-mix(in lab, var(--background-color) 88%, white);
    padding: 0;
    display: grid;
    max-width: 30em;
    width: 106.25%;
    grid-template-columns: 1fr;
    position: relative;
    padding-bottom: 20%;

    & > * {
      position: relative;
      list-style: none;
      margin: 1rem;
      padding: 0;
      overflow: hidden;
      /* we create a fake border */
      background: var(--border-color);

      aspect-ratio: calc(2 / sqrt(3));
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

      transform: scale(1);
      transition: transform 0.15s ease;

      &:hover,
      &:focus {
        transform: scale(1.05);
      }
    }

    & > * > a {
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
        transition: all 0.3s ease-out;
      }
      &:hover,
      &:focus {
        img {
          transform: translateY(-10%) scale(1.2);
          transition-duration: 2s;
        }
      }
    }

    img {
      margin: 0;
      height: 50%;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
    }

    img:not([src]) {
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

    @media screen and (width >= 64rem) {
      & {
        grid-template-columns: 1fr 1fr;
        left: 6.25%;
        max-width: 54em;
      }
      .title {
        font-size: var(--text-xl);
      }
      & > *:nth-child(2n + 1) {
        margin-left: 0;
      }
      & > *:nth-child(2n) {
        top: 50%;
        right: 25%;
        margin-right: 0;
      }
    }
  }
</style>
