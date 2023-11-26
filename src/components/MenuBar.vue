<script setup>
  import {ref} from "vue";
  import {useRouter} from "vue-router";

  const activeIndex = ref('1')
  const router = useRouter();
  const handleSelect = (key, keyPath) => {
    switch (key){
      case '1':
        router.push({ name: 'Mistake' })
        break
    }
  }
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="@/assets/logo.svg"
          alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Mistake</el-menu-item>

  </el-menu>
</template>

<style scoped>
</style>