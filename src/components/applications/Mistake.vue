<script setup>
import {getMistakeBooks} from "@/assets/js/api";
import {useUserInfoStore} from "@/assets/js/Stores";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import MistakeBook from "@/components/applications/mistake/MistakeBookView.vue";

const userInfo = useUserInfoStore().userInfo;
let mistakeBooks = ref([])
getMistakeBooks(userInfo.accessToken)
  .then(resp => {
    if (!resp.success){
      ElMessage.error(resp.error.message)
    } else {
      mistakeBooks.value = resp.result
    }
  })
</script>

<template>
  <div class="wrapper">
    <MistakeBook v-for="book in mistakeBooks" :key="book.topic.sort" :id="book.id">
      <el-text> {{ book.topic.content }} </el-text>
    </MistakeBook>
  </div>
</template>

<style scoped>
.wrapper{
  margin: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
}
</style>