import { visit } from 'unist-util-visit'

export default function rehypeStripRelativeExtensions (options = {}) {
  const extensions = new Set(
    (options.extensions ?? []).map(e => e.replace(/^\./, ''))
  )

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return

      const href = node.properties?.href
      if (typeof href !== 'string') return

      // ignore absolute URLs and protocol-relative URLs
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return
      }

      // split path from query/hash
      const match = href.match(/^([^?#]+)(\?[^#]*)?(#.*)?$/)
      if (!match) return

      const [, path, query = '', hash = ''] = match

      const segments = path.split('/')
      const last = segments[segments.length - 1]
      const dot = last.lastIndexOf('.')

      if (dot <= 0) return

      const ext = last.slice(dot + 1)
      if (!extensions.has(ext)) return

      segments[segments.length - 1] = last.slice(0, dot)

      node.properties.href = segments.join('/') + query + hash
    })
  }
}