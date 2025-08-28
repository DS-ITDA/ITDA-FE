import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicons/favicon.ico',
        'favicons/apple-touch-icon.png',
        'favicons/favicon-96x96.png',
        'favicons/favicon.svg',
      ],
      manifest: {
        name: '잇다:그리움을곁에잇다',
        short_name: '잇다:그리움을곁에잇다',
        description: '잇다:그리움을곁에잇다',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@context', replacement: '/src/context' },
      { find: '@data', replacement: '/src/data' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@ai', replacement: '/src/pages/ai' },
      { find: '@createStory', replacement: '/src/pages/createStory' },
      { find: '@editStory', replacement: '/src/pages/editStory' },
      { find: '@home', replacement: '/src/pages/home' },
      { find: '@interview', replacement: '/src/pages/interview' },
      { find: '@login', replacement: '/src/pages/login' },
      { find: '@mypage', replacement: '/src/pages/mypage' },
      { find: '@readStory', replacement: '/src/pages/readStory' },
      { find: '@view', replacement: '/src/pages/view' },
    ],
  },
});
