<script lang="ts">
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

<div class="">
  <!-- Main -->
  <main class="min-w-0">
    {@render children()}
  </main>
</div>
