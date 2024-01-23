<template>
  <div :style="chineseNewYearStyle">
    <ul>
      <li v-for="(number, index) in numbers" :key="index">{{ number }}</li>
    </ul>
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
const chineseNewYearStyle = ref({
  backgroundColor: '#ffec40', // 黄色背景
  color: '#e25822', // 红色文字
  padding: '0',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  position: 'flex',
  bottom: '0',
  width: '100%',
  height: '300px',

  columnCount: '5',
  columnGap: '10px',
  overflow: 'auto'
})

// 应用样式
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  columns: inherit;
}

li {
  font-size: 36px;
  margin: 10px;
  break-inside: avoid;
}
</style>
