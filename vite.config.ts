import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rota-15-hackaton-prototipo/',
  plugins: [react(), tailwindcss()],
})

