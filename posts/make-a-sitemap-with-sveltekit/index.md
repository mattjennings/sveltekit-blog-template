---
title: Make a Sitemap with Sveltekit
date: 2021-08-21
---

If you want to rank on Google (and other search engines) you need to
be able to tell the world what your site consists of. A sitemap is
used by the Googlebot, BingBot, DuckDuckBot and other search engines
to tell them what pages are available.

ℹ️ This is a contribution post from [scottspence.com](https://scottspence.com/posts/make-a-sitemap-with-sveltekit/)

This guide will take a lot of the learnings from the post I wrote on
[Making an RSS Feed for your SvelteKit Project] and expand on it for
use as a sitemap.

So as with the RSS post I'll be using Matt Jennings' awesome
[SvelteKit blog template] for this example.

If you haven't seen the last guide that's fine I'll include a lot of
the steps in here so there's no need to cross reference.

## Sitemap route

If you haven't done so already and want to follow along then clone the
repo and install the dependencies and spin up the dev server, the
default port is `3000`:

```bash
# using SSH
git clone git@github.com:mattjennings/sveltekit-blog-template
# using HTTPS
git clone https://github.com/mattjennings/sveltekit-blog-template
cd sveltekit-blog-template
npm i
npm run dev
```

If I open up Matt's SvelteKit blog template in VS Code this is how it
is structured:

```bash
sveltekit-blog-template/
├─ posts/
│ └─ getting-started/
│   └─ index.md
├─ src/
│ └─ lib/
│ └─ routes/
│ │ └─ posts/
│ │   └─ [slug].svelte/
│ │─ __layout.svelte/
│ └─ index.svelte/
...rest of the files
```

Currently it's an index page and a posts directory, the index page is
the site homepage and the posts directory will take a slug that's
passed to the `[slug].svelte` file (example `getting-started`) and
turn that into `localhost:3000/posts/getting-started`.

A sitemap is generally located at the root level of a site, so in the
case of my site it's `https://scottspence.com/sitemap.xml`.

I'll create the sitemap file as `sitemap.xml.js` in [SvelteKit
endpoints] you can define the type of data you want to return, in this
case it's XML.

I'll create the sitemap file via the terminal:

```bash
touch src/routes/sitemap.xml.js
```

If I go to `localhost:3000/sitemap.xml` I get a 404.

Now I need to create a `get()` function to return the sitemap XML and
headers for the endpoint.

For now I'll put in some XML headings for the body, I'll move the XML
out into it's own function later, for now this is just to get a bit of
visual feedback:

```js
export async function get() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body: `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    ></urlset>`
  }
}
```

Going to `localhost:3000/sitemap.xml` now a get the beginnings of my
sitemap XML feed.

In the `headers` I'm setting the [expiration] to an hour with
`s-maxage` and for the `body` adding in the XML heading. You can check
out the [W3C Feed Validation Service] for more detail on what's needed
here.

The schemas (`xmlns:news` etc) are used to tell the search engines
what type of data you're returning. I've used [Josh Comeau's sitemap]
as an example here. You can check out Sitemaps XML format over on
[sitemaps.org] for more information.

Now if I go check `localhost:3000/rss.xml` I get the beginning of my
RSS feed.

## Hardcoding pages into the sitemap

First up I'll tackle the first url which isn't going to change, the
site URL.

In Matt's template there's an `info.js` file that contains the project
`name` and `website` links. I'll import the `website` and use that.

```js
import { website } from '$lib/info'

export async function get() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body: `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>${website}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    </urlset>`
  }
}
```

That was straightforward enough, right? That's only one page though so
the Googlebot isn't going to be doing much with that.

## Adding posts to sitemap

Because the posts routes are dynamically generated I'll need to create
a little helper function for the posts, I'll use a trimmed down
version of what Matt uses in the homepage (`src/routes/index.js`) to
get the posts.

I'll create a `get-posts.js` in the `lib` directory of the project:

```bash
# create the file
touch src/lib/get-posts.js
```

Here's what the function for `getPosts` looks like:

```js
export async function getPosts() {
  const posts = await Object.entries(import.meta.globEager('/posts/**/*.md'))
    // get post metadata
    .map(([, post]) => post.metadata)
    // sort by date
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}
```

I can now import that into the `sitemap.xml.js` file so I can map over
the posts returned from the `getPosts` function inside the XML markup
using tags `${}`.

Before I do that though I'll move the markup out into a function so
it's not cluttering up the return of the `get()` function.

I can pass the `posts` from the `getPosts()` function into this, then
I can map over each post and render out the markup for each one:

```js
const sitemap = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${posts
    .map((post) =>
      post.isPrivate
        ? null
        : `
  <url>
    <loc>${website}/posts/${post.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`
```

Now in the get function I'll pass the `posts` from the `getPosts()`
into the `sitemap` function and use that for the body return of
`getPosts()`.

Here's the full file:

```js
import { getPosts } from '$lib/get-posts'
import { website } from '$lib/info'

export async function get() {
  const posts = await getPosts()
  const body = sitemap(posts)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body
  }
}

const sitemap = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${posts
    .map((post) =>
      post.isPrivate
        ? null
        : `
  <url>
    <loc>${website}/posts/${post.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`
```

## Next steps from here

There's some aspects of this project that wont change very often, like
the routes for the homepage, about page etc. I could hardcode these
into the XML directly.

But rather than doing that I can add the pages to an array variable so
that I can add any new pages that exist in the `src/routes` to it.

I can add any new pages to the array rather than creating a new
`<url>` element for each new page that's added. Here's an example of
how that may look:

```js
import { getPosts } from '$lib/get-posts'
import { website } from '$lib/info'

export async function get() {
  const posts = await getPosts()
  const pages = [`about`, `newsletter`, `privacy-policy`]
  const body = sitemap(posts, pages)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body
  }
}

const sitemap = (posts, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${website}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
  ${posts
    .map((post) =>
      post.isPrivate
        ? null
        : `
  <url>
    <loc>${website}/posts/${post.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`
```

## Conclusion

Alright, I've gone through and created a sitemap that contains all the
pages on the project.

I hope this has given you enough information to get started with
making your own sitemap on your SvelteKit projects.

<!-- Links -->

[making an rss feed for your sveltekit project]: https://scottspence.com/posts/make-an-rss-feed-with-sveltekit
[sveltekit blog template]: https://github.com/mattjennings/sveltekit-blog-template
[sveltekit endpoints]: https://kit.svelte.dev/docs#routing-endpoints
[expiration]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#expiration
[w3c feed validation service]: https://validator.w3.org/feed/docs/rss2.html
[josh comeau's sitemap]: https://www.joshwcomeau.com/sitemap.xml
[sitemaps.org]: https://www.sitemaps.org/protocol.html
