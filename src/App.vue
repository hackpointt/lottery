<script setup>

import MainPage from "@/components/MainPage.vue";

</script>

<template>
  <div class="background">
    <MainPage></MainPage>
  </div>
</template>

<style>
.background {
  background-size: cover !important;
  background: url("https://sd-pubread-images.oss-cn-beijing.aliyuncs.com/nianhui_hd.jpg");
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>