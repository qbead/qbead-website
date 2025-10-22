import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { getContent } from '$lib/content'

export const prerender = true

export const load: PageLoad = async ({ params }) => {
  const slug = params.path
  const page = await getContent(slug)
  if (!page) throw error(404, `Content not found: ${slug}`)
  return page
}
