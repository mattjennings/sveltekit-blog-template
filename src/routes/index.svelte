<script context="module">
  const PAGE_SIZE = 5

  export const prerender = true

  export const load = async ({ page: { query }, fetch }) => {
    const currentPage = parseInt(query.get('page') ?? '1')

    return {
      props: {
        posts: await fetch(`/posts?page=${currentPage}&limit=${PAGE_SIZE}`).then((res) =>
          res.json()
        ),
        currentPage
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { format } from 'date-fns'
  import { page } from '$app/stores'

  export let posts
  export let currentPage
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-1"><a href={`/posts/${post.slug}`}>{post.title}</a></h1>
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime.text}</span>
        </div>
        <div>{@html post.previewHtml}</div>
        <div class="flex justify-end w-full">
          <ButtonLink sveltekit:prefetch href={`/posts/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
  <!-- pagination -->
  <div class="flex justify-between">
    {#if currentPage > 1}
      <ButtonLink isBack href={`${$page.path}?page=${currentPage - 1}`}>Back</ButtonLink>
    {:else}
      <div />
    {/if}
    {#if posts[posts.length - 1]?.previous}
      <ButtonLink href={`${$page.path}?page=${currentPage + 1}`}>Next</ButtonLink>
    {/if}
  </div>
</div>
