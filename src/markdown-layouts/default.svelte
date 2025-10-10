<script context="module">
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
  export { CodeBlock }
</script>

<div class="outer-container py-36">
  <article class="typography">
    <slot>
      <!-- the content will be slotted in here -->
    </slot>
  </article>
</div>
