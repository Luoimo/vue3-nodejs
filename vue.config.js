/*
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 17:27:24
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-16 20:24:37
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/adminapi': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
})
