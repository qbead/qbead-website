<script>
  export let data
</script>

<nav class="list-nav">
  <h1 class="h1">Lessons</h1>
  <ul>
    {#each data.pages as page}
      <li>
        <a href={page.path}>
          <span>{page.metadata.title}</span>
          <span>Published {page.metadata.date}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>
