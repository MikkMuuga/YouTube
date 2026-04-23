import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import Home from './components/Home.vue'
import UploadVideo from './components/UploadVideo.vue'
import StartLiveStream from './components/StartLiveStream.vue'
import CreatePost from './components/CreatePost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/upload', component: UploadVideo },
  { path: '/livestream', component: StartLiveStream },
  { path: '/post', component: CreatePost },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
