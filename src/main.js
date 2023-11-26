import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import All from "@/components/All.vue";
import App from "@/App.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import {createPinia} from "pinia";
import ElementPlus from 'element-plus'
import {useUserInfoStore} from "@/assets/js/Stores";
import Mistake from "@/components/applications/Mistake.vue";
import MistakeItemView from "@/components/applications/mistake/MistakeItemView.vue";
import MistakeBookView from "@/components/applications/mistake/MistakeBookView.vue";
import QstInfoView from "@/components/applications/mistake/QstInfoView.vue";
import Home from "@/components/applications/Home.vue";

const routes = [
    {
        path: '/home',
        component: All,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: 'mistake',
                name: 'Mistake',
                component: Mistake
            },
            {
                path: 'mistake/:id',
                name: 'MistakeBookDetail',
                component: MistakeItemView
            },
            {
                path: 'mistake/qst/:id',
                name: 'QstInfo',
                component: QstInfoView
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to,from) => {
    let userInfo = useUserInfoStore();
    if (!userInfo.isLogon && to.name !== 'Login'){
        return { name: 'Login' }
    }
})
const pinia = createPinia()

let app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
