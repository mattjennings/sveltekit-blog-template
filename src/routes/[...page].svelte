<script context="module">
  // how many blog posts per page
  const PAGE_SIZE = 1

  export const prerender = true

  export const load = async ({ page: { params } }) => {
    const page = parseInt(params.page) || 1

    const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
      // get post metadata
      .map(([, post]) => post.metadata)
      // sort by date
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((post, index, array) => {
        // next/previous posts
        const next = array[index - 1]
        const previous = array[index + 1]

        return {
          ...post,
          next,
          previous
        }
      })

    return {
      props: {
        posts: posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        page: page
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { format } from 'date-fns'
  import { name } from '$lib/info.js'

  export let posts
  export let page

  $: isFirstPage = page === 1
  $: hasNextPage = posts[posts.length - 1]?.previous
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
          <span>{post.readingTime.text}</span>
        </div>
        <div>{@html post.previewHtml}</div>
        <div class="flex justify-end w-full">
          <ButtonLink href={`/posts/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}

    <!-- pagination -->
    <div class="flex visible items-center justify-between pt-8">
      <!-- hide with visibility:false so that the layout doesn't shift -->
      <div class:invisible={isFirstPage} aria-hidden={isFirstPage}>
        <ButtonLink isBack href={`/${page - 1}`}>Previous</ButtonLink>
      </div>

      <div>
        <!-- only show on first page if there's more than 1 page -->
        {#if !isFirstPage || hasNextPage}
          Page {page}
        {/if}
      </div>

      <div class:invisible={!hasNextPage} aria-hidden={!hasNextPage}>
        <ButtonLink href={`/${page + 1}`}>Next</ButtonLink>
      </div>
    </div>
  </div>
</div>
