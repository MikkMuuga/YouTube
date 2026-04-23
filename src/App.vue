<script setup>
import { ref } from 'vue'
import Navbar from './components/navbar.vue'
import Sidebar from './components/sidebar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <Navbar :sidebarOpen="sidebarOpen" @toggleSidebar="sidebarOpen = !sidebarOpen" />
  <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
  <main class="pt-14 pl-0 md:pl-0 bg-black min-h-screen">
    <div class="p-4 max-w-7xl mx-auto">
      <router-view />
    </div>
  </main>
</template>

<style scoped></style>
