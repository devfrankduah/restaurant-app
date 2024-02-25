import { fileURLToPath, URL } from 'node:url'
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vitest',
        {
          pinia: ['defineStore', 'acceptHMRUpdate', 'getActivePinia'],
          '@tanstack/vue-query': [
            'useQuery',
            'useQueryClient',
            'useInfiniteQuery',
            'useQueries',
            'useMutation',
            'useMutationState'
          ],
          'vue-toastification': ['useToast']
        },
        {
          from: '@tanstack/vue-query',
          imports: ['UseQueryReturnType', 'UseMutationReturnType'],
          type: true
        },
        {
          from: "msw",
          imports: ["HttpHandler"],
          type: true
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/*', 'src/stores/*', 'src/utils/*'],
      vueTemplate: true
    })
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
