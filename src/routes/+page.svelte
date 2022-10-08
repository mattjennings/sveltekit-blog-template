<script>
  import PostPreview from '$lib/components/PostPreview.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { avatar, firstName, name } from '$lib/info.js'

  /** @type {import('./$types').PageData} */
  export let data

  const description = `\
    I’m ${firstName}, a software engineer based in Canada. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Phasellus accumsan quam at eros malesuada, id luctus lectus efficitur. Nulla
    sit amet arcu mi. Duis quis mauris malesuada, posuere orci et, pulvinar nisl. Nam malesuada
    vehicula sapien vitae sagittis.
  `
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={description} />
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
      <div class="flex gap-6 gradient">
        <SocialLinks />
      </div>
      <p class="text-base text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  </section>
  <section class="w-full">
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-16">
      {#each data.posts as post}
        <PostPreview {post} />
      {/each}
    </div>
  </section>
</div>
