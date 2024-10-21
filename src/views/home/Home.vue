<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 19:57:17
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-21 21:44:09
-->
<template>
    <div>
        <el-page-header icon="" title="企业门户管理网站">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>
        <el-card class="box-card">
            <el-row>
                <el-col :span="4" :offset="0">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20" :offset="0">
                    <span style="line-height: 100px"
                        >欢迎{{ store.state.userInfo.username }}回来,{{
                            welcomeText
                        }}</span
                    >
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in loopList" :key="item">
                    <div
                            :style="{
                                backgroundImage: `url(http://localhost:3000${item.picture})`,
                                backgroundSize:'cover'
                            }"
                    >
                        <h3 text="2xl" justify="center">{{ item.name }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>
<script setup>
import axios from 'axios'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const loopList = ref([])
onMounted(() => {
    getData()
})
const avatarUrl = computed(() =>
    store.state.userInfo.avatar
        ? 'http://localhost:3000' + store.state.userInfo.avatar
        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const welcomeText = computed(() =>
    new Date().getHours() < 12 ? '离下班还有很久呢' : '马上就下班了，加油💪'
)
const getData = async () => {
    const res = await axios.get(`/adminapi/product/list`)
    loopList.value = res.data.data
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}
.el-carousel__item h3 {
    color: white;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
