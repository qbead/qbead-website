<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte'
	import IconAtom from '@lucide/svelte/icons/atom'
</script>

<div class="main-content">
	<article class="flex flex-col gap-30">
		<section class="grid grid-cols-[1fr_auto] items-center gap-10">
			<div>
				<h1 class="mb-6 text-7xl font-bold">The Qbead</h1>
				<p class="mb-11 text-xl">
					Introducing the qubit for your hands-on discovery of quantum phenomena.
				</p>
				<p class="mb-4">
					<a class="btn preset-filled-primary-500"> Learn more </a>
				</p>
			</div>
			<div class="bg-surface-800 h-64 w-64 rounded-full"></div>
		</section>

		<section class="callout card bg-surface-800 grid grid-cols-[1fr_auto_auto] items-center gap-10">
			<div>
				<Avatar name="QBead" background="bg-surface-700" classes="not-prose">
					<IconAtom />
				</Avatar>
			</div>
			<span class="vr border-surface-900 border-l-2"></span>
			<div>
				The Qbead is a toy <span class="text-yellow-400">Bloch sphere</span> that helps people of
				all ages learn about <span class="text-rose-400">quantum bits</span> through play. This is another
				sentence if needed here.
			</div>
		</section>

		<section>
			<header><h3 class="mb-4 text-4xl font-bold text-yellow-400">A Bloch Sphere</h3></header>
			<p class="mb-6 text-xl font-normal">
				is a way to represent the state of a <span class="text-rose-400">quantum bit</span> or
				<span class="text-rose-400">qubit</span>, which is the basic unit of quantum computing.
			</p>

			<p class="mb-6">
				The north pole of the sphere represents the "0" state, and the south pole represents the "1"
				state. Instead of just being 0 or 1 (like a regular computer bit), a qubit can be anywhere
				on this sphere, meaning it can be a mix of both 0 and 1 at the same time. Since a qubit can
				be anywhere on the surface of the sphere, it can hold much more information in a fuzzy,
				in-between way.
			</p>

			<a class="btn preset-filled-warning-500 mt-6"> Learn more </a>
		</section>
	</article>
</div>
