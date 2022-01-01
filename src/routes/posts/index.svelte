<script context="module">
  export const prerender = true

  export const load = async ({ fetch }) => {
    return {
      props: {
        posts: await fetch('/posts.json').then((res) => res.json())
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { name } from '$lib/info.js'
  import { format } from 'date-fns'

  export let posts
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-1">
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </h1>
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime}</span>
        </div>
        <div>{@html post.preview.html}</div>
        <div class="flex justify-end w-full">
          <ButtonLink href={`/posts/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
</div>
