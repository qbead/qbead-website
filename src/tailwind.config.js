/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '-1',
            a: { color: '-1' },
            strong: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
            blockquote: { color: 'inherit' },
            figcaption: { color: 'inherit' },
            thead: { color: 'inherit', th: { color: 'inherit' } },
            'ol > li::marker': { color: 'inherit' },
            'ul > li::marker': { color: 'inherit' },
            maxWidth: '-1',
          },
        },
      },
    },
  },
}
