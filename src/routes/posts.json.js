import { parse } from 'node-html-parser'
import readingTime from 'reading-time'

/**
 * Gets all posts and adds extra metadata that we'll use when showing posts
 */
const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
  // get mdsvex metadata, add preview and reading time
  .map(([, post]) => {
    // get the HTML output of the post
    const parsedHtml = parse(post.default.render().html)

    // get the first html element to use as the preview.
    const preview = parsedHtml.querySelector('> *')

    return {
      ...post.metadata,
      preview: {
        // this will be rendered as the preview for the post
        html: preview.toString(),

        // a text-only version of the preview, used for SEO
        text: preview.structuredText
      },

      // get estimated reading time for the post
      readingTime: readingTime(parsedHtml.structuredText).text
    }
  })
  // sort by date
  .sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1))
  // now that it's sorted, add next/previous post data to each post
  .map((post, index, array) => {
    const next = array[index - 1]
    const previous = array[index + 1]

    return {
      ...post,
      next,
      previous
    }
  })

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url: { searchParams } }) {
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined

  if (page && limit) {
    return {
      body: JSON.stringify(posts.slice((page - 1) * limit, page * limit))
    }
  }

  return {
    body: JSON.stringify(posts)
  }
}
