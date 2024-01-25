<script setup>
import {computed, inject, ref} from "vue";
import WinningNumList from "@/components/WinningNumList.vue";

const props = defineProps(['pageId'])
/**
 *
 * @type {DataProvider}
 */
const dataProvider = inject("dp");
const drawing = ref(false)

const buttonText = computed(() => {
  if (drawing.value) {
    return "抽奖中"
  }
  if (dataProvider.index >= dataProvider.data.length) {
    return "本轮抽奖已结束"
  }
  return "开始抽奖"
})

const blocks = ref([
  {padding: '10px', background: '#ff9900'},
  {padding: '10px', background: '#f3ddaf'},
])

const prizes = ref([
  {fonts: [{text: '0', top: '30%'}]},
  {fonts: [{text: '1', top: '30%'}]},
  {fonts: [{text: '2', top: '30%'}]},
  {fonts: [{text: '3', top: '30%'}]},
  {fonts: [{text: '4', top: '30%'}]},
  {fonts: [{text: '5', top: '30%'}]},
  {fonts: [{text: '6', top: '30%'}]},
  {fonts: [{text: '7', top: '30%'}]},
  {fonts: [{text: '8', top: '30%'}]},
  {fonts: [{text: '9', top: '30%'}]},
])

const slots = ref([
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
  {order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
])

const defaultConfig = {
  colSpacing: '5px',
  rowSpacing: '10px',
}

const defaultStyle = {
  borderRadius: Infinity,
  background: '#fe5900',
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
  if (dataProvider.index >= dataProvider.data.length) {
    return
  }
  if (drawing.value) {
    return
  }
  slotMachine.value.play()
  drawing.value = true
  setTimeout(() => {
    slotMachine.value.stop(dataProvider.data[dataProvider.index])
  }, 3000)
}

const endCallback = (prize) => {
  drawing.value = false
  const drawnNum = dataProvider.data[dataProvider.index].join('')
  let level = props.pageId;
  if (!dataProvider.drawnNumbers[level]) {
    dataProvider.drawnNumbers[level] = []
  }
  if (dataProvider.drawnNumbers[level].indexOf(drawnNum) === -1) {
    dataProvider.drawnNumbers[level].push(drawnNum)
  }
  dataProvider.index = dataProvider.index + 1
  dataProvider.updateIndex(level)
  if (level >= 5) {
    setTimeout(() => {
      startCallback()
    }, 2000)
  }
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
    <div class="draw-level-bg">
      <h1 class="draw-level">{{ numberToChinese(pageId) }}</h1>
    </div>
    <div class="slot-machine">
      <SlotMachine
          :style="slotMachineStyle"
          ref="slotMachine"
          width="600px"
          height="130px"
          :prizes="prizes"
          :blocks="blocks"
          :slots="slots"
          :defaultConfig="defaultConfig"
          :defaultStyle="defaultStyle"
          @end="endCallback"
      />
      <button class="full-width-button" @click="startCallback">{{ buttonText }}</button>
      <WinningNumList :pageId="pageId"/>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 11%;
  top: 15%;
  width: 600px;
}

.draw-level-bg {
  background-color: #ffec40;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

}

.draw-level {
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #e25822;
}

.full-width-button {
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  color: #ea4c3e;
  background-color: #eec114;
  border: none;
}
</style>