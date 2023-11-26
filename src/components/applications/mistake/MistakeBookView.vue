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
  <div class="mistake-book" @click="mistakeBookDetail">
    <slot />
  </div>
</template>

<style scoped>
.mistake-book {
  width: 170px;
  height: 80px;
  align-content: center;
  text-align: center;
  background-color: #97cdd7;
  border-radius: 7px;
}
</style>