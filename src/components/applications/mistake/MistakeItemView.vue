<script setup>
import MistakeQstItem from "@/components/applications/mistake/MistakeQstItem.vue";
import {getMistakeItem} from "@/assets/js/api";
import {ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {useUserInfoStore} from "@/assets/js/Stores";

let qsts = ref([])

const route = useRoute();
const router = useRouter();
const userInfo = useUserInfoStore();
const currentPageIndex = ref(0);
const id = ref(route.params.id);

watch(currentPageIndex,() => {
  getMistakeItem(userInfo.userInfo.accessToken,currentPageIndex.value,id.value)
      .then(resp => {
        if (!resp.success){
          ElMessage.error(resp.error.message)
        } else {
          qsts.value  = resp.result
        }
      })

}, { immediate: true })

function previousPage(){
  currentPageIndex.value -= 1
}
function nextPage(){
  currentPageIndex.value += 1
}

function showDetail(id){
  router.push({
    name: 'QstInfo',
    params: {
      id
    }
  })
}
</script>

<template>
  <div style="width: 100%">
    <div class="wrapper">
      <MistakeQstItem
          v-for="item in qsts.items"
          :name="item.name?item.name:item.source"
          :key="item.id"
          :pic="item.stemShoot"
          @click="showDetail(item.id)"
      ></MistakeQstItem>
    </div>
    <div class="pg-r">
      <el-button @click="previousPage" :disabled="currentPageIndex === 0">上一页</el-button>
      <el-text>{{ currentPageIndex + 1 }}</el-text>
      <el-button @click="nextPage()">下一页</el-button>
    </div>
  </div>

</template>

<style scoped>
.wrapper{
  width: 100%;
  margin: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 360px);
  grid-gap: 20px;
}
.pg-r {
  align-content: center;
}

</style>