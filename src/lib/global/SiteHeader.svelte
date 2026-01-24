<script lang="ts">
  import { page } from '$app/state'
  import IconMenu from '@lucide/svelte/icons/menu'

  const NAV_LINKS = [
    { href: '/lessons', label: 'Lessons', section: 'lessons' },
    /*{ href: '/codedoc', label: 'Code Docs', section: 'codedoc' },*/
    { href: '/team', label: 'Team', section: 'team' },
    { href: '/about', label: 'About', section: 'about' },
  ]

  const getCurrentRoute = (): string => {
    return (
      Object.values(NAV_LINKS).find(({ href, section }) => {
        return page.data.section
          ? page.data.section === section
          : page.url.pathname.startsWith(href)
      })?.label || 'home'
    )
  }

  let currentRoute: string = $derived(getCurrentRoute())
  $inspect('currentRoute', currentRoute)

  let showMenu: boolean = $state(false)
</script>

<header
  class="bg-surface-100-900 sticky top-0 z-10 flex flex-col gap-16 px-10 py-4 shadow-xl md:py-8"
>
  <div
    class="m-auto flex w-full max-w-7xl flex-col items-stretch justify-between md:flex-row md:items-center md:gap-10"
  >
    <div class="flex items-stretch justify-between">
      <a href="/" aria-label="Qbead Home">
        <img
          width="160"
          src="/alllogos/Logo Dark Mode/Full Color/Web/Qbead-Logo-Dark-Mode-Full-Color-Rgb.svg"
          alt="Qbead Logo"
        />
      </a>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="inline-flex items-center rounded-md p-2 md:hidden"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onclick={() => (showMenu = !showMenu)}
      >
        <span class="sr-only">Open main menu</span>
        <IconMenu />
      </button>
    </div>
    <nav class:closed={!showMenu} class="grid md:block">
      <!-- Nav items -->
      <menu
        class="bg-surface-100-900 flex flex-col items-center gap-10 overflow-hidden md:flex-row md:overflow-visible"
      >
        {#each NAV_LINKS as { href, label }}
          <li class="whitespace-nowrap">
            <a
              {href}
              class="hover:text-surface-contrast-300-700 hover:bg-surface-200-800 rounded-full px-4 py-3 transition-colors duration-200 ease-in-out"
              class:selected={currentRoute.toLowerCase() === label.toLowerCase()}
              onclick={() => (showMenu = false)}
            >
              {label}
            </a>
          </li>
        {/each}
      </menu>
    </nav>
  </div>
</header>

<style>
  @reference '../../app.css';
  a.selected {
    @apply text-surface-contrast-500 bg-surface-600-400;
    font-weight: 700;
  }

  nav {
    transform-origin: top center;
    transform: scaleY(1);
    opacity: 1;
    transition: grid-template-rows 0.2s cubic-bezier(0.2, 0.9, 0.25, 1);
    grid-template-rows: 1fr;

    &.closed {
      grid-template-rows: 0fr;
    }

    > menu {
      &::before,
      &:after {
        content: '';
      }
    }

    @media (prefers-reduced-motion: reduce) {
      & {
        transition: none !important;
      }
    }
  }
</style>
