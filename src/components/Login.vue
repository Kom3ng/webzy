<script setup>
import {reactive, ref} from "vue";
import {useBaseUrlStore, useUserInfoStore} from "@/assets/js/Stores";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useDark} from "@vueuse/core";
const isDark = useDark()
let baseUrl
const router = useRouter();

useBaseUrlStore().baseUrl
    .then(url => baseUrl = ref(url))

let userInfoStore = useUserInfoStore();

function login(username,password) {
  while (!baseUrl){}

  fetch(baseUrl.value + "/api/TokenAuth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: username,
      password,
      clientType: 1
    })
  })
      .then(r => r.json())
      .then(o => {
        if (!o.success){
          ElMessage.error(o.error.message)
        } else {
          userInfoStore.isLogon = true
          userInfoStore.userInfo = o.result
          ElMessage.info('登入成功')
          router.push("/home")
        }
      })
      .catch(e => {
        console.error(e)
        ElMessage.error(e)
      })
}

const checkUsername = (rule,value,callback) => {
  if (!value){
    return callback(new Error("please enter username"))
  }
  callback()
}
const checkPassword = (rule,value,callback) => {
  if (!value){
    return callback(new Error("please enter password"))
  }
  callback()
}
const loginForm = reactive({
    username: '',
    password: ''
})
const submitForm = (form)=>{
  if(!form) return
  form.validate((v) => {
    if (v) {
      login(loginForm.username,loginForm.password)
    } else {
      return false
    }
  })
}
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur'}],
  password: [{ validator: checkPassword, trigger: 'blur' }]
})
const loginFormRef = ref()

</script>

<template>
  <div class="login-container">
        <div class="login-box">
      <h1>Login</h1>
      <el-form 
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules">
        <el-form-item
          label="Username"
          prop="username">
          <el-input 
          type="text" 
          v-model="loginForm.username" 
          placeholder="Username"
          required></el-input>
        </el-form-item>
        <el-form-item
          label="Passowrd"
          prop="password">
        <el-input 
          type="password" 
          v-model="loginForm.password" 
          placeholder="Password" 
          show-password
          auto-compelete="off"
          required></el-input>
        </el-form-item>
        <el-button @click="submitForm(loginFormRef)" type="primary">Login</el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px;
  box-shadow: var(--el-box-shadow);

  border: 1px var(--el-border-color);
  background-color: var(--el-fill-color);
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--el-fill-color);
}

.login-box h1 {
  margin-bottom: 20px;
}

.login-box form button:hover {
  transform: scale(1.1);
  transition-duration: 0.07s;
}

</style>