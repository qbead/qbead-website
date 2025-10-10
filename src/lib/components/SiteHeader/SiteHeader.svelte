<script lang="ts">
  import { page } from '$app/state'
  import IconMenu from '@lucide/svelte/icons/menu'

  const ROUTES = [
    { href: '/lessons', label: 'Lessons' },
    { href: '/playground', label: 'Playground' },
    { href: '/about', label: 'About' },
  ]

  const getCurrentRoute = (path: string): string => {
    return (
      Object.values(ROUTES).find(({ href }) => {
        return path.startsWith(href)
      })?.label || 'home'
    )
  }

  let currentRoute: string = $derived(getCurrentRoute(page.url.pathname))
  $inspect('currentRoute', currentRoute)

  let showMenu: boolean = $state(false)
</script>

<header class="bg-surface-100-900 sticky top-0 z-10 flex flex-col gap-16 px-10 py-6 md:px-32">
  <div
    class="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-between gap-10 md:flex-row md:items-center"
  >
    <div class="flex items-stretch justify-between">
      <a href="/" aria-label="Qbead Home">
        <img
          width="160"
          src="/Qbead-Logo-Variant-B-Dark-Mode-Full-Color-Rgb.svg"
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
    <nav class:hidden={!showMenu} class="md:block">
      <!-- Nav items -->
      <ul class="bg-surface-100-900 flex flex-col items-center gap-10 md:flex-row">
        {#each ROUTES as { href, label }}
          <li>
            <a
              {href}
              class="hover:text-surface-contrast-500 hover:bg-surface-600-400 rounded-full px-4 py-3 transition-colors duration-200 ease-in-out"
              class:selected={currentRoute.toLowerCase() === label.toLowerCase()}
              onclick={() => (showMenu = false)}
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header>

<style>
  @reference '../../../../app.css';
  a.selected {
    @apply text-surface-contrast-500 bg-surface-600-400;
  }
</style>
