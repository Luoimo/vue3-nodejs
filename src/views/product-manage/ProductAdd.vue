<template>
    <div>
        <el-page-header icon="" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加产品 </span>
            </template>
        </el-page-header>
        <el-form
            ref="productFormRef"
            :model="productForm"
            :rules="productFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="产品名称" prop="name">
                <el-input v-model="productForm.name" />
            </el-form-item>
            <el-form-item label="产品概述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="产品图片" prop="picture">
                <Upload
                    :avatar="productForm.picture"
                    @LuoimoChange="handleChange"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    添加产品
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
const router = useRouter()
const store = useStore()
const productFormRef = ref()
const productForm = reactive({
    name: '',
    introduction: '',
    detail: '', //1最新动态2典型案例3通知公告
    picture: '',
    file: null,
})
const productFormRules = reactive({
    name: [
        {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur',
        },
    ],
    introduction: [
        {
            required: true,
            message: '请输入产品概述',
            trigger: 'blur',
        },
    ],
    detail: [
        {
            required: true,
            message: '请输入产品详述',
            trigger: 'blur',
        },
    ],
    picture: [
        {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
        },
    ],
})
const handleChange = (file) => {
    productForm.picture = URL.createObjectURL(file.raw)
    productForm.file = file.raw
}
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(productForm)
            await upload('/adminapi/product/add', productForm)
            router.push('/product-manage/productlist')
        }
    })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>
