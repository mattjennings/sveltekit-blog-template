<script>
  import '../app.css'
  import '../prism.css'
  import 'focus-visible'
  import { MoonIcon, SunIcon } from '@mattjennings/heroicons-svelte/solid'
  import { browser } from '$app/env'
  import { name } from '$lib/info'

  let prefersLight = browser ? Boolean(JSON.parse(localStorage.getItem('prefersLight'))) : false
</script>

<div class="flex flex-col min-h-screen">
  <div class="mx-auto flex flex-col flex-grow w-full max-w-4xl">
    <div class="flex h-16 px-4 py-2 justify-between items-center">
      <h1 class="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
        <a href="/">{name}</a>
      </h1>
      {#if browser}
        <button
          type="button"
          role="switch"
          aria-label="Toggle Dark Mode"
          aria-checked={!prefersLight}
          class="h-4 w-4 sm:h-8 sm:w-8 sm:p-1"
          on:click={() => {
            prefersLight = !prefersLight
            localStorage.setItem('prefersLight', prefersLight.toString())

            if (prefersLight) {
              document.querySelector('html').classList.remove('dark')
            } else {
              document.querySelector('html').classList.add('dark')
            }
          }}
        >
          {#if prefersLight}
            <MoonIcon class="text-gray-500" />
          {:else}
            <SunIcon class="text-yellow-500" />
          {/if}
        </button>
      {/if}
    </div>
    <main
      class="flex flex-col w-full flex-grow prose prose-sm sm:prose lg:prose-lg dark:prose-dark py-4 px-4"
    >
      <slot />
    </main>
  </div>
</div>
