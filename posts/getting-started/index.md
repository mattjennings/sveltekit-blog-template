---
title: Getting Started
date: 2021-07-09
---

Thanks for checking out my blog template. It's based on the blog I built for my own [website](https://mattjennings.io) and I hope this is a good starting point for you to use for your own website.

Let's go over a few quick things:

- First things first, you should edit the `src/lib/info.js` file to contain your information. This will properly update the parts of the website that display your name and the SEO tags for your posts.

- This template uses the Vercel adapter, but feel free to remove or change it to whichever one you prefer.

  - It's worth noting that as of the time writing this post, there's [a bug causing FOUC on the post pages](https://github.com/sveltejs/kit/issues/1872) when deploying to Vercel. Hopefully this gets fixed soon.

- This template was built using `@sveltejs/kit@1.0.0-next.123`. I'll keep it updated when I can, but be aware that there things might break since SvelteKit is still in beta (like the above FOUC bug).

Now that that's out of the way, let's learn about how to make posts.
