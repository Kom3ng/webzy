import {defineStore} from "pinia";
import {ref} from "vue";

export const useBaseUrlStore = defineStore('baseUrl',() => {
    let baseUrl = ref(
        fetch(gateway)
            .then(r => r.json())
            .then(o => o.server)
    )

    return { baseUrl }
})

export const useUserInfoStore = defineStore('userInfo',() => {
    let userInfo = ref()
    let isLogon = ref(false)
    function login(userinfo){
        this.isLogon.value = true
        this.userInfo.value = userinfo
    }
    return { userInfo, isLogon ,login }
})

const gateway = "https://hagateway.zykj.org/api/discovery/sxz"