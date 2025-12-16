import authService from "@/api/auth"
import {onMounted, ref} from "vue"

export const useLogin = () => {
    const error = ref<string>("")
    const loading = ref<boolean>(true)
    const handLogin = async () => {
        try {
            localStorage.removeItem("state")
            const response = await authService.getAuthUrl()
            const {url} = response.data
            window.open(url, "_self")
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    onMounted(async () => {
        await handLogin()
    })

    return {
        error,
        loading,
        handLogin,
        onMounted
    }
}