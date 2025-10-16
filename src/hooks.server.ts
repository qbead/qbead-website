import type { RequestEvent } from '@sveltejs/kit'

export function handleError({ event, error }: { event: RequestEvent; error: Error }) {
  console.error(error.stack)

  return {
    message: error.message,
    stack: error.stack,
  }
}
