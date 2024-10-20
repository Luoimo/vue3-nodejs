<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-15 18:42:23
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-17 20:17:06
-->
<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu></Menu>
            </el-icon>
            <span style="margin-left: 10px">企业门户管理网站</span>
        </div>
        <div class="right">
            <span>欢迎{{ store.state.userInfo.username }}回来</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="30" style="color: white"
                        ><User></User
                    ></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter"
                            >个人中心</el-dropdown-item
                        >
                        <el-dropdown-item @click="handleLogout"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Menu, User } from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()
const handleCollapsed = () => {
    store.commit('changeCollapsed')
}
const handleCenter = () => {
    router.push('/center')
}
const handleLogout = () => {
    localStorage.removeItem('token')
    store.commit('clearUserInfo')
    router.push('/login')
}
</script>
<style lang="scss" scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left,
.right {
    display: flex;
}
.left {
    i {
        margin: auto;
        cursor: pointer;
    }
}
.right {
    .el-dropdown {
        margin: auto;
    }
}
</style>
