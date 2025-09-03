<script context="module">
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
  export { CodeBlock }
</script>

<div class="main-content">
  <article class="content">
    <slot>
      <!-- the content will be slotted in here -->
    </slot>
  </article>
</div>
