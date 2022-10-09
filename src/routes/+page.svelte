<script>
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostDate from '$lib/components/PostDate.svelte'
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

<div class="flex flex-col flex-grow gap-8 pb-16 ">
  <!-- bio -->
  <section class="flex flex-col items-center gap-16 py-16">
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
    <div class="flex items-baseline justify-between gap-4 mb-8">
      <h2 class="text-xl opacity-75">Recent Articles</h2>
      <a href="/posts" class="flex items-center gap-1 text-xs font-medium text-teal-500"
        >View All <ArrowRightIcon class="w-4 h-4" /></a
      >
    </div>
    <div
      class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      {#each data.posts as post}
        <article class="grid items-start grid-cols-4 gap-8">
          <PostDate class="flex-col hidden md:flex" {post} />

          <div class="col-span-4 md:col-span-3">
            <PostPreview {post}>
              <slot slot="eyebrow">
                <PostDate class="md:hidden" {post} collapsed decorate />
              </slot>
            </PostPreview>
          </div>
        </article>
      {/each}
    </div>
  </section>
</div>
