---
title: Getting Started
date: 2022-01-08
---

Thanks for checking out my blog template. It's based on the blog I built for my own [website](https://mattjennings.io) and I hope this is a good starting point for you to start yours.

Let's go over a few quick things:

- First things first, you should edit the `src/lib/info.js` file to contain your information. This will properly update the parts of the website that display your name and the SEO tags for your posts.

- This template is configured to use the static adapter. If you intend to add SSR you will need to change it to something like `@sveltejs/adapter-node` or your preferred hosting adapter (vercel, netlify, etc).

- This template was built using `@sveltejs/kit@1.0.0-next.218`. I'll keep it updated when I can, but be aware that there things might break since SvelteKit is still in beta.

Now that that's out of the way, let's learn about how to make posts.

---

## Creating a Post

All of your posts (including this one) are located in `/posts`. They are written in markdown and parsed with mdsvex. If you're unfamiliar with mdsvex, I would recommend [looking at the website](https://mdsvex.com/playground) to see what is all possible out of the box.

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

The `preview` property is optional, in case you want to customize the preview text. If the property is added, but the text is left empty, the first paragraph is used automatically.

---

## Rendering Posts

Each individual post is rendered at `src/routes/posts/[slug].svelte`. You'll notice the `load` function fetches the post by slug, and then dynamically imports the appropriate .md file.

There are some basic meta tags setup for SEO and social media sharing, including a generated open graph image (courtesy of [og-image.vercel.app](https://og-image.vercel.app)).

![open-graph](https://og-image.vercel.app/**Getting%20Started**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg)

Feel free to customize this page as you see fit. I included some nice-to-haves like a table of contents and links to the next and/or previous posts.

---

## Fetching Posts

You should fetch posts by using the `/posts.json` endpoint in your pages. For anything server-side (such as other endpoints), you can use the `getPosts` function in `$lib/get-posts.js` as it will not work on the client (the endpoint is a wrapper over that function).

### Why doesn't `getPosts` work on the client?

`getPosts` fetches all posts and adds extra metadata (such as a preview and estimated reading time). In order to parse some of that metadata, it uses server-side only APIs. If you try to use `getPosts` on the client it will throw an error, advising you to fetch from the endpoint instead.

Hopefully I can find a way to make this function isomorphic. If you have an idea how, please reach out!

---

## Theme

Most of the site is themed using tailwind's [typography plugin](https://tailwindcss.com/docs/typography-plugin). You can the configuration for it in `tailwind.config.cjs`

For code blocks it uses a slightly modified Night Owl theme. You can change the theme by editing `src/prism.css`, or [replacing it with one of the many available themes](https://github.com/PrismJS/prism-themes/tree/master/themes).

```javascript
function helloWorld() {
  return 'Hello World'
}
```

---

## Mdsvex Plugins

I've added some mdsvex plugins to support a few extra things (check out the `mdsvex.config.js` file).

### Videos

.mp4 and .webm videos are supported

```md
![my video](/videos/my-cool-video.mp4)
```

### Relative URLs for Images and Videos

The [mdsvex-relative-images](https://github.com/mattjennings/mdsvex-relative-images) plugin allows loading images or videos with a relative path. This is particularly nice for grouping images with the post under the same folder.

```md
![penguins](./penguins.mp4)
```

![penguins](./penguins.mp4)

---

## Deploying

You can deploy this like you would any other SvelteKit project. I chose to use the static adapter by default so you can `npm run build` and serve the `public` folder on your host of choice. Feel free to change the adapter if you want.

---

## That's it!

I think I've covered most of the important stuff. If you have any questions, suggestions, or problems feel free to [open an issue](https://github.com/mattjennings/sveltekit-blog-template/issues).
