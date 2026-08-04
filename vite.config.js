import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Any build with a base other than '/' is the sandbox copy at
// marketbuzzr.com/new/ -- a near-duplicate of the live site on the same domain.
// Mark it noindex so it cannot compete with the real page in search results.
// Deliberately no matching robots.txt rule: a disallowed URL is never fetched,
// so the tag would never be read, and the bare URL could still be indexed from
// a link. noindex alone is the stronger of the two.
const noindexSandbox = () => {
  let base = '/'
  return {
    name: 'noindex-sandbox',
    configResolved: (config) => {
      base = config.base
    },
    transformIndexHtml: (html) =>
      base === '/'
        ? html
        : html.replace(
            '</head>',
            '  <meta name="robots" content="noindex" />\n  </head>'
          )
  }
}

// There was a preload-hero-image plugin here, and it is gone with the image it
// preloaded. The homepage hero is now an inline SVG (components/HeroAnimation),
// so there is no separate request to start early: it arrives inside the JS
// bundle and paints as soon as React mounts. That also settles mbz-et8e.34 --
// the hint lived in the shared index.html and so fired on every route, spending
// 81 KB on pages that never showed the image.

export default defineConfig({
  plugins: [react(), noindexSandbox()],
  server: { port: 5173 },
  base: '/'
})
