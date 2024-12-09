export async function load({ params }) {
  const page = await import(`../${params.slug}.md`)
  const { metadata, default: content } = page
  return {
    metadata,
    content,
  }
}

export const prerender = true

// export function entries() {
//   const allLessons = import.meta.glob('/src/routes/lessons/*.md')
//   const entries = Object.entries(allLessons).map(([path, resolver]) => {
//     return {
//       slug: path.replace('/src/routes', '').replace('.md', ''),
//     }
//   })
//   return entries
// }
