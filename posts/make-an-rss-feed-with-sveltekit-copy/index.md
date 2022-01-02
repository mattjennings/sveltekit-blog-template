---
title: Make an RSS Feed for your SvelteKit Project
date: 2021-08-09
---

The indie web is alive and well and there are more and more people
taking control and owning their online presence and also how they
consume other content. One way to help consumers of your site know
that there is new content available is by making your content
available via an RSS feed.

ℹ️ This is a contribution post from [scottspence.com](https://scottspence.com/posts/make-an-rss-feed-with-sveltekit/)

I made an RSS feed for my [blog] using SvelteKit routes. I did this
much like the [Sitemap Generation for Dynamic Routes In NextJS with
the Sanity Client] post I did back in February.

## RSS on [`scottspence.com`](https://scottspence.com)

As I mentioned already as my blog is a SvelteKit project I can use the
SvelteKit [routing endpoints] to define the data type I want returned
from that endpoint.

RSS feeds are expected in XML format and I want my endpoint to be
[`https://scottspence.com/rss.xml`] so I've defined a file in my
routes folder called `rss.xml.js` this is located in the routes folder
of the project, so the full path would be `src/routes/rss.xml.js`.

## RSS route

For this guide I'll using the great [template from Matt Jennings]
(which this blog is based off of) as an example of how to do it.

I'm using the template as it's the most basic example to use and there
won't be any additional project specific routes that will need to be
taken into account.

Let's take a quick look at how the project is structured:

```bash
sveltekit-blog-template/
├─ posts/
├─ src/
│ └─ lib/
│ └─ routes/
│ │ └─ posts/
│ │   └─ [slug].svelte/
│ │─ __layout.svelte/
│ └─ index.svelte/
...rest of the files
```

I've left some of the filing structure that isn't relevant right now.

For now I want to focus on the routes folder as this is where I'll be
creating the RSS page.

## Clone the project

Ok, let's get to work, I'll start by cloning the project and changing
directory into the newly cloned project. Then I'll install the
dependencies and run the dev server:

```bash
# using SSH
git clone git@github.com:mattjennings/sveltekit-blog-template
# using HTTPS
git clone https://github.com/mattjennings/sveltekit-blog-template
cd sveltekit-blog-template
npm i
npm run dev
```

Now Matt's awesome template is up and running on the default port on
`localhost:3000`. If I go to `localhost:3000/rss.xml` I get a 404.
This is because I've not made that route yet.

## Add the RSS route

Now to create the endpoint for where the RSS feed will be located:

```bash
touch src/routes/rss.xml.js
```

Now if I go to `localhost:3000/rss.xml` I get a 404.

In the `rss.xml.js` file I'll create a `get()` function which will need
to return the RSS XML and the headers for the endpoint, the XML is
inside [template literals] so I can add in the dynamic data I want to
return later in this post:

```js
export async function get() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body: `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0"></rss>`
  }
}
```

In the `headers` I'm setting the [expiration] to an hour with
`s-maxage` and for the `body` adding in the XML heading. You can check
out the [W3C Feed Validation Service] for more detail on what's needed
here.

Now if I go check `localhost:3000/rss.xml` I get the beginning of my
RSS feed.

## Add `<channel>` required elements

Now to add in the `<channel>` element with the required `<title>`,
`<link>` and `<description>` elements. In Matt's template there's an
`info.js` file that contains the project `name` and `website` links.
I'll import these and hardcode in a description for now.

```js
import { name, website } from '$lib/info'

export async function get() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body: `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${name}</title>
        <link>${website}</link>
        <description>A blog built with SvelteKit about tech and stuff!</description>
      </channel>
    </rss>`
  }
}
```

## Add posts for the RSS feed

Now I'm going to need to add the posts to the RSS feed. I'm going to
copy the code used to source the posts from `src/routes/index.svelte`
and add it to the `src/lib` folder as `get-posts.js`.

```bash
# create the file
touch src/lib/get-posts.js
```

The code for get posts is:

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

I'll now import that into the `rss.xml.js` file so I can map over the
contents for each `<item>` in the RSS feed.

First up though, rather than have the return statement all cluttered
up with the generated XML I'll break this into it's own function:

```js
import { getPosts } from '$lib/get-posts'
import { name, website } from '$lib/info'

export async function get() {
  const posts = await getPosts()
  const body = xml(posts)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body
  }
}

const xml = (
  posts
) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
  </channel>
</rss>`
```

Now it's a case of mapping over the posts and creating the XML for
each post in posts. I'll do that in the template using tags `${}` and
mapping over the `posts` variable returned from `getPosts`.

Here's the complete file:

```js
import { getPosts } from '$lib/get-posts'
import { name, website } from '$lib/info'

export async function get() {
  const posts = await getPosts()
  const body = xml(posts)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }
  return {
    headers,
    body
  }
}

const xml = (
  posts
) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${name}</title>
    <link>${website}</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
      .map(
        (post) =>
          `
        <item>
          <title>${post.title}</title>
          <description>A blog built with SvelteKit about tech and stuff!</description>
          <link>${website}/posts/${post.slug}/</link>
          <pubDate>${new Date(post.date)}</pubDate>
          <content:encoded>${post.preview.html} 
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${website}/posts/${post.slug}">
                  Keep reading
                </a>
              </strong>  
            </div>
          </content:encoded>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`
```

You'll notice I've added some extra markup for `<content:encoded>` and
this uses Matt's handy package `remark-preview` to allow me to add
HTML to the RSS feed.

There's also a link to take the reader to the site's post via the
`post.slug` with some inline styling.

## Conclusion

Now if I go to `localhost:3000/rss.xml` I get a very reasonable RSS
feed that can be used to syndicate to other sites and RSS readers.

Although this is a very specific example I hope it's helped you
understand how you could do something similar with your own SvelteKit
project.

<!-- Links -->

[blog]: https://scottspence.com/posts
[sitemap generation for dynamic routes in nextjs with the sanity client]: https://scottspence.com/posts/dynamic-sitemap-generation-with-nextjs-and-sanity
[routing endpoints]: https://kit.svelte.dev/docs#routing-endpoints
[`https://scottspence.com/rss.xml`]: https://scottspence.com/rss.xml
[template from matt jennings]: https://github.com/mattjennings/sveltekit-blog-template
[expiration]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#expiration
[w3c feed validation service]: https://validator.w3.org/feed/docs/rss2.html
[template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
