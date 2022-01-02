import { getPosts } from '$lib/get-posts'

/**
 * An endpoint for the getPosts() function. Some of the metadata we add into
 * posts use methods that are only available on the server (i.e node).
 *
 * You can use getPosts() directly if you wish, but if it runs client-side (the browser)
 * it will be missing some metadata.
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url: { searchParams } }) {
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined

  return {
    body: JSON.stringify(getPosts({ limit, page }))
  }
}
