import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss ()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ các máy khác trong mạng
    port: 5173,       // (tùy chọn) cổng mặc định của Vite
  },
})
