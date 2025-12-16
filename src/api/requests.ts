import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 可以在这里添加认证token等
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // 统一处理错误
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)

export default apiClient