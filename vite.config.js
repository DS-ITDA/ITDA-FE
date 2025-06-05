import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
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
