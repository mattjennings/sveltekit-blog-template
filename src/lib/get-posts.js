import { browser } from '$app/env'
import { parse } from 'node-html-parser'
import readingTime from 'reading-time/lib/reading-time.js'

/**
 * Gets all the posts. This should be used by endpoints only, as some metadata
 * requires being on the server to be processed.
 *
 * For getting posts from the client fetch from `/posts.json`
 */
export function getPosts({ page = 1, limit } = {}) {
  if (limit) {
    return posts.slice((page - 1) * limit, page * limit)
  }

  return posts
}

const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
  // add metadata to the posts
  .map(([filepath, post]) => {
    // get name of file if my-post.md or name of folder if my-post/index.md
    const entry = filepath.replace(/(\/index)?\.md/, '')

    return {
      ...post.metadata,
      component: post.default,
      filename: entry.split('/posts/').pop(),
      slug: entry.split('/').pop(),

      // in routes/[slug].svlte, we need to hardcode whether or not the
      isFolder: filepath.endsWith('/index.md'),

      // remove timezone from parsed date
      date: post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : undefined
    }
  })
  // parse HTML output for content metadata (preview, reading time, toc)
  .map((post) => {
    // post.component.render() is not available on client, skip adding content metadata
    if (browser) {
      return post
    }

    const parsedHtml = parse(post.component.render().html)

    // get the first paragaph of the post to use for the preview
    const preview = parsedHtml.querySelector('p')

    return {
      ...post,
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
