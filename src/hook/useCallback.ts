import {onMounted, ref} from "vue"
import {useRoute} from "vue-router"
import authService from "@/api/auth"
import minkService, {type UserInfo} from '@/api/mind'

export const useCallback = () => {
    const status = ref<boolean>(false)
    const msg = ref<string>("")
    const errorMessage = ref<string>("")
    const access_token = ref<string>("")
    const userInfo = ref<UserInfo>()
    const route = useRoute()


    const handleCallback = async () => {
        status.value = true
        msg.value = "正在登录"
        const code: string = route.query.code as string
        const state: string = route.query.state as string
        const error = route.query.error

        if (error) {
            status.value = false
            errorMessage.value = `失败: ${error}`
            return
        }
        access_token.value = localStorage.getItem("access_token") as string
        if (access_token.value) {
            return
        }
        try {
            const response = await authService.exchangeToken(code, state)

            if(response.code !== 200){
                errorMessage.value = response.msg
                status.value = false
                return
            }

            access_token.value = response.data.access_token
            localStorage.setItem("access_token", response.data.access_token)
        } catch (error) {
            status.value = false
            errorMessage.value = `未知错误${error}`
        }
    }

    const handleUserProfile = async()=>{
        status.value = true
        msg.value = "正在获取用户信息"
        try {
            const response = await authService.getUserProfile(access_token.value)

            if(response.code !== 200){
                errorMessage.value = response.msg
                status.value = false
                return
            }

            userInfo.value = {
                openId: response.data.user_profile.attributes.cn,
                nickName: response.data.user_profile.id
            }
        } catch (error) {
            status.value = false
            errorMessage.value = `${error}`
            return
        }
    }

    const handleGotoMind = async()=>{
        status.value = true
        msg.value = "等待跳转到会议系统"
        try {
            const response = await minkService.get_manager_url(userInfo.value as UserInfo)

            if(response.code !== 200){
                errorMessage.value = response.msg
                status.value = false
                return
            }

            const manager_url = response.data.url
            window.open(manager_url,"_self")
        } catch (error) {
            status.value = false
            console.log(errorMessage.value)
            errorMessage.value = `${errorMessage.value}`
            return
        }
    }

    onMounted(async () => {
        await handleCallback()
        await handleUserProfile()
        await handleGotoMind()
    })

    return {
        status,
        errorMessage,
        msg
    }
}