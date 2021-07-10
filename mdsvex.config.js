import path from 'path'
import { visit } from 'unist-util-visit'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
import readingTime from 'remark-reading-time'
import preview, { textFormatter, htmlFormatter } from 'remark-preview'

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    // adds a `readingTime` frontmatter attribute
    readingTime(),

    // Add a text preview snippet (no formatting) so we can use it in the meta description tag
    preview(textFormatter({ length: 300, maxBlocks: 1 })),

    // Add an HTML preview snippet (formatted) so we can use it when displaying all posts
    preview(
      htmlFormatter({
        length: 300,
        maxBlocks: 1
      }),
      {
        attribute: 'previewHtml'
      }
    ),
    postsMeta,
    videos,
    relativeImages
  ],
  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
}

/**
 * Adds some extra meta information for posts
 */
function postsMeta() {
  function offsetTimezone(date) {
    return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
  }
  return (tree, file) => {
    const parsed = path.parse(file.filename)

    file.data.fm = {
      ...file.data.fm,
      slug: parsed.name === 'index' ? path.parse(file.filename).dir.split('/').pop() : parsed.name,
      created: file.data.fm ? offsetTimezone(new Date(file.data.fm.created)) : undefined
    }
  }
}

/**
 * Adds support to video files in markdown image links
 */
function videos() {
  const extensions = ['mp4', 'webm']
  return function transformer(tree) {
    visit(tree, 'image', (node) => {
      if (extensions.some((ext) => node.url.endsWith(ext))) {
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
