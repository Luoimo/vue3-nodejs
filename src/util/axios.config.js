/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-17 15:16:23
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-17 16:18:00
 */
import axios from 'axios'
// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        const { authorization } = response.headers
        if (authorization) {
            localStorage.setItem('token', authorization)
        }
        return response
    },
    function (error) {
        var {status}=error.response
        // 对响应错误做点什么
        if(status === 401){
            window.location.href='#/login'
        }
        return Promise.reject(error)
    }
)
