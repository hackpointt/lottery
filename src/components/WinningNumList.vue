<template>
  <div :style="chineseNewYearStyle">
    <h1 :style="h1Style">中奖名单</h1>
    <div class="list-container">
      <ul>
        <li v-for="(number, index) in numbers" :key="index">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, inject, ref} from 'vue'

const props = defineProps(['pageId'])

/**
 * @type {DataProvider}
 */
const dataProvider = inject("dp");

// 给定的数字数组列表
const numbers = computed(() => dataProvider.drawnNumbers[props.pageId])

// 样式
const h1Style = ref({
  width: '100%',
})
const chineseNewYearStyle = ref({
  backgroundColor: '#ffec40', // 黄色背景
  color: '#e25822', // 红色文字
  padding: '2px',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  width: '100%',
  height: '500px',
  fontSize: '30px',
})

// 应用样式
</script>

<style scoped>
.list-container { display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%;height: 200px }
ul { display: flex; flex-wrap: wrap; justify-content: flex-start; list-style-type: none; padding: 0; margin: 0; width: 100%; }
li { margin: 10px; width: 180px;}
</style>
