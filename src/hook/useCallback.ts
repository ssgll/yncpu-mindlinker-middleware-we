import {onMounted, ref} from "vue"
import {useRoute} from "vue-router"
import authService from "@/api/auth"
import minkService, {type UserInfo} from '@/api/mind'

export const useCallback = () => {
    const status = ref<string>("loading")
    const errorMessage = ref<string>("")
    const access_token = ref<string>("")
    const userInfo = ref<UserInfo>()
    const route = useRoute()


    const handleCallback = async () => {
        const code: string = route.query.code as string
        const state: string = route.query.state as string
        const error = route.query.error

        if (error) {
            status.value = 'error'
            errorMessage.value = `失败: ${error}`
            return
        }
        access_token.value = localStorage.getItem("access_token") as string
        if (access_token.value) {
            return
        }
        try {
            const response = await authService.exchangeToken(code, state)
            access_token.value = response.data.access_token
            status.value = 'success'
            localStorage.setItem("access_token", response.data.access_token)
        } catch (error) {
            status.value = 'error'
            errorMessage.value = `未知错误${error}`
        }
    }

    const handleUserProfile = async()=>{
        try {
            const response = await authService.getUserProfile(access_token.value)
            userInfo.value = {
                openId: response.data.user_profile.attributes.cn,
                nickName: response.data.user_profile.id
            }
        } catch (error) {
            status.value = 'error'
            errorMessage.value = `${error}`
            return
        }
    }

    const handleGotoMind = async()=>{
        try {
            const response = await minkService.get_manager_url(userInfo.value as UserInfo)
            const manager_url = response.data.url
            window.open(manager_url)
        } catch (error) {
            status.value = 'error'
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
        access_token,
        handleCallback
    }
}