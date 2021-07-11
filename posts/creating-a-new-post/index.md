---
title: Creating a New Post
date: 2021-07-10
---

All of your posts (including this one) are located in `/posts`. You can add a new post by creating a new folder with an index.md file.

```
/posts/my-first-post/index.md
```

Each individual post is rendered at `src/routes/posts/[slug].svelte`. You can access all frontmatter data as props here. There's some basic SEO meta tags in there, including a generated open graph image for when you share a post on social media (courtesy of [og-image.vercel.app](https://og-image.vercel.app)).

![open-graph](https://og-image.vercel.app/**Creating%20a%20New%20Post**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg)

# Formatting

If you're unfamiliar with mdsvex, I would recommend [looking at the website](https://mdsvex.com/playground) to see what is all possible out of the box.

For code blocks, we use a slightly modified Night Owl theme. You can change the theme by editing `src/prism.css`.

```javascript
function helloWorld() {
  return 'Hello World'
}
```

# Styling

The styling for markdown is defined in `tailwind.config.cjs` using `@tailwindcss/typography`. You can read more about it [here](https://github.com/tailwindlabs/tailwindcss-typography).

# Mdsvex Plugins

I've added some mdsvex plugins to support a few extra things (check out the `mdsvex.config.js` file).

## Videos

![penguins](./penguins.mp4)

## Relative Images and Videos

The [mdsvex-relative-images](https://github.com/mattjennings/mdsvex-relative-images) plugin allows us to load images or videos using a relative URL. This is particularly nice for keeping used images with your posts, rather than needing to put them in `/static`.

```
![penguins](./penguins.mp4)
```

## Reading Time

The [remark-reading-time](https://github.com/mattjennings/remark-reading-time) plugin adds the estimated reading time to your post, available in the frontmatter.

## Preview

The [remark-preview](https://github.com/mattjennings/remark-preview) plugin provides snippets for each post in the frontmatter. I have it configured so the `preview` frontmatter property contains plain-text (which we use for SEO), and `previewHtml` contains formatted HTML (which we use to preview to the user).

Feel free to look at the docs for remark-preview as there are a few ways you can customize it.
