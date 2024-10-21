<template>
    <div>
        <el-page-header title="产品管理" @back="handleBack()">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
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
                <el-input v-model="productForm.introduction" type="textarea"/>
            </el-form-item>
            <el-form-item label="产品详述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea"/>
            </el-form-item>
            <el-form-item label="产品图片" prop="picture">
                <Upload :avatar="productForm.picture" @LuoimoChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    编辑产品
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const productFormRef = ref()
onMounted(async () => {
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    console.log(res.data.data[0])
    Object.assign(productForm,res.data.data[0])
    console.log(productForm)
})
const productForm = reactive({
    name: '',
    introduction: '',
    detail:'',
    picture: '',
    file: null
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
    picture: [
        {
            required: true,
            message: '请上传产品图片',
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
            await upload('/adminapi/product/list', productForm)

            router.back()
        }
    })
}
const handleBack = () => {
    router.back()
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
::v-deep p{
    img{
        width: 100%;
    }
}
</style>
