<script>
  import ArrowRightIcon from './ArrowRightIcon.svelte'

  export let href
  export let raised = true
  export let size = 'medium' // small, medium, or large

  let className = ''

  export { className as class }
</script>

<div class="not-prose">
  <a
    {...$$restProps}
    {href}
    class={'block text-slate-800 dark:text-slate-200 dark:text-opacity-90 rounded-md no-underline ' +
      className}
    class:small={size === 'small'}
    class:medium={size === 'medium'}
    class:large={size === 'large'}
    class:raised
  >
    <div class="flex items-center space-x-1">
      <slot name="icon-start" />
      <span>
        <slot />
      </span>
      <slot name="icon-end">
        <ArrowRightIcon class="h-5 w-5" />
      </slot>
    </div>
  </a>
</div>

<style lang="postcss">
  .small {
    @apply text-sm font-medium;
  }

  .small.raised {
    @apply px-2 py-1;
  }

  .medium {
    @apply text-base;
  }

  .medium.raised {
    @apply px-3 py-1;
  }

  .large {
    @apply text-lg;
  }

  .large.raised {
    @apply px-4 py-2;
  }

  .raised {
    @apply bg-slate-300;
  }

  :global(.dark) .raised {
    @apply bg-slate-700;
  }
</style>
