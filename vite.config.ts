import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to watch prd.json and trigger HMR
const prdWatcher = (): Plugin => {
  let timer: NodeJS.Timeout | null = null;
  return {
    name: 'prd-watcher',
    configureServer(server) {
      server.watcher.add('public/prd.json');
      server.watcher.on('change', (file) => {
        if (file.endsWith('prd.json')) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            console.log('prd.json changed, sending update event...');
            server.ws.send({
              type: 'custom',
              event: 'prd-update',
            });
            timer = null;
          }, 100);
        }
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prdWatcher()],
})
