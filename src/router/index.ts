import {createRouter,createWebHistory,type RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path:"/",
        component:()=>import("@/views/Login.vue"),
    },
    {
        path:"/sso",
        children:[
            {
                path:"callback/",
                component:()=>import('@/views/Callback.vue'),
            }
        ] as RouteRecordRaw[]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router