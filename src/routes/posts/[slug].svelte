<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const { slug } = params

    const posts = await fetch('/posts.json').then((res) => res.json())
    const post = posts.find((post) => slug === post.slug)

    if (!post) {
      return {
        status: 404,
        error: 'Post not found'
      }
    }

    // get svelte component
    const component = await import(`../../../posts/${post.filename}`)

    return {
      props: {
        ...post,

        // the component for the post
        component: component.default
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { name, website } from '$lib/info'

  export let component

  // metadata
  export let title
  export let date
  export let preview
  export let readingTime
  export let slug
  export let next
  export let previous
  export let toc

  // generated open-graph image for sharing on social media. Visit https://og-image.vercel.app/ to see more options.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    title
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`

  const url = `${website}/${slug}`
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={preview} />
  <meta name="author" content={name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={preview} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={preview} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<article class="relative">
  <h1 class="!mt-0 !mb-2">{title}</h1>
  <div class="opacity-70">
    <time datetime={new Date(date).toISOString()}>{format(new Date(date), 'MMMM d, yyyy')}</time>
    •
    <span>{readingTime}</span>
  </div>

  <!-- render the post -->
  <div class="relative">
    <svelte:component this={component} />
    {#if toc.length}
      <div class="hidden xl:block absolute not-prose left-[100%]" aria-label="Table of Contents">
        <div class="fixed z-10 px-4 py-2 ml-8 top-20">
          <h2 class="uppercase text-slate-500/50 dark:text-slate-600 font-semibold text-sm">
            Sections
          </h2>

          <ul class="mt-2 !pl-0">
            {#each toc as section}
              <li class="list-none my-2 !pl-0 text-base text-slate-500/75 dark:text-slate-500">
                <a class="!no-underline" href={`#${section.id}`}>{section.title}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  </div>
</article>

<div class="pt-12 flex justify-between">
  {#if previous}
    <ButtonLink isBack href={`/posts/${previous.slug}`}>{previous.title}</ButtonLink>
  {:else}
    <div />
  {/if}
  {#if next}
    <ButtonLink href={`/posts/${next.slug}`}>{next.title}</ButtonLink>
  {/if}
</div>
