import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    [
      preprocess({
        postcss: true
      })
    ]
  ],

  kit: {
    target: '#svelte',
    adapter: adapter({
      pages: 'public',
      assets: 'public'
    }),
    vite: {
      server: {
        fs: {
          allow: ['./posts']
        }
      }
    }
  }
}

export default config
