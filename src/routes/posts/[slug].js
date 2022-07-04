import { getPosts } from '$lib/get-posts'

/** @type {import('./__types/[slug]').RequestHandler} */
export async function get({ params }) {
  const { slug } = params

  // get post with metadata
  const post = getPosts().find((post) => slug === post.slug)

  return {
    body: { post }
  }
}
