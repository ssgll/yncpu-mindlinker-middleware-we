# MindLinker 中间件前端

这是一个基于 Vue 3 + TypeScript + Vite 构建的前端项目，用于与 MindLinker 后端服务进行交互。

## 项目介绍

该项目实现了完整的SSO登录流程：
1. 用户访问首页自动跳转到SSO登录页面
2. SSO登录完成后回调到/callback页面
3. Callback页面获取用户信息后跳转到目标链接

## 技术栈

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite
- Axios (HTTP 客户端)
- Vue Router

## 环境配置

项目使用 `.env` 文件配置 API 基础 URL：
```
VITE_API_BASE_URL=http://127.0.0.1:8081
```

Vite 配置了代理，将 `/api` 请求转发到后端服务。

## 项目结构

```
src/
├── api/           # API 接口定义
├── router/        # 路由配置
├── view/          # 页面组件
│   ├── LoginPage.vue    # 登录页面（自动跳转到SSO）
│   └── CallbackPage.vue # 回调页面（处理登录结果）
├── App.vue        # 根组件
└── main.ts        # 应用入口
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认情况下，应用将在 http://localhost:5174 上运行。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## Docker 部署

### 构建 Docker 镜像

```bash
docker build -t mindlinker-frontend .
```

### 运行容器

```bash
docker run -d -p 9999:9999 --name mindlinker-app mindlinker-frontend
```

访问 http://localhost:9999 查看应用。

## 应用流程说明

### 1. 登录流程
- 用户访问根路径 `/`
- 系统自动调用 `/sso/login` 接口获取SSO登录地址
- 自动跳转到SSO登录页面

### 2. 回调处理
- SSO登录完成后跳转到 `/callback` 页面
- 从URL参数中提取 `openid` 和 `nickname`
- 调用 `/ml/get_ml_link` 接口获取目标链接
- 自动跳转到目标链接

## API 接口

### 获取SSO登录链接

- 接口路径: `/sso/login`
- 请求方法: GET
- 响应示例:
  ```json
  {
    "url": "SSO登录地址"
  }
  ```

### 获取真实链接

- 接口路径: `/ml/get_ml_link`
- 请求方法: POST
- 请求参数:
  ```json
  {
    "openId": "用户OpenID",
    "nickName": "用户昵称"
  }
  ```
- 响应示例:
  ```json
  {
    "url": "真实链接"
  }
  ```

## 注意事项

1. 确保后端服务正在运行并且可访问
2. 检查 `.env` 文件中的 API 地址配置是否正确
3. 如遇到跨域问题，请确认后端已正确配置 CORS