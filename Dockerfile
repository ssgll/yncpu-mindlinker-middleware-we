# 使用 node 镜像进行构建
FROM docker.1ms.run/node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用（可以通过构建参数传递环境变量）
ARG API_BASE_URL
ENV VITE_API_BASE_URL=${API_BASE_URL}

# 构建应用
RUN npm run build

# 使用 nginx 镜像作为生产环境
FROM docker.1ms.run/nginx:alpine

# 设置 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制打包好的文件到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 9999

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]