import apiClient from "@/api/requests.ts"
import type {Response} from "@/api/response.ts"

export interface TokenData {
    token: string
    refresh_token: string
    state_key: string
}

const authService = {
    getAuthUrl: (): Promise<Response<any>> => apiClient.get("/sso/url"),
    exchangeToken: (code: string, state: string): Promise<Response<any>> => apiClient.post("/sso/token", {code, state}),
    // setToken: (tokenData: TokenData) => {
    //     localStorage.setItem("cas_token", tokenData.token)
    // },
    // getToken: () => {
    //     localStorage.get("cas_token")
    // },
    getUserProfile: (token:string)=>apiClient.post(`/sso/user?token=${token}`),
    getUserMobile: (token:string)=>apiClient.post("/sso/mobile", token),
    logout: (token:string)=> apiClient.post("/sso/logout",token),
}

export default authService