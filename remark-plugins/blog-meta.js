import path from 'path'

/**
 * Adds some extra meta information for blog posts
 */
export default function blogMeta() {
  return (info, file) => {
    const parsed = path.parse(file.filename)

    file.data.fm = {
      ...file.data.fm,
      slug: parsed.name === 'index' ? path.parse(file.filename).dir.split('/').pop() : parsed.name,
      created: file.data.fm ? offsetTimezone(new Date(file.data.fm.created)) : undefined
    }
  }
}

function offsetTimezone(date) {
  return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
}
