<script context="module">
  import { isBefore } from 'date-fns'

  const PAGE_SIZE = 10

  const allPosts = Object.entries(import.meta.globEager('../../posts/**/*.md'))
    .map(([, post]) => post.metadata)
    .filter((post) => isBefore(new Date(post.created), new Date()))
    .sort((a, b) => (a.created < b.created ? 1 : -1))

  export const prerender = true

  export const load = async ({ page: { query } }) => {
    const page = parseInt(query.get('page') ?? '1')

    return {
      props: {
        posts: allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        page
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { format } from 'date-fns'

  export let posts
  export let page
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-1"><a href={`/${post.slug}`}>{post.title}</a></h1>
          <time>{format(new Date(post.created), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime.text}</span>
        </div>
        <div>{@html post.previewHtml}</div>
        <div class="flex justify-end w-full">
          <ButtonLink sveltekit:prefetch href={`/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
  <!-- pagination -->
  <div class="flex justify-between">
    {#if page > 1}
      <ButtonLink isBack href={`/?page=${page - 1}`}>Back</ButtonLink>
    {:else}
      <div />
    {/if}
    {#if posts.length === PAGE_SIZE}
      <ButtonLink href={`/?page=${page + 1}`}>Next</ButtonLink>
    {/if}
  </div>
</div>
