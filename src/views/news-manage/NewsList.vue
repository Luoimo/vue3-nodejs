<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 20:10:48
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-21 15:19:53
-->
<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <el-page-header icon="" content="新闻列表" title="新闻管理">
                    </el-page-header>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="category" label="类型">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ timeFormat.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.isPublish"
                            :active-value="1"
                            :inactive-value="0"
                            @change="handleSwitch(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            circle
                            :icon="Star"
                            size="small"
                            @click="handlePreview(scope.row)"
                        >
                        </el-button>
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
            <el-dialog
                v-model="dialogVisible"
                title="预览新闻"
                width="500"
                :before-close="handleClose"
            >
                <div>
                    <h2>{{ previewData.title }}</h2>
                </div>
                <div style="font-size: 12px; color: gray">
                    {{ timeFormat.getTime(previewData.editTime) }}
                </div>
                <el-divider>
                    <el-icon>
                        <star-filled />
                    </el-icon>
                </el-divider>
                <div v-html="previewData.content"></div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import timeFormat from '@/util/timeFormat'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
onMounted(() => {
    getTableData()
})
const router = useRouter()
const store = useStore()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
const getTableData = async () => {
    const res = await axios.get(`/adminapi/news/${store.state.userInfo.username}/list`)
    tableData.value = res.data.data
}
const categoryFormat = (category) => {
    const arr = ['最新动态', '典型案例', '通知公告']
    return arr[category - 1]
}
const handleSwitch = async (item) => {
    await axios.put('/adminapi/news/publish', {
        _id: item._id,
        isPublish: item.isPublish,
    })
    await getTableData()
}
const handlePreview = (data) => {
    previewData.value = data
    dialogVisible.value = true
}
const handleEdit = (item) => {
    router.push(`/news-manage/editnews/${item._id}`)
}
const handleDelete = async (data) => {
    await axios.delete(`/adminapi/news/list/${data._id}`)
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
