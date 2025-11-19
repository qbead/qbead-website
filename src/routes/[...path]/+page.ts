import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { getContent, getAllContent } from '$lib/content'

export const prerender = true
export const ssr = true

export async function entries() {
  const contents = await getAllContent()
  const routes = contents.map((page) => ({ path: page.slug }))
  return routes
}

export const load: PageLoad = async ({ params }) => {
  const slug = params.path
  const page = await getContent(slug)
  if (!page) throw error(404, `Content not found: ${slug}`)
  return page
}
