const allPosts = Object.entries(import.meta.globEager('/posts/**/*.md'))
  // get post metadata
  .map(([, post]) => post.metadata)
  // sort by date
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  // get next/previous posts for each
  .map((post, index, array) => ({
    ...post,
    next: array[index - 1],
    previous: array[index + 1]
  }))

/**
 * Returns all available posts
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const currentPage = parseInt(query.get('page') ?? '1')
  const limit = parseInt(query.get('limit') ?? `${allPosts.length}`)

  return {
    body: allPosts.slice((currentPage - 1) * limit, currentPage * limit)
  }
}
