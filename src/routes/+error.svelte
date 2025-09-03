<script>
	import { page } from '$app/state'
</script>

<div class="main-content">
	<article class="content">
		<h1>{page.status}</h1>
		<pre>{page.error?.message}</pre>
	</article>
</div>
