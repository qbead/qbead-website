import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const page = await import(`../${params.slug}.md`)
  const { metadata, default: content } = page
  return { metadata, content }
}

// export function entries() {
//   const allLessons = import.meta.glob('/src/routes/lessons/*.md')
//   const entries = Object.entries(allLessons).map(([path, resolver]) => {
//     return {
//       slug: path.replace('/src/routes', '').replace('.md', ''),
//     }
//   })
//   return entries
// }
