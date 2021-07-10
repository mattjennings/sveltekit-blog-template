import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import metaPlugin from './remark-plugins/blog-meta.js'
import videos from './remark-plugins/videos.js'
import relativeUrls from './remark-plugins/relative-urls.js'
import readingTime from 'remark-reading-time'
import preview, { textFormatter, htmlFormatter } from 'remark-preview'

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    readingTime(),
    preview(textFormatter({ length: 300, maxBlocks: 1 })),
    preview(
      htmlFormatter({
        length: 300,
        maxBlocks: 1
      }),
      {
        attribute: 'previewHtml'
      }
    ),
    metaPlugin,
    videos,
    relativeUrls
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
