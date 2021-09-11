/**
 * Gets all posts from the /posts folder. Use this in your page load function.
 *
 * If you decide to add pagination to your posts page, this can take
 * page & limit params to help with that.
 */
export function getPosts({ page = 1, limit } = {}) {
  const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
    .map(([, post]) => ({ metadata: post.metadata, component: post.default }))
    // sort by date
    .sort((a, b) => {
      return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1
    })
    // next/previous posts
    .map((post, index, array) => {
      const next = array[index - 1]
      const previous = array[index + 1]

      return {
        ...post,
        next,
        previous
      }
    })

  if (limit) {
    return posts.slice((page - 1) * limit, page * limit)
  }

  return posts
}
