import { browser } from '$app/env'
import { parse } from 'node-html-parser'
import readingTime from 'reading-time/lib/reading-time.js'

const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
  // add metadata to the posts
  .map(([filepath, post]) => {
    return {
      ...post.metadata,
      component: post.default,
      filename: filepath.split('/posts/').pop(),
      slug: filepath.replace('/index.md', '').split('/').pop(),

      // remove timezone from parsed date
      date: post.metadata.date ? new Date(post.metadata.date).toLocaleDateString() : undefined
    }
  })
  // if on server, parse HTML output for content metadata (preview, reading time, toc)
  .map((post) => {
    // post.component.render() is not available on client, skip adding content metadata
    if (browser) {
      return post
    }

    const parsedHtml = parse(post.component.render().html)

    // get all h2 tags to create table of contents
    const sections = parsedHtml.querySelectorAll('h2')

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
      readingTime: readingTime(parsedHtml.structuredText).text,

      // table of contents
      toc: sections.map((section) => ({
        id: section.id,
        title: section.structuredText
      }))
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
