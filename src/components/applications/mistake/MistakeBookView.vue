<script setup>
import {useRouter} from "vue-router";

const props = defineProps({
  id: String
})
const router = useRouter();
function mistakeBookDetail(){
  router.push({
    name: 'MistakeBookDetail',
    params: {
      id: props.id
    }
  })
}
</script>

<template>
  <el-card class="mistake-book" @click="mistakeBookDetail">
    <slot />
  </el-card>
</template>

<style scoped>
.mistake-book {
  width: 170px;
  height: 80px;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: var(--el-fill-color);
  border-radius: 7px;
  border-color: var(--el-border-color-light);
}
</style>