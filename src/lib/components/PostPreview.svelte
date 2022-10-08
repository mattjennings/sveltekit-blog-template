<script>
  import { format, parseISO } from 'date-fns'
  import Card from './Card.svelte'
  import ArrowRightIcon from './ArrowRightIcon.svelte'

  export let post
</script>

<Card href={`/posts/${post.slug}`} data-sveltekit-prefetch eyebrow={{ as: 'time', decorate: true }}>
  <slot slot="title">{post.title}</slot>
  <div slot="eyebrow">
    <time dateTime={post.date}>
      {format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}
    </time>
    <span class="mx-1">•</span>
    <span>{post.readingTime}</span>
  </div>

  <div slot="description" class="prose description dark:prose-invert">
    {@html post.preview.html}
  </div>
  <div slot="actions">
    <div class="flex items-center text-teal-500">
      <span class="text-sm font-medium">Read</span>
      <ArrowRightIcon class="w-4 h-4 ml-1" />
    </div>
  </div>
</Card>

<style>
  :global(.description > p) {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
