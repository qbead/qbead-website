import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

interface Lesson {
  metadata: { [key: string]: any }
}

export const GET: RequestHandler = async (request) => {
  const { slug } = request.params
  const allLessons = import.meta.glob('../../**/*.md')
  const pages = await Promise.all(
    Object.entries(allLessons)
      .filter(([path]) => path.includes(`/${slug}/`))
      .map(async ([path, resolver]) => {
        const page = await resolver()
        const { metadata } = page as Lesson
        return { metadata, path: path.replace('/src/routes', '').replace('.md', '') }
      })
  )
  return json(pages)
}

export const prerender = true
