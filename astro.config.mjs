import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH ถูกส่งมาจาก GitHub Actions (actions/configure-pages)
// ตอนรันในเครื่องจะใช้ค่า default ด้านล่าง
const rawBase = process.env.BASE_PATH ?? '/';
const base = rawBase.replace(/\/+$/, '') || '/';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://example.github.io',
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    server: {
      // Windows watcher ในเครื่องนี้ไม่จับการเปลี่ยนแปลงไฟล์ — ใช้ polling แทน
      watch: { usePolling: true, interval: 400 },
    },
  },
});
