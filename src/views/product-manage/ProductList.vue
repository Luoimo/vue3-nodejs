<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 20:10:48
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-21 16:23:57
-->
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header icon="" content="产品列表" title="产品管理">
                    </el-page-header>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="产品名称" width="180" />
                <el-table-column prop="introduction" label="简要概述">
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ timeFormat.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            circle
                            :icon="Edit"
                            size="small"
                            @click="handleEdit(scope.row)"
                        >
                        </el-button>
                        <el-popconfirm
                            title="确定删除？"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    size="small"
                                    :icon="Delete"
                                    circle
                                    type="danger"
                                >
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import timeFormat from '@/util/timeFormat'
import { Edit, Delete } from '@element-plus/icons-vue'
onMounted(() => {
    getTableData()
})
const router = useRouter()
const tableData = ref([])
const getTableData = async () => {
    const res = await axios.get(`/adminapi/product/list`)
    tableData.value = res.data.data
}
const handleEdit = (item) => {
    router.push(`/product-manage/editproduct/${item._id}`)
}
const handleDelete = async (data) => {
    await axios.delete(`/adminapi/product/list/${data._id}`)
    await getTableData()
}
</script>
<style lang="scss" scoped>
::v-deep p {
    img {
        max-width: 100%;
    }
}
</style>
