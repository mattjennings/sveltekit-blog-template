<script>
  import { format, parseISO } from 'date-fns'

  export let decorate
  export let post
  export let collapsed = false

  let _class
  export { _class as class }
</script>

<div
  class={['relative z-10 order-first mb-3 flex text-zinc-500 dark:text-zinc-400', _class].join(' ')}
  class:pl-3.5={decorate}
>
  {#if decorate}
    <span class="absolute inset-y-0 left-0 flex items-center py-1" aria-hidden="true">
      <span class="h-full w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
    </span>
  {/if}
  <div class="flex" class:flex-col={!collapsed}>
    <time datetime={post.date}>
      {format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}
    </time>
    {#if collapsed}
      <span class="mx-1">•</span>
    {/if}
    <span>{post.readingTime}</span>
  </div>
</div>
