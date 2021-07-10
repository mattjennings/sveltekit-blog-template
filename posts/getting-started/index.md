---
title: Getting Started
created: 2021-07-09
---

Let's go over some of the features included in this blog template.

# Posts

All of your posts (including this one) are located in /posts. You can add a new post by creating a new .md file, or a new folder with an index.md file.

```
/posts/my-first-post.md
```

```
/posts/my-first-post/index.md
```

The latter approach is particularly helpful if you are including images or other assets in that post (more on that later).

These posts are rendered at `src/routes/[slug].svelte` route. If you intend on adding more pages into this template, such as a portfolio page, it may be best to move `src/routes/index.svelte` and `src/routes/[slug].svelte` under `src/routes/blog`.
