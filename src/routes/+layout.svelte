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

	let isExpansed = $state(true)

	function toggleExpanded() {
		isExpansed = !isExpansed
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

	// only show menu button on small screens
	let isSmallScreen = $derived(() => {
		return window.innerWidth < 900
	})

	$inspect('isSmallScreen', isSmallScreen())

	let { children } = $props()
</script>

<div class="grid grid-cols-[auto_1fr]">
	<!-- Sidebar -->
	<aside class="sticky top-0 col-span-1 h-screen">
		<Navigation.Rail
			expanded={isExpansed}
			background="sidebar"
			tilesJustify="top"
			widthExpanded="w-78"
			width="w-14"
			padding="p-0"
			value={currentRoute}
		>
			{#snippet header()}
				<Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width">
					<IconMenu />
				</Navigation.Tile>
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
					href="/playground"
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
					href="/about"
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
	<main class="col-span-1">
		{@render children()}
	</main>
</div>
