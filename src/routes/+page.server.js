import { getPosts } from '$lib/get-posts'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    recentPosts: getPosts({ limit: 2 })
  }
}
