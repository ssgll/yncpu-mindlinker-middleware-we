/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // 可以在这里添加其他环境变量的类型定义
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}