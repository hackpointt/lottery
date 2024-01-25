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

const showDirectPage = () => {
  currentComponent.value = DirectPage
}

/**
 * @type {DataProvider}
 */
const dataProvider = reactive(new DataProvider())
provide("dp", dataProvider)

const pageId = ref(0)
watch(pageId, (newVal, oldVal) => {
  console.log(`pageId changed from ${oldVal} to ${newVal}`)
  dataProvider.fetchData(newVal)
  dataProvider.index = dataProvider.indexes[newVal]
})
pageId.value = 8

const handleKeyPress = (event) => {
  if (event.ctrlKey && /^[1-8]$/.test(event.key)) {
    pageId.value = parseInt(event.key, 10)
  }
}

const switchLevel = (event) => {
  pageId.value = parseInt(event.target.id)
}

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener("keypress", handleKeyPress)
})

const levelButtonContainerStyle1 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, -440%)',
})

const levelButtonContainerStyle2 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, -320%)',
})

const levelButtonContainerStyle3 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, -200%)',
})

const levelButtonContainerStyle4 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, -70%)',
})

const levelButtonContainerStyle5 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, 60%)',
})

const levelButtonContainerStyle6 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, 180%)',
})

const levelButtonContainerStyle7 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, 300%)',
})

const levelButtonContainerStyle8 = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(45%, 420%)',
})

const levelButtonStyle = ref({
  width: '460px',
  height: '70px',
  backgroundColor: 'transparent',
  // border: '1px solid',
  border: 'none',
})

</script>

<template>
  <div>
    <div class="control">
      <button class="control-button" @click="showDirectPage">选 人</button>
      <button class="control-button" @click="showSlotMachinePage">抽 奖</button>
    </div>
    <div>
      <component :is="currentComponent" :pageId="pageId"></component>
    </div>
    <div :style="levelButtonContainerStyle1"><button :style="levelButtonStyle" @click="switchLevel" :id=1></button></div>
    <div :style="levelButtonContainerStyle2"><button :style="levelButtonStyle" @click="switchLevel" :id=2></button></div>
    <div :style="levelButtonContainerStyle3"><button :style="levelButtonStyle" @click="switchLevel" :id=3></button></div>
    <div :style="levelButtonContainerStyle4"><button :style="levelButtonStyle" @click="switchLevel" :id=4></button></div>
    <div :style="levelButtonContainerStyle5"><button :style="levelButtonStyle" @click="switchLevel" :id=5></button></div>
    <div :style="levelButtonContainerStyle6"><button :style="levelButtonStyle" @click="switchLevel" :id=6></button></div>
    <div :style="levelButtonContainerStyle7"><button :style="levelButtonStyle" @click="switchLevel" :id=7></button></div>
    <div :style="levelButtonContainerStyle8"><button :style="levelButtonStyle" @click="switchLevel" :id=8></button></div>

  </div>
</template>

<style scoped>
.control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: #ffec40;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.control-button {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 2px solid #000;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e25822;
}

</style>