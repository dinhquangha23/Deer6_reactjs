import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
    "process.env.VITE_APP_API":JSON.stringify(import.meta.env.VITE_APP_API)
  },
})
