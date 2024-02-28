import { createApp } from "vue"
import { VueQueryPlugin } from "@tanstack/vue-query"
export function withSetup<T>(composable: () => T): [T, ReturnType<typeof createApp>] {
  let result!: T
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })
  app.use(VueQueryPlugin)
  app.mount(document.createElement("div"))
  return [result, app]
}