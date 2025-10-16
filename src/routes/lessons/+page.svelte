<script>
  export let data
</script>

<div class="outer-container py-36">
  <article class="content">
    <nav>
      <h1 class="h1">Lessons</h1>
      <ul class="mt-10 flex flex-col gap-6 text-lg">
        {#each data.pages as page}
          <li>
            <a href={page.path} class="anchor">
              <span>{page.metadata.title}</span>
              <span>Published {page.metadata.date}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </article>
</div>
