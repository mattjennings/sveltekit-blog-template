// This is an endpoint that generates a basic rss feed for your posts.
// It is OK to delete this file if you don't want an RSS feed.

import { getPosts } from '$lib/get-posts'
import { name, website } from '$lib/info'

const xml = String.raw

export async function get() {
  const posts = getPosts()
  const websiteDescription = `${name}'s blog`

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }

  return {
    headers,
    body: xml`
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <description>${websiteDescription}</description>
    <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) =>
          xml`
          <item>
            <guid>${website}/posts/${post.slug}</guid>
            <title>${post.title}</title>
            <description>${post.preview.text}</description>
            <link>${website}/posts/${post.slug}</link>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`
  }
}
