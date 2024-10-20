/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 17:27:24
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-19 22:25:13
 */
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from './config.js'
import store from '@/store/index.js'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/mainbox',
        name: 'mainbox',
        component: MainBox,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next()
    } else {
        //若登陆过，next()
        //未授权，重定向
        if (!localStorage.getItem('token')) {
            next({
                path: '/login',
            })
        } else {
            if (!store.state.isGetterRouter) {
                router.removeRoute('mainbox')
                ConfigRouter()
                next({
                    path: to.fullPath,
                })
            } else {
                next()
            }
        }
    }
})

const ConfigRouter = () => {
    if (!router.hasRoute('mainbox')) {
        router.addRoute({
            path: '/mainbox',
            name: 'mainbox',
            component: MainBox,
        })
    }

    routesConfig.forEach((item) => {
        checkPermission(item) && router.addRoute('mainbox', item)
    })
    //更新状态，表示已获取所有路由
    store.commit('changeGetterRouter', true)
}
const checkPermission = (item) => {
    if (item.requireAdmin) {
        // console.log(1)
        return store.state.userInfo.role === 1
    }
    return true
}
export default router
