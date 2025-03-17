import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy: {
      '/login': 'http://localhost:8000/',
      '/signup': 'http://localhost:8000/',
      '/users': 'http://localhost:8000/',
      '/getmessage': 'http://localhost:8000/'
    } 
  },
  plugins: [react(
    {
      jsxImportSource: '@emotion/react',
    }
  )],
  // server: {
	// 	port: 3000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,      
  //       ws: true,
  //       configure: (proxy,) => {
  //         proxy.on('error', (err,) => {
  //           console.log('proxy error', err);
  //         });
  //         proxy.on('proxyReq', (req) => {
  //           console.log('Sending Request to the Target:', req.method, req.url);
  //         });
  //         proxy.on('proxyRes', (proxyRes, req) => {
  //           console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
  //         });
  //       },
  //     }
  //   },
  //   // proxy : {
  //   //   '/api': {
  //   //     target: 'http://localhost:8000',
  //   //     changeOrigin: true,
  //   //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   //   },
  //   // }
	// },
})
