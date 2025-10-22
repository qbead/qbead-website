import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const page = await import(`../${params.slug}.md`)
  const { metadata, default: content } = page
  const layout = metadata?.layout
  return { metadata, content, layout }
}
