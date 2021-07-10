import { visit } from 'unist-util-visit'

/**
 * Adds support to video files in markdown image links
 */
export default function videos(options = {}) {
  return function transformer(tree, file) {
    visit(tree, 'image', (node, index, parent) => {
      if (node.url.endsWith('mp4')) {
        node.type = 'html'
        node.value = `
            <video 
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            />
          `
      }
    })
  }
}
