export async function load({ params }) {
  const page = await import(`../${params.slug}.md`)
  const { metadata, default: content } = page
  return {
    metadata,
    content,
  }
}
