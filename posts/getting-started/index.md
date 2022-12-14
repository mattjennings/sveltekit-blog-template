---
title: Getting Started
date: 2022-12-14
---

Thanks for checking out my blog template. It's based on the blog I built for my own [website](https://mattjennings.io) and I hope this is a good starting point for you to start yours.

Let's go over a few quick things:

- This template was built with `@sveltejs/kit@1.0.0`

- The theme of this blog is heavily borrowed from Tailwind's ["Spotlight" blog template](https://spotlight.tailwindui.com/). This is _not_ a port of that template, but the styling is pretty much the same.

- You should edit the `src/lib/info.js` file to contain your information. This will properly update the parts of the website that display your name, social links, and SEO (meta tags) for your posts.

Now that that's out of the way, let's learn about how to make posts.

## Creating a Post

All of your posts (including this one) are located in the `posts` folder. They are written in markdown and parsed with mdsvex. If you're unfamiliar with mdsvex, I would recommend [looking at the website](https://mdsvex.com/playground) to see what is all possible out of the box.

You can add a new post by creating either a new `.md` file or a folder with an `index.md` file:

```
/posts/my-first-post.md
/posts/my-first-post/index.md
```

Make sure your posts have `title` and `date` properties in the front matter:

```md
---
title: My First Post
date: 2021-07-09
preview: This text will be used for the preview instead of the first paragraph
---

(your content here)
```

The `preview` property is optional, in case you want to customize the preview text. If not provided, the first paragaph of your post will be used instead.

## Rendering Posts

Each individual post is rendered at `src/routes/post/[slug]`. You'll notice the route has 3 files:

```
-| +page.js
-| +page.server.js
-| +page.svelte
```

The metadata for the post is loaded in `+page.server.js`. It is then used in `+page.js` to import the post's markdown file. After that, both the post and its metadata are passed into `+page.svelte` to be rendered.

There are some basic meta tags setup for SEO and social media sharing, including a generated open graph image (courtesy of [og-image.vercel.app](https://og-image.vercel.app)).

![open-graph](https://og-image.vercel.app/**Getting%20Started**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg)

Feel free to customize this page as you see fit. I included some nice-to-haves like a table of contents and links to the next and/or previous posts.

## Getting Posts

Your posts can be retrieved via `import { posts } from '$lib/data/posts'`. They are automatically sorted from newest to oldest and contain the metadata for each post.

`$lib/data/posts` should only be imported in `*.server.js` files. It uses some APIs that only work server-side, so it will throw an error if you try to load it on client-side code. (It also is the data source for every post on your website, so you wouldn't want that being bundled with your client code anyways!)

If you wish to render an entire post, you will need to import the `.md` file directly (as done in `src/routes/post/[slug]/+page.js`).

## Theme

Most of the site is themed using Tailwind's [typography plugin](https://tailwindcss.com/docs/typography-plugin). You can view the configuration in `tailwind.config.cjs`. As mentioned at the beginning of this post, the overall theme is taken from [Tailwind's "Spotlight"](https://spotlight.tailwindui.com/).

If you wish to change the theme of your code blocks, you can edit the `src/prism.css` file. Prism themes can be [found here](https://github.com/PrismJS/prism-themes/tree/master/themes).

```javascript
function helloWorld() {
  return 'Hello World'
}
```

## Mdsvex Plugins

I've added some mdsvex plugins to support a few extra things (check out the `mdsvex.config.js` file).

### Videos

.mp4 and .webm videos are supported just like images.

```md
![my video](/videos/my-cool-video.mp4)
```

### Relative URLs for Images and Videos

The [mdsvex-relative-images](https://github.com/mattjennings/mdsvex-relative-images) plugin allows loading images or videos with a relative path. This is particularly nice for grouping images with the post under the same folder.

```md
![penguins](./penguins.mp4)
```

![penguins](./penguins.mp4)

## Deploying

You can deploy this like you would any other SvelteKit project. It uses the auto adapter by default.

[See the SvelteKit docs on adapters](https://kit.svelte.dev/docs/adapters)

## That's it!

I think I've covered most of the important stuff. If you have any questions, suggestions, or problems feel free to [open an issue](https://github.com/mattjennings/sveltekit-blog-template/issues).
