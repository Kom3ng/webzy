<script setup>
import {ref} from "vue";
import {useBaseUrlStore, useUserInfoStore} from "@/assets/js/Stores";
import Model from "@/components/Model.vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

let password = ref("")
let username = ref("")
let showUsernameHint = ref(false)
let showPasswordHint = ref(false)
let baseUrl
const router = useRouter();

useBaseUrlStore().baseUrl
    .then(url => baseUrl = ref(url))

let userInfoStore = useUserInfoStore();

function submitForm(username,password) {
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

function checkUsername(){
  return username.value.length > 2;
}
function checkPassword(){
  return password.value.length > 6;
}
function checkValid(){
  return checkUsername() && checkPassword();
}

</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="submitForm(username,password)">
        <input @change="showUsernameHint = !checkUsername()" type="text" v-model="username" placeholder="Username" required>
        <br>
        <input @change="showPasswordHint = !checkPassword()" type="password" v-model="password" placeholder="Password" required>
        <br>
        <span class="warning" v-if="showUsernameHint"><img src="@/assets/icon/tips_red.svg" alt="tips" height="12"> 用户名应在2个字符以上<br></span>
        <span class="warning" v-if="showPasswordHint"><img src="@/assets/icon/tips_red.svg" alt="tips" height="12"> 密码应在2个字符以上<br></span>
        <br>
        <button :disabled="!checkValid()" type="submit">Login</button>
      </form>
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
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.login-box h1 {
  margin-bottom: 20px;
}

.login-box form input {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-box form button {
  padding: 10px;
  background-color: #00cdea;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-box form button:hover {
  transform: scale(1.1);
  transition-duration: 0.07s;
}

.warning {
  color: crimson;
}
</style>