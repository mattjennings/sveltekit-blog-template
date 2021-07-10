import { visit } from 'unist-util-visit'
import toCamel from 'just-camel-case'

// forgive me
const RE_SCRIPT_START = /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/
const RE_SRC = /src\s*=\s*"(.+?)"/

/**
 * Adds support for referencing images/videos relatively to the markdown file
 */
export default function relativeUrls() {
  return function transformer(tree) {
    const urls = new Map()
    const url_count = new Map()

    function transformUrl(url) {
      if (url.startsWith('.')) {
        let camel = toCamel(url)
        const count = url_count.get(camel)
        const dupe = urls.get(url)

        if (count && !dupe) {
          url_count.set(camel, count + 1)
          camel = `${camel}_${count}`
        } else if (!dupe) {
          url_count.set(camel, 1)
        }

        urls.set(url, {
          path: url,
          id: camel
        })

        return `{${camel}}`
      }

      return url
    }

    // transform urls in images
    visit(tree, 'image', (node) => {
      node.url = transformUrl(node.url)
    })

    // transform src in html nodes
    visit(tree, 'html', (node) => {
      if (node.value) {
        const [, url] = node.value.match(RE_SRC) ?? []
        if (url) {
          const transformed = transformUrl(url)
          node.value = node.value.replace(`"${url}"`, transformed)
        }
      }
    })

    let scripts = ''
    urls.forEach((x) => (scripts += `import ${x.id} from "${x.path}";\n`))

    let is_script = false

    visit(tree, 'html', (node) => {
      if (RE_SCRIPT_START.test(node.value)) {
        is_script = true
        node.value = node.value.replace(RE_SCRIPT_START, (script) => {
          return `${script}\n${scripts}`
        })
      }
    })

    if (!is_script) {
      tree.children.push({
        type: 'html',
        value: `<script>\n${scripts}</script>`
      })
    }
  }
}
