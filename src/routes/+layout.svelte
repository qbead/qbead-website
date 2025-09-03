<script lang="ts">
  export const prerender = true

  import '../app.css'
  import { Navigation, Avatar } from '@skeletonlabs/skeleton-svelte'
  // Icons
  import IconMenu from '@lucide/svelte/icons/menu'
  import IconFolder from '@lucide/svelte/icons/folder'
  import IconBook from '@lucide/svelte/icons/book'
  import IconInfo from '@lucide/svelte/icons/info'
  import IconGames from '@lucide/svelte/icons/gamepad'
  import { page } from '$app/state'

  let isExpanded = $state(false)

  function toggleExpanded() {
    isExpanded = !isExpanded
  }

  const routes: { [key: string]: string } = {
    '/lessons': 'lessons',
    '/playground': 'playground',
    '/about': 'about',
  }

  const getCurrentRoute = (path: string): string => {
    return (
      Object.entries(routes)
        .find(([key]) => {
          return path.startsWith(key)
        })
        ?.at(1) || 'home'
    )
  }

  let currentRoute: string = $derived(getCurrentRoute(page.url.pathname))
  $inspect('currentRoute', currentRoute)

  let clientWidth: number = $state(1000)
  // only show menu button on small screens
  let showMenu = $derived(clientWidth < 900)

  let { children } = $props()
</script>

<svelte:body bind:clientWidth />

<div class="grid grid-cols-[auto_1fr]">
  <!-- Sidebar -->
  <aside class="sticky top-0 h-screen">
    <Navigation.Rail
      expanded={isExpanded || !showMenu}
      background="sidebar"
      tilesJustify="top"
      widthExpanded="w-78"
      width=""
      padding="p-0 pt-1"
      value={currentRoute}
    >
      {#snippet header()}
        <div class="menu-header" class:expanded={isExpanded}>
          <div class="logo w-full p-4" class:hidden={!isExpanded && showMenu}>QBead</div>
          <button
            class="menu-header-button"
            onclick={toggleExpanded}
            aria-label="Menu"
            hidden={!showMenu}
          >
            <IconMenu size="16" />
          </button>
        </div>
      {/snippet}
      {#snippet tiles()}
        <Navigation.Tile
          rounded="rounded-l-full"
          active="sidebar-active"
          expandedPadding="p-2"
          expandedGap="gap-4"
          gap="gap-0"
          classes="menu-item"
          labelExpanded="Home"
          href="/"
          id="home"
        >
          <Avatar name="icon" size="size-8" classes="menu-circle">
            <IconFolder size="16" />
          </Avatar>
        </Navigation.Tile>
        <Navigation.Tile
          rounded="rounded-l-full"
          active="sidebar-active"
          expandedPadding="p-2"
          expandedGap="gap-4"
          gap="gap-0"
          classes="menu-item"
          labelExpanded="Lessons"
          href="/lessons"
          id="lessons"
        >
          <Avatar name="icon" size="size-8" classes="menu-circle">
            <IconBook size="16" />
          </Avatar>
        </Navigation.Tile>
        <Navigation.Tile
          rounded="rounded-l-full"
          active="sidebar-active"
          expandedPadding="p-2"
          expandedGap="gap-4"
          gap="gap-0"
          classes="menu-item"
          labelExpanded="The Playground"
          id="playground"
        >
          <Avatar name="icon" size="size-8" classes="menu-circle">
            <IconGames size="16" />
          </Avatar>
        </Navigation.Tile>
        <Navigation.Tile
          rounded="rounded-l-full"
          active="sidebar-active"
          expandedPadding="p-2"
          expandedGap="gap-4"
          gap="gap-0"
          classes="menu-item"
          labelExpanded="About Us"
          id="about"
        >
          <Avatar name="icon" size="size-8" classes="menu-circle">
            <IconInfo size="16" />
          </Avatar>
        </Navigation.Tile>
      {/snippet}
      <!-- {#snippet footer()}
				<Navigation.Tile labelExpanded="Settings" href="/settings" title="Settings"><IconSettings /></Navigation.Tile>
			{/snippet} -->
    </Navigation.Rail>
  </aside>
  <!-- Main -->
  <main class="min-w-0">
    {@render children()}
  </main>
</div>
