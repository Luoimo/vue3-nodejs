<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-20 10:33:40
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-31 16:40:38
-->
<template>
    <!-- 编辑器的容器 -->
    <div id="myeditor"></div>
</template>
<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import E from 'wangeditor'

// 定义事件的发射器
const emit = defineEmits(['event'])
// 定义组件的属性
const props = defineProps({ content: String })

// 组件挂载时初始化编辑器
onMounted(() => {
    const editor = new E('#myeditor') // 创建编辑器实例
    editor.create() // 初始化编辑器
    // 如果有初始内容，则设置编辑器内容
    props.content && editor.txt.html(props.content)
    
    // 编辑器内容变化时的回调
    editor.config.onchange = function (newHtml) {
        // console.log('change 之后最新的 html', newHtml)
        emit('event', newHtml) // 触发事件并传递最新内容
    }
})
</script>