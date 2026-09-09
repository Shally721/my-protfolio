import { defineConfig } from 'vite'

// Relative asset URLs keep the same build working at both the Vercel root
// domain and GitHub Pages' /my-protfolio/ subpath.
export default defineConfig({
  base: './',
})
