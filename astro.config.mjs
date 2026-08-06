import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cryptvews.com',
  output: 'static',
  server: {
    host: true,
    port: 4323,
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
