<script context="module">
  import { isBefore } from 'date-fns'

  const PAGE_SIZE = 10

  const allPosts = Object.entries(import.meta.globEager('/posts/**/*.md'))
    .map(([, post]) => post.metadata)
    .filter((post) => isBefore(new Date(post.created), new Date()))
    .sort((a, b) => (a.created < b.created ? 1 : -1))

  export const prerender = true

  export const load = async ({ page: { query } }) => {
    const currentPage = parseInt(query.get('page') ?? '1')

    return {
      props: {
        posts: allPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
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

  function getPostUrl(post) {
    const path = $page.path.endsWith('/') ? $page.path : $page.path + '/'

    return path + post.slug
  }
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-1"><a href={getPostUrl(post)}>{post.title}</a></h1>
          <time>{format(new Date(post.created), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime.text}</span>
        </div>
        <div>{@html post.previewHtml}</div>
        <div class="flex justify-end w-full">
          <ButtonLink sveltekit:prefetch href={getPostUrl(post)}>Read More</ButtonLink>
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
    {#if posts.length === PAGE_SIZE}
      <ButtonLink href={`${$page.path}?page=${currentPage + 1}`}>Next</ButtonLink>
    {/if}
  </div>
</div>
