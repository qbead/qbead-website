import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/lessons`)
	const pages = await response.json()

	return { pages }
}

export const prerender = true
