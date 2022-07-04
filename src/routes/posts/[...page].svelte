<script>
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'

  import ButtonLink from '$lib/components/ButtonLink.svelte'

  import PostPreview from '$lib/components/PostPreview.svelte'
  import { name } from '$lib/info.js'

  export let posts
  export let page

  $: isFirstPage = page === 1
  $: hasNextPage = posts[posts.length - 1]?.previous
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-slate-300 dark:divide-slate-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <PostPreview {post} />
      </div>
    {/each}
  </div>

  <!-- pagination -->
  <div class="flex visible items-center justify-between pt-8 opacity-70">
    {#if !isFirstPage}
      <ButtonLink raised={false} href={`/posts/page/${page - 1}`}>
        <slot slot="icon-start">
          <ArrowLeftIcon class="h-5 w-5" />
        </slot>
        Previous
        <slot slot="icon-end" /></ButtonLink
      >
    {:else}
      <div />
    {/if}

    {#if hasNextPage}
      <ButtonLink raised={false} href={`/posts/page/${page + 1}`}>Next</ButtonLink>
    {/if}
  </div>
</div>
