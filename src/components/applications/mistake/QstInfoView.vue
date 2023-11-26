<script setup>

import {getQstDetail} from "@/assets/js/api";
import {useUserInfoStore} from "@/assets/js/Stores";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const userInfo = useUserInfoStore();
const route = useRoute();
let qstInfo = ref({})
getQstDetail(userInfo.userInfo.accessToken,route.params.id)
  .then(resp => {
    if (!resp.success){
      ElMessage.error(resp.error.message)
    } else {
      qstInfo.value = resp.result
    }
  })
</script>

<template>
  <div v-if="qstInfo">
    <h1>{{ qstInfo.name }}</h1><br>
    <h2 v-if="qstInfo.note">笔记文件： <a :href="qstInfo.note" target="_blank">这里</a></h2><br>
    <div v-if="qstInfo.extraStems && qstInfo.extraStems.length">
      <h2>额外stem: </h2><br>
      <div v-for="picUrl in qstInfo.extraStems">
        <img :src="picUrl" alt="pic">
      </div>
    </div>
    <div v-if="qstInfo.pictureNote && qstInfo.pictureNote.length">
      <h2>图片笔记: </h2><br>
      <div v-for="picUrl in qstInfo.pictureNote">
        <img :src="picUrl" alt="pic">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>