<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 17:30:14
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-18 22:27:26
-->
<template>
    <el-container>
        <SideMenu></SideMenu>
        <el-container direction="vertical">
            <TopHeader></TopHeader>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import SideMenu from '@/components/mainbox/SideMenu.vue';
import TopHeader from '@/components/mainbox/TopHeader.vue';
</script>
<style lang="scss" scoped>
    .el-main{
        overflow: auto;
        height: calc(100vh - 60px);
    }
</style>