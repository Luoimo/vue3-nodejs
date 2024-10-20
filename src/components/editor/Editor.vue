<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-20 10:33:40
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-20 11:00:19
-->
<template>
    <div id="myeditor"></div>
</template>
<script setup>
import { onMounted, defineEmits } from 'vue'
import E from 'wangeditor'
const emit = defineEmits(['event'])
onMounted(() => {
    const editor = new E('#myeditor')
    editor.create()
    editor.config.onchange = function (newHtml) {
        // console.log('change 之后最新的 html', newHtml)
        emit('event', newHtml)
    }
})
</script>
