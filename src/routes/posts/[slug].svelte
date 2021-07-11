<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: { params } }) {
    // get all posts
    const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
      .map(([, post]) => ({
        // frontmatter data
        metadata: post.metadata,

        // the processed Svelte component from the markdown file
        component: post.default
      }))
      .sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))

    const { slug } = params
    const index = posts.findIndex((post) => slug === post.metadata.slug)

    const { metadata, component } = posts[index]

    // next/previous posts
    const next = posts[index - 1]?.metadata
    const previous = posts[index + 1]?.metadata

    return {
      props: {
        component,
        ...metadata,
        next,
        previous
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

<article>
  <h1 class="!mt-0 !mb-1">{title}</h1>
  <div>
    <time datetime={new Date(date).toISOString()}>{format(new Date(date), 'MMMM d, yyyy')}</time>
    •
    <span>{readingTime.text}</span>
  </div>
  <svelte:component this={component} />
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
