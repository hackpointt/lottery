<script setup>
import {onMounted, onUnmounted, provide, reactive, ref, watch} from 'vue'
import SlotMachinePage from "@/components/SlotMachinePage.vue";
import DirectPage from "@/components/DrawerPage.vue";
import "@/components/DataProvider.js";
import DataProvider from "@/components/DataProvider.js";


const currentComponent = ref(null)
const showSlotMachinePage = () => {
  currentComponent.value = SlotMachinePage
}

const dataProvider = reactive(new DataProvider())
provide("dp", dataProvider)

const pageId = ref(0)
watch(pageId, (newVal, oldVal) => {
  console.log(`pageId changed from ${oldVal} to ${newVal}`)
  dataProvider.fetchData(pageId)
})

const handleKeyPress = (event) => {
  if (event.ctrlKey && /^[1-8]$/.test(event.key)) {
    pageId.value = parseInt(event.key, 10)
  }
}

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener("keypress", handleKeyPress)
})

const showDirectPage = () => {
  currentComponent.value = DirectPage
}
</script>

<template>
  <div>
    <button @click="showSlotMachinePage">显式老虎机</button>
    <button @click="showDirectPage">显式平铺页</button>
    <div>
      <component :is="currentComponent" :pageId="pageId"></component>
    </div>
  </div>
</template>

<style scoped>

</style>