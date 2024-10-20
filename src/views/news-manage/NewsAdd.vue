<template>
    <div>
        <el-page-header icon="" title="新闻管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加新闻 </span>
            </template>
        </el-page-header>
        <el-form
            ref="newsFormRef"
            :model="newsForm"
            :rules="newsFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleEvent" />
            </el-form-item>
            <el-form-item label="类型" prop="category">
                <el-select
                    v-model="newsForm.category"
                    placeholder="请选择类型"
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
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @LuoimoChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    添加新闻
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
const router = useRouter()
const newsFormRef = ref()
const newsForm = reactive({
    title: '',
    content: '',
    category: 1, //1最新动态2典型案例3通知公告
    cover: '',
    file: null,
    isPublish: 0, //0未发布1已发布
})
const newsFormRules = reactive({
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
        },
    ],
    content: [
        {
            required: true,
            message: '请输入内容',
            trigger: 'blur',
        },
    ],
    category: [
        {
            required: true,
            message: '请选择分类',
            trigger: 'blur',
        },
    ],
    cover: [
        {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
        },
    ],
})
const handleEvent = (data) => {
    // console.log(data)
    newsForm.content = data
}
const options = [
    {
        label: '最新动态',
        value: 1,
    },
    {
        label: '典型案例',
        value: 2,
    },
    {
        label: '通知公告',
        value: 3,
    },
]
const handleChange = (file) => {
    newsForm.cover = URL.createObjectURL(file.raw)
    newsForm.file = file.raw
}
const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(newsForm)
            await upload('/adminapi/news/add',newsForm)

            router.push('/news-manage/newslist')
        }
    })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>
