import { posts } from '$lib/data/posts'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    // eslint-disable-next-line no-unused-vars
    recentPosts: posts.slice(0, 2)
  }
}
