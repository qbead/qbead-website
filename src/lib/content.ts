export type ContentEntry = {
  slug: string
  section?: string
  metadata?: Record<string, any>
  layout?: string
  content: any
}

function parentSlug(slug: string) {
  let parents = slug.split('/')
  parents.pop()
  return parents.join('/')
}

function makePageData(slug: string, data: any) {
  const metadata = data.metadata || {}
  const section = metadata.section ?? parentSlug(slug)
  const layout = metadata?.layout ?? 'article'
  return {
    slug,
    layout,
    section,
    metadata,
    content: data.default,
  }
}

export async function getAllContent(section?: string): Promise<ContentEntry[]> {
  const modules = import.meta.glob('/src/content/**/*.{md,svelte,sveltex}', { eager: true })

  const entries = Object.entries(modules).map(([path, data]: [string, any]) => {
    const slug = path.replace(/^\/src\/content\//, '').replace(/\.(md|svelte|sveltex)$/, '')
    return makePageData(slug, data)
  })

  if (section) {
    return entries.filter((page) => section === page.section)
  } else {
    return entries
  }
}

export async function getContent(slug: string): Promise<ContentEntry | null> {
  const modules = import.meta.glob('/src/content/**/*.{md,svelte,sveltex}')
  const exts = ['.md', '.svelte', '.sveltex']

  const loader = exts
    .map((ext) => `/src/content/${slug}${ext}`)
    .map((path) => modules[path])
    .find(Boolean)
  if (!loader) return null
  const data: any = await loader()
  return makePageData(slug, data)
}
