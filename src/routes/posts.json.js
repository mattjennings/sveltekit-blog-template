import { parse } from 'node-html-parser'
import readingTime from 'reading-time'

const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
  // add extra metadata to the posts
  .map(([, post]) => {
    const parsedHtml = parse(post.default.render().html)
    // get the first HTML element of the post to use as a preview
    // (adjust this selector if you want a longer preview)
    const preview = parsedHtml.querySelector('> *')

    return {
      ...post.metadata,

      preview: {
        html: preview.toString(),
        // text-only preview (i.e no html elements), used for SEO
        text: preview.structuredText
      },

      // get estimated reading time for the post
      readingTime: readingTime(parsedHtml.structuredText).text
    }
  })
  // sort by date
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  // add references to the next/previous post
  .map((post, index, allPosts) => ({
    ...post,
    next: allPosts[index - 1],
    previous: allPosts[index + 1]
  }))

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url: { searchParams } }) {
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1

  if (limit) {
    return {
      body: JSON.stringify(posts.slice((page - 1) * limit, page * limit))
    }
  }

  return {
    body: JSON.stringify(posts)
  }
}
