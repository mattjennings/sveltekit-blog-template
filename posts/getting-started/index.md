---
title: Getting Started
date: 2021-07-09
---

Thanks for checking out my blog template. It's based on the blog I built for my own [website](https://mattjennings.io) and I hope this is a good starting point for you to start yours.

Let's go over a few quick things:

- First things first, you should edit the `src/lib/info.js` file to contain your information. This will properly update the parts of the website that display your name and the SEO tags for your posts.

- This template is configured to use the static adapter. If you intend to add SSR you will need to change it to something like `@sveltejs/adapter-node` or your preferred hosting adapter (vercel, netlify, etc).

- This template was built using `@sveltejs/kit@1.0.0-next.123`. I'll keep it updated when I can, but be aware that there things might break since SvelteKit is still in beta.

Now that that's out of the way, let's learn about how to make posts.

# Creating a Post

All of your posts (including this one) are located in `/posts`. You can add a new post by creating a new folder with an index.md file.

```
/posts/my-first-post/index.md
```

Make sure your posts have `title` and `date` properties in the frontmatter.

```md
---
title: My First Post
date: 2021-07-09
---

(your content here)
```

Each individual post is rendered at `src/routes/posts/[slug].svelte`. You can access all frontmatter data as props here. You'll notice some basic meta tags setup for SEO and social media sharing, including a generated open graph image (courtesy of [og-image.vercel.app](https://og-image.vercel.app)).

![open-graph](https://og-image.vercel.app/**Getting%20Started**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg)

If you're unfamiliar with mdsvex, I would recommend [looking at the website](https://mdsvex.com/playground) to see what is all possible out of the box.

# Theme

For code blocks, it uses a slightly modified Night Owl theme. You can change the theme by editing `src/prism.css`, or [replacing it with one of the many available themes](https://github.com/PrismJS/prism-themes/tree/master/themes).

```javascript
function helloWorld() {
  return 'Hello World'
}
```

The styling for the rest of the markdown content is in `tailwind.config.cjs` using `@tailwindcss/typography`. You can read more about it [here](https://github.com/tailwindlabs/tailwindcss-typography).

# Plugins

I've added some mdsvex plugins to support a few extra things (check out the `mdsvex.config.js` file).

## Videos

![penguins](./penguins.mp4)

## Relative Images and Videos

The [mdsvex-relative-images](https://github.com/mattjennings/mdsvex-relative-images) plugin allows us to load images or videos using a relative URL. This is particularly nice for keeping images grouped with their post folder, rather than needing to put them in `/static`.

```md
![penguins](./penguins.mp4)
```

## Reading Time

[remark-reading-time](https://github.com/mattjennings/remark-reading-time) adds the estimated reading time to the post's frontmatter.

## Preview

[remark-preview](https://github.com/mattjennings/remark-preview) provides snippets for each post in their frontmatter. I have it configured so the `preview` frontmatter property contains plain-text (which we use for SEO), and `previewHtml` contains formatted HTML (which we use to preview to the user).

Feel free to look at the docs for remark-preview as there are a few ways you can customize it.

# That's it!

I think I've covered most of the important stuff. If you have any questions, suggestions, or problems feel free to [open an issue](https://github.com/mattjennings/sveltekit-blog-template/issues).
