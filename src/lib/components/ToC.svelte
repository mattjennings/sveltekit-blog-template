<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import Card from './Card.svelte'

  export let allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  export let activeHeading = null

  let scrollY
  let headings = []

  function updateHeadings() {
    const nodes = [
      ...document.querySelectorAll(`article :where(${allowedHeadings.join(', ')}):not(#__sections)`)
    ]
    const depths = nodes.map((node) => Number(node.nodeName[1]))
    const minDepth = Math.min(...depths)

    headings = nodes.map((node, idx) => ({
      title: node.innerText,
      depth: depths[idx] - minDepth,
      node
    }))

    // set first heading as active if null on page load
    if (activeHeading === null) {
      activeHeading = headings[0]
    }
  }

  onMount(() => {
    updateHeadings()
    setActiveHeading()
  })

  if (typeof window !== 'undefined') {
    page.subscribe(() => {
      updateHeadings()
      setActiveHeading()
    })
  }

  function setActiveHeading() {
    scrollY = window.scrollY

    const visibleIndex =
      headings.findIndex(
        (heading) => heading.node.offsetTop + heading.node.clientHeight > scrollY
      ) - 1

    activeHeading = headings[visibleIndex]

    const pageHeight = document.body.scrollHeight
    const scrollProgress = (scrollY + window.innerHeight) / pageHeight
    if (scrollProgress > 0.999) {
      activeHeading = headings[headings.length - 1]
    }

    if (!activeHeading) {
      activeHeading = headings[0]
    }
  }
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
  <slot slot="description">
    <ul class="flex flex-col gap-2">
      {#each headings as heading}
        <li
          class="pl-2 transition-colors border-teal-500 text-zinc-400 dark:text-zinc-600"
          class:active={activeHeading?.node === heading.node}
          style={`--depth: ${
            // consider h1 and h2 at the same depth, as h1 will only be used for page title
            Math.max(0, heading.depth - 1)
          }`}
        >
          <a href={`#${heading.node.id}`}>{heading.title}</a>
        </li>
      {/each}
    </ul>
  </slot>
</Card>

<style lang="postcss">
  .heading {
    margin-left: calc(var(--depth, 0) * 0.75rem);
  }

  .active {
    @apply font-medium text-slate-900 border-l-2 -ml-0.5;
  }

  /* can't use dark: modifier in @apply */
  :global(.dark) .active {
    @apply text-slate-100;
  }
</style>
