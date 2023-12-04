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
    <div v-if="qstInfo.name">
      <el-text size="large">{{ qstInfo.name }}</el-text>
      <el-divider />
    </div><br>
    <div v-if="qstInfo.note">
      <el-text size="large">笔记文件： <el-link :href="qstInfo.note" target="_blank">这里</el-link></el-text>
      <el-divider />
    </div><br>
    <div v-if="qstInfo.extraStems && qstInfo.extraStems.length">
      <el-text size="large">额外stem: </el-text><br>
      <div v-for="picUrl in qstInfo.extraStems">
        <el-image :src="picUrl" alt="pic" style="width: 500px" />
      </div>
      <el-divider />
    </div>

    <div v-if="qstInfo.pictureNote && qstInfo.pictureNote.length">
      <el-text size="large">图片笔记: </el-text><br>
      <div v-for="picUrl in qstInfo.pictureNote">
        <el-image :src="picUrl" alt="pic" style="width: 500px"/>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<style scoped>

</style>