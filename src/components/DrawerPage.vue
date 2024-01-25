<script setup>
import {inject, onMounted, ref} from "vue";

/**
 * 老虎机组件
 * @type {Ref<SlotMachine>}
 */
const slotMachine = ref(null)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const dataProvider = inject("dp");
const _pz = []
const uniqueRandomNumbers = [...Array(43).keys()];
shuffleArray(uniqueRandomNumbers);
for (let i = 1; i <= 43; i++) {
  const prize = {fonts: [{text: dataProvider.drawerNo2Name(i), top: '34%'}]};
  _pz.push(prize);
}

const prizes = ref(_pz)
let index = 0
const slots = ref([])

const updateGroup = () => {
  if (index >= dataProvider.drawGroups.length) {
    index = 0
  }
  slots.value = []
  let j = 0;
  for (let i = 0; i < dataProvider.drawGroups[index].length; i++) {
    const slot = {order: []}
    for (; j < 6 * (i + 1); j++) {
      slot.order.push(uniqueRandomNumbers[j])
    }
    slots.value.push(slot)
  }
}

const nextGroup = () => {
  buttonName.value ="换一批"
  slotMachine.value.play()
  setTimeout(() => {
    slotMachine.value.stop(dataProvider.drawGroups[index])
    updateGroup()
  }, 3000)
  index++
}

onMounted(() => {
  updateGroup()
})

const defaultConfig = {
  colSpacing: '5px',
  rowSpacing: '10px',
}

const defaultStyle = {
  borderRadius: Infinity,
  background: '#f3eeed',
  fontSize: '20px',
  fontColor: '#ec4f3d',
}


const slotMachineStyle = ref({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -150%)',
})
const blocks = ref([
  {padding: '10px', background: '#ff0000'},
  {padding: '10px', background: '#eec114'},
])

const buttonName = ref("选人！")


</script>

<template>
  <div class="drawer-page">
    <SlotMachine
        :style="slotMachineStyle"
        ref="slotMachine"
        width="600px"
        height="140px"
        :prizes="prizes"
        :blocks="blocks"
        :slots="slots"
        :defaultConfig="defaultConfig"
        :defaultStyle="defaultStyle"
    />
    <button class="drawer-button" @click="nextGroup">{{buttonName}}</button>
  </div>
</template>

<style scoped>
.drawer-page {
  width: 600px;
  height: 170px;
  position: fixed;
  top: 50%;
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drawer-button {
  width: 100%;
  height: 3rem;
  background-color: #eec114;
  border: none;
  font-size: 1.5rem;
  color: #ec4f3d;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>