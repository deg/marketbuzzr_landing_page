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

// The hero image is the LCP element, but this is a client-rendered app: the
// <img> does not exist in the served HTML, so the browser's preload scanner
// cannot see it and the request only starts once the JS bundle has downloaded,
// parsed and rendered. Measured on the sandbox, the bundle ran 420-696ms and the
// image did not start until 734ms -- roughly 300ms of pure waiting.
//
// A preload hint in the HTML lets the scanner start it immediately, in parallel
// with the JS. The filename is content-hashed, so it has to be read out of the
// bundle at build time rather than hard-coded.
//
// Declared as image/avif on purpose: a browser without AVIF support ignores the
// hint and takes the WebP from <picture> as usual, rather than downloading a
// format it cannot use.
const preloadHeroImage = () => {
  let base = '/'
  return {
    name: 'preload-hero-image',
    enforce: 'post',
    configResolved: (config) => {
      base = config.base
    },
    transformIndexHtml: (html, ctx) => {
      if (!ctx.bundle) return html // dev server: nothing is hashed yet
      const hero = Object.keys(ctx.bundle).find(
        (file) => file.includes('hero-dashboard') && file.endsWith('.avif')
      )
      if (!hero) return html
      return html.replace(
        '</head>',
        `  <link rel="preload" as="image" type="image/avif" href="${base}${hero}" fetchpriority="high" />\n  </head>`
      )
    }
  }
}

export default defineConfig({
  plugins: [react(), noindexSandbox(), preloadHeroImage()],
  server: { port: 5173 },
  base: '/'
})
