import { page } from '$app/stores'
import { get } from 'svelte/store'

/**
 * Dynamically loads the svelte component for the post (only possible in +page.js)
 * and pass on the data from +page.server.js
 *
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ data }) {
  // load the markdown file based on slug
  const component = data.post.isIndexFile
    ? // vite requires relative paths and explicit file extensions for dynamic imports
      // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      await import(`../../../../posts/${data.post.slug}/index.md`)
    : await import(`../../../../posts/${data.post.slug}.md`)

  let showBack = false

  // this is a little hack to detect if the page has been navigated to
  // from another page on the site. if so, show the back button.
  try {
    showBack = Boolean(get(page).url)
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return {
    showBack,
    post: data.post,
    component: component.default
  }
}
