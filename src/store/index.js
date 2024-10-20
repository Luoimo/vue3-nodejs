/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 17:27:24
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-17 20:16:39
 */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        isGetterRouter: false,
        isCollapsed: true,
        userInfo:{}
    },
    getters: {},
    mutations: {
        changeGetterRouter(state, value) {
            state.isGetterRouter = value
        },
        changeCollapsed(state) {
            state.isCollapsed = !state.isCollapsed
        },
        changeUserInfo(state,value){
            state.userInfo={
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state){
            state.userInfo = {}
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        paths:['isCollapsed','userInfo']
    })],
})
