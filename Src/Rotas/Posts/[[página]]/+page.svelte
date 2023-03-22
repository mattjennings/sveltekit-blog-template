<script>
  import { name } from '$lib/info.js'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostsList from '$lib/components/PostsList.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.posts[data.posts.length - 1]?.previous
  
  let searchTerm = ''
  let isSearching = false
  let filteredPosts = []
  let isLoading

  $: {
    isSearching = searchTerm !== ''
    if (isSearching) {
      isLoading = true

      setTimeout(() => {
        filteredPosts = data.posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        isLoading = false
      }, 2000)
    } else {
      filteredPosts = data.posts
    }
  }
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <header class="pt-4">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
      Writing on tech, music, and whatever else I feel like
    </h1>
    <p class="mt-6">All of my written content collected in one place</p>
  </header>

  <div class="mt-8 relative">
    {#if isLoading === true}
      <div aria-label="Loading..." role="status" class="absolute  right-4  mt-3">
        <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
          <path
            class="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          />
          <path
            class="fill-teal-500"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          />
        </svg>
      </div>
    {/if}
    <input
      type="text"
      placeholder="Search posts..."
      class="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500"
      bind:value={searchTerm}
    />
  </div>

  {#if filteredPosts.length === 0 && isSearching}
    <p class="mt-12 text-center text-gray-600 text-xl">Post não encontrado</p>
  {:else}
    <div class="mt-16 sm:mt-20">
      <PostsList posts={filteredPosts} />
    </div>
  {/if}

  <!-- pagination -->
  <div class="flex items-center justify-between pt-16 pb-8">
    {#if !isFirstPage}
      <a href={`/posts/${data.page - 1}`} data-sveltekit-prefetch>
        <ArrowLeftIcon class="w-4 h-4" />
        Previous
      </a>
    {:else}
      <div />
    {/if}

    {#if hasNextPage}
      <a href={`/posts/${data.page + 1}`} data-sveltekit-prefetch
        >Next
        <ArrowRightIcon class="w-4 h-4" />
      </a>
    {/if}
  </div>
</div>

<style>
  a {
    @apply flex items-center gap-2 font-medium text-zinc-700;
  }

  :global(.dark) a {
    @apply text-zinc-300;
  }
</style>
