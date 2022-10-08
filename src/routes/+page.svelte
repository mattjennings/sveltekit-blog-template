<script>
  import PostPreview from '$lib/components/PostPreview.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { avatar, bio, name } from '$lib/info.js'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<div class="flex flex-col flex-grow gap-8 pb-16">
  <!-- bio -->
  <section class="flex flex-col items-center max-w-2xl gap-16 py-16 mx-auto">
    <div class="flex flex-col items-center w-full gap-6 rounded-lg">
      <img
        src={avatar}
        alt={name}
        class="mx-auto rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700"
      />
      <div class="flex gap-6">
        <SocialLinks />
      </div>
      <p class="text-base text-zinc-600 dark:text-zinc-400">
        {bio}
      </p>
    </div>
  </section>
  <section class="w-full">
    <div class="grid grid-cols-1 gap-16 mt-4 sm:grid-cols-2">
      {#each data.posts as post}
        <PostPreview {post} />
      {/each}
    </div>
  </section>
</div>
