import { getPosts } from '$lib/get-posts'

/**
 * An endpoint for the getPosts() function. Some of the metadata that gets added
 * is only available when run on the server (i.e node), so when we need to fetch
 * posts client-side we'll do it through this endpoint.
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
