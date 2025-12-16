// 定义响应结构
export interface Response<T> {
    code: number
    data: T
    msg: string
    timestamp: number
}


