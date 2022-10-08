<script>
  import '../app.css'
  import '../prism.css'
  import 'focus-visible'
  import MoonIcon from 'heroicons-svelte/solid/MoonIcon.svelte'
  import SunIcon from 'heroicons-svelte/solid/SunIcon.svelte'
  import { browser } from '$app/environment'
  import { name } from '$lib/info'

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }
</script>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <header class="flex items-center justify-between w-full max-w-6xl py-4 mx-auto">
      <h2 class="gradient ">
        <a class="text-lg font-bold sm:text-2xl" href="/">
          {name}
        </a>
      </h2>
      <button
        type="button"
        role="switch"
        aria-label="Toggle Dark Mode"
        aria-checked={isDarkMode}
        class="w-4 h-4 sm:h-8 sm:w-8 sm:p-1"
        on:click={() => {
          isDarkMode = !isDarkMode
          localStorage.setItem('isDarkMode', isDarkMode.toString())

          disableTransitionsTemporarily()

          if (isDarkMode) {
            document.querySelector('html').classList.add('dark')
          } else {
            document.querySelector('html').classList.remove('dark')
          }
        }}
      >
        <MoonIcon class="hidden text-slate-500 dark:block" />
        <SunIcon class="block text-slate-400 dark:hidden" />
      </button>
    </header>
    <main class="flex flex-col flex-grow w-full max-w-6xl mx-auto">
      <slot />
    </main>
  </div>
</div>
