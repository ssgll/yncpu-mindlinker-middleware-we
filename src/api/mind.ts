import apiClient from "@/api/requests.ts"
import type {Response} from "@/api/response.ts";

export interface UserInfo {
    openId: string
    nickName: string
}

const minkService = {
    get_manager_url: (userInfo: UserInfo): Promise<Response<any>> => apiClient.post("/ml/get_ml_link", {
        openId: userInfo.openId,
        nickName: userInfo.nickName
    })
}

export default minkService