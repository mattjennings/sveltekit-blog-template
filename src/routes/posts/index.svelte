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
  import PostPreview from '$lib/components/PostPreview.svelte'
  import { name } from '$lib/info.js'

  export let posts
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-slate-300 dark:divide-slate-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <PostPreview {post} />
      </div>
    {/each}
  </div>
</div>
