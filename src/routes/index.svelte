<script context="module">
  export const prerender = true

  export const load = async ({ fetch }) => {
    return {
      props: {
        recentPosts: await fetch('/posts.json?limit=2').then((res) => res.json())
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { name } from '$lib/info.js'
  import { format } from 'date-fns'

  export let recentPosts
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <!-- replace with a bio about you, or something -->
  <div class="flex flex-col text-xl">
    <p class="!m-0">
      This is a <a href="https://github.com/mattjennings/sveltekit-blog-template"
        >SvelteKit blog template</a
      >
      by
      <a href="https://mattjennings.io">Matt Jennings</a>
    </p>
  </div>

  <!-- recent posts -->
  <h2 class="flex flex-col">
    Recent Posts
    <a class="text-xs ml-0.5 mt-1 opacity-75" href="/posts"
      >View All
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="inline h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </h2>
  <div class="grid gap-4 grid-cols-1">
    {#each recentPosts as post}
      <div class="flex flex-col p-4 border border-gray-300 dark:border-gray-800 rounded-lg">
        <div>
          <h2 class="!mt-0 !mb-1">
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </h2>
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime}</span>
        </div>
        <div class="flex-1">{@html post.preview.html}</div>
        <div class="flex justify-end w-full">
          <ButtonLink href={`/posts/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
</div>
