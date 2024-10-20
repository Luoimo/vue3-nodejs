<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 20:09:36
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-19 21:42:47
-->
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header icon="" content="用户列表" title="用户管理">
                    </el-page-header>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar
                                :size="50"
                                :src="
                                    'http://localhost:3000' + scope.row.avatar
                                "
                            ></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar
                                :size="50"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                            ></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色" width="180">
                    <template #default="scope">
                        <el-tag
                            v-if="scope.row.role === 1"
                            class="ml-2"
                            type="success"
                            >管理员</el-tag
                        >
                        <el-tag v-else class="ml-2" type="info">编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" width="180">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm
                            title="确定删除？"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            v-model="dialogVisible"
            title="Tips"
            width="500"
            :before-close="handleClose"
        >
            <el-form
                ref="userFormRef"
                :model="userForm"
                :rules="userFormRules"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select
                        v-model="userForm.role"
                        placeholder="请选择角色"
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
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditComfirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
const dialogVisible = ref(false)
const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
})
const userFormRules = reactive({
    username: [
        {
            required: true,
            message: '请输入名字',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
    role: [
        {
            required: true,
            message: '请选择权限',
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
})
const options = [
    {
        label: '管理员',
        value: 1,
    },
    {
        label: '编辑',
        value: 2,
    },
]
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list')
    console.log(res.data)
    tableData.value = res.data.data
}
const handleDelete = async (data) => {
    await axios.delete(`adminapi/user/list/${data._id}`)
    getTableData()
}
const handleEdit = async (data) => {
    const res = await axios.get(`adminapi/user/list/${data._id}`)
    Object.assign(userForm,res.data.data[0])
    // userForm.value = res.data.data[0]
    dialogVisible.value = true
    console.log(res)
}
const handleEditComfirm = () => {

    userFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(userForm)
            await axios.put(
                `/adminapi/user/list/${userForm._id}`,
                userForm
            )
        }
    })
    dialogVisible.value = false
    getTableData()
}
</script>
