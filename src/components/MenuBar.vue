<script setup>
  import { useDark, useToggle } from "@vueuse/core";
  import {ref} from "vue";
  import { Sunny, MoonNight } from "@element-plus/icons-vue"
  import {useRouter} from "vue-router";
  import {useUserInfoStore} from "../assets/js/Stores";

  const activeIndex = ref('1')
  const router = useRouter();
  const handleSelect = (key, keyPath) => {
    switch (key){
      case '1':
        router.push({ name: 'Mistake' })
        break
    }
  }
  const isDark = useDark()
  useToggle(isDark)
  const token = ref(useUserInfoStore().userInfo.accessToken)
</script>

<template>
  <div>
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
    <el-menu-item index="1">错题本</el-menu-item>
    <el-menu-item index="2"><el-link target="_blank" :href="'http://sxz.school.zykj.org/navPage.html?apiHost=http://sxz.api6.zykj.org&apiToken='+token+'&timestamp='+Date.now()">在线专栏</el-link></el-menu-item>
    <div class="rb">
      <el-space warp direction="horizontal">
        <div>
        <a href="https://github.com/Kom3ng/webzy" target="_blank">
          <img v-if="!isDark" src="@/assets/icon/github-mark.svg" alt="" style="height: 35px; width: auto;">
          <img v-if="isDark" src="@/assets/icon/github-mark-white.svg" alt="" style="height: 35px; width: auto;">
        </a>
      </div>
      <div>
        <el-switch 
          v-model="isDark"
          :active-action-icon="Sunny"
          :inactive-action-icon="MoonNight"

        />
      </div>
      </el-space>
    </div>
  </el-menu>
  </div>
  
</template>

<style scoped>
.rb {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}
</style>