export const load = async ({ fetch }) => {
  const response = await fetch(`/api/lessons`)
  const pages = await response.json()

  return {
    pages,
  }
}
