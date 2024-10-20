<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 19:57:26
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-18 21:29:00
-->
<template>
    <div>
        <el-page-header icon="" title="企业门户管理网站">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
        <el-row :gutter="20" class="el-row">
            <el-col :span="8" :offset="0">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>
                        {{
                            store.state.userInfo.role === 1 ? '管理员' : '编辑'
                        }}
                    </h5>
                </el-card>
            </el-col>
            <el-col :span="16" :offset="0">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form
                        ref="userFormRef"
                        :model="userForm"
                        :rules="userFormRules"
                        label-width="120px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select
                                v-model="userForm.gender"
                                placeholder="请选择性别"
                                size="medium"
                                style="width: 100%"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input
                                v-model="userForm.introduction"
                                type="textarea"
                            />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <!-- <el-upload
                                class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="handleChange"
                            >
                                <img
                                    v-if="userForm.avatar"
                                    :src="uploadAvatar"
                                    class="avatar"
                                />
                                <el-icon v-else class="avatar-uploader-icon"
                                    ><Plus
                                /></el-icon>
                            </el-upload> -->
                            <Upload :avatar="userForm.avatar" @LuoimoChange = "handleChange"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">
                                提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload.vue'
const store = useStore()

const avatarUrl = computed(() =>
    store.state.userInfo.avatar
        ? 'http://localhost:3000' + store.state.userInfo.avatar
        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const uploadAvatar = computed(() => {
    return userForm.avatar.includes('blob')
        ? userForm.avatar
        : 'http://localhost:3000' + userForm.avatar
})
const { username, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null,
})
const userFormRules = reactive({
    username: [
        {
            required: true,
            message: '请输入名字',
            trigger: 'blur',
        },
    ],
    gender: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'blur',
        },
    ],
    introduction: [
        {
            required: true,
            message: '请输入介绍',
            trigger: 'blur',
        },
    ],
    avatar: [
        {
            required: true,
            message: '请上传头像',
            trigger: 'blur',
        },
    ],
})
const options = [
    {
        label: '保密',
        value: 0,
    },
    {
        label: '男',
        value: 1,
    },
    {
        label: '女',
        value: 2,
    },
]
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file.raw)
    userForm.file = file.raw
}
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload('adminapi/user/upload', userForm)
            if (res.ActionType == 'Ok') {
                store.commit('changeUserInfo', res.data)
                ElMessage.success('更新成功')
            }
        }
    })
}
</script>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;
    .box-card {
        text-align: center;
    }
}
</style>
