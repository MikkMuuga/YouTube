<script setup>
import { ref } from 'vue'
import Navbar from './components/navbar.vue'
import Sidebar from './components/sidebar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <Navbar :sidebarOpen="sidebarOpen" @toggleSidebar="sidebarOpen = !sidebarOpen" />
  <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  </div>
</template>

<style scoped></style>
