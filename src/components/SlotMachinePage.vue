<script setup>
import {inject, ref} from "vue";
import WinningNumList from "@/components/WinningNumList.vue";

const props = defineProps(['pageId'])
/**
 *
 * @type {DataProvider}
 */
const dataProvider = inject("dp");

const blocks = ref([
  {padding: '10px', background: '#869cfa'},
  {padding: '10px', background: '#e9e8fe'},
])

const prizes = ref([
  {fonts: [{text: '0', top: '20%'}]},
  {fonts: [{text: '1', top: '20%'}]},
  {fonts: [{text: '2', top: '20%'}]},
  {fonts: [{text: '3', top: '20%'}]},
  {fonts: [{text: '4', top: '20%'}]},
  {fonts: [{text: '5', top: '20%'}]},
  {fonts: [{text: '6', top: '20%'}]},
  {fonts: [{text: '7', top: '20%'}]},
  {fonts: [{text: '8', top: '20%'}]},
  {fonts: [{text: '9', top: '20%'}]},
])

const slots = ref([
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
])

const defaultConfig = {
  colSpacing: '5px',
  rowSpacing: '10px',
}

const defaultStyle = {
  borderRadius: Infinity,
  background: '#fff',
  fontSize: '20px',
  fontColor: '#333',
}

/**
 * 老虎机组件
 * @type {Ref<SlotMachine>}
 */
const slotMachine = ref(null)

const startCallback = () => {
  // 模拟调用接口异步抽奖
  slotMachine.value.play()
  setTimeout(() => {
    const index = [6, 6, 6, 2, 3, 4, 8, 8, 8]
    // 在组合式 API 中，使用 $refs 需要一个 ref 属性
    slotMachine.value.stop(index)
    const drawnNum = index.join('')
    if (!dataProvider.drawnNumbers[props.pageId]) {
      dataProvider.drawnNumbers[props.pageId] = []
    }
    if (dataProvider.drawnNumbers[props.pageId].indexOf(drawnNum) === -1) {
      dataProvider.drawnNumbers[props.pageId].push(drawnNum)
    }
    console.log(dataProvider.drawnNumbers[props.pageId])
  }, 3000)
}

const endCallback = (prize) => {
  console.log(prize)
}

function numberToChinese(number) {
  const chineseNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

  if (number >= 1 && number <= 9) {
    return chineseNumbers[number - 1] + "等奖";
  }
}

const slotMachineStyle = ref({
  position: 'flex',
  'flex-direction': 'column',
  alignItems: 'center',
})

</script>

<template>
  <div class="main-page">
    <h1>{{ numberToChinese(pageId) }}</h1>
    <div class="slot-machine">
      <SlotMachine
          :style="slotMachineStyle"
          ref="slotMachine"
          width="400px"
          height="130px"
          :prizes="prizes"
          :blocks="blocks"
          :slots="slots"
          :defaultConfig="defaultConfig"
          :defaultStyle="defaultStyle"
          @end="endCallback"
      />
      <button class="full-width-button" @click="startCallback">点击按钮</button>
      <WinningNumList :pageId="pageId" />
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  transform: translate(-100%, -48%);
  position: absolute;
}

.full-width-button {
  width: 100%;
  height: 3rem;
}
</style>