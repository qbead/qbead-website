---
title: The Learning Guide
layout: base
---

<script lang="ts">
  import { resolve } from '$app/paths'
  import IconBookUp2 from '@lucide/svelte/icons/book-up-2'
  import { getAllContent } from '$lib/content.ts'
  import FancyHeading from '$lib/components/FancyHeading/FancyHeading.svelte'
  type Lesson = {
    title: string
    slug: string
    href: string
    headerImage: string
    topics?: string[]
    difficulty: string
    nextLesson?: string
  }

  const mockImage = () =>
    `https://lipsum.app/random/640x480?${Math.random().toFixed(6)}`

  function toLesson(page): Lesson {
    return {
      title: page.metadata.title,
      slug: page.slug,
      href: resolve('/[...path]', { path: page.slug }),
      headerImage: page.metadata.headerImage,
      topics: page.metadata.topics,
      difficulty: page.metadata.difficulty,
      nextLesson: page.metadata.nextLesson
    }
  }

  function sortLessons(lessons: Lesson[]) {
    const bySlug = new Map(lessons.map(l => [l.slug, l]))
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
    const heads = lessons
      .map(l => l.slug)
      .filter(slug => !nextToPrev.has(slug))

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

  const allPages = getAllContent('lessons').then(p => {
    return sortLessons(p.map(toLesson))
  })

  const pages = $derived(allPages)

</script>

<div class="lesson-list-layout py-32">
  <div class="head-area">
    <FancyHeading
      title="The Learning Guide"
      highlightText="Learning Guide"
      altText="Play"
      class="mb-20">
    Everything you need to learn with, teach with, and program your Qbead. From basic quantum concepts to advanced coding tutorials.
    </FancyHeading>
  </div>
  <div class="filter-menu-area">
    <p>Filters</p>
  </div>
  <div class="lesson-area">
    <div class="flex flex-col items-center">
    <ol class="hex-grid not-prose">
    {#await pages then pages}
      {#each pages as entry}
        <li>
          <a href={entry.href}>
            <img src={entry.headerImage}/>
            <div class="content">
              <h5 class="title h6 leading-1">{entry.title}</h5>
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
  </div>
</div>

<style lang="postcss">
  .lesson-list-layout {
    .head-area {
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
      pointer-events: none;
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

    @media screen and (width >= 56em){
      &{
        grid-template-columns: 1fr 1fr;
        left: 6.25%;
        max-width: 54em;
      }
      .title {
        font-size: var(--text-xl);
      }
      > *:nth-child(2n+1) {
        margin-left: 0;
      }
      > *:nth-child(2n) {
        top: 50%;
        right: 25%;
        margin-right: 0;
      }
    }
  }
</style>
