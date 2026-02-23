import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

// Custom banner plugin
function bannerPlugin() {
  return {
    name: 'banner-plugin',
    configureServer() {
      const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
      console.log('\n')
      console.log('╔══════════════════════════════════════════════════╗')
      console.log('║                                                  ║')
      console.log(`║              CONJINXTO v${pkg.version.padEnd(28)}║`)
      console.log('║          Word Similarity Game                    ║')
      console.log('║                                                  ║')
      console.log('╚══════════════════════════════════════════════════╝')
      console.log('\n')
    }
  }
}

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  plugins: [react(), bannerPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    port: 3000,
    open: true,
  },
})
