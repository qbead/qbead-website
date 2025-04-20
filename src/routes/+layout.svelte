<script lang="ts">
	import '../app.css';
	import { Navigation, Avatar } from '@skeletonlabs/skeleton-svelte'
  // Icons
  import IconMenu from '@lucide/svelte/icons/menu'
  import IconFolder from '@lucide/svelte/icons/folder'
  import IconBook from '@lucide/svelte/icons/book'
  import IconInfo from '@lucide/svelte/icons/info'
  import IconGames from '@lucide/svelte/icons/gamepad'
	import { page } from '$app/state'

  let isExpansed = $state(true)

  function toggleExpanded() {
    isExpansed = !isExpansed
  }

	const routes: { [key: string]: string } = {
		'/lessons': 'lessons',
		'/playground': 'playground',
		'/about': 'about'
	}

	const getCurrentRoute = (path: string): string => {
		return Object.entries(routes).find(([key]) => {
			return path.startsWith(key)
		})?.at(1) || 'home'
	}

	let currentRoute: string = $derived(getCurrentRoute(page.url.pathname))
	$inspect('currentRoute', currentRoute)

	let { children } = $props()
</script>

<div class="grid grid-cols-[auto_1fr]">
  <!-- Sidebar -->
  <aside class="sticky top-0 col-span-1 h-screen">
		<Navigation.Rail expanded={isExpansed} tilesJustify="top" widthExpanded="w-90" padding="pl-10" value={currentRoute}>
			{#snippet header()}
				<Navigation.Tile
					labelExpanded="Menu"
					onclick={toggleExpanded}
					title="Toggle Menu Width"
				>
					<IconMenu />
				</Navigation.Tile>
			{/snippet}
			{#snippet tiles()}
				<Navigation.Tile labelExpanded="Home" href="/" id="home">
					<Avatar name="icon">
						<IconFolder />
					</Avatar>
				</Navigation.Tile>
				<Navigation.Tile labelExpanded="Lessons" href="/lessons" id="lessons">
					<Avatar name="icon">
					 	<IconBook />
					</Avatar>
				</Navigation.Tile>
				<Navigation.Tile labelExpanded="The Playground" href="/playground" id="playground">
					<Avatar name="icon">
						<IconGames />
					</Avatar>
				</Navigation.Tile>
				<Navigation.Tile labelExpanded="About Us" href="/about" id="about">
					<Avatar name="icon">
						<IconInfo />
					</Avatar>
				</Navigation.Tile>
			{/snippet}
			<!-- {#snippet footer()}
				<Navigation.Tile labelExpanded="Settings" href="/settings" title="Settings"><IconSettings /></Navigation.Tile>
			{/snippet} -->
		</Navigation.Rail>
	</aside>
  <!-- Main -->
  <main class="col-span-1 p-4">
  	{@render children()}
  </main>
</div>
