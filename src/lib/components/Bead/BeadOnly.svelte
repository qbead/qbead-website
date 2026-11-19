<!--
@component
Shows its children only while a Qbead is paired, for content that makes no sense without one.

Markdown headings inside still appear in the page's table of contents (it is built at build
time), so use a styled paragraph such as `<p class="h2">` for a heading here instead.
-->
<script lang="ts">
  import type { Snippet } from 'svelte'
  import { bead } from '$lib/bead/bead.svelte'

  let { children }: { children: Snippet } = $props()
</script>

{#if bead.status === 'live'}
  {@render children()}
{/if}
