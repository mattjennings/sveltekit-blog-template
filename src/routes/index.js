import { getPosts } from '$lib/get-posts'

/** @type {import('./__types/index').RequestHandler} */
export async function get() {
  return {
    body: {
      recentPosts: getPosts({ limit: 2 })
    }
  }
}
