<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const dropdownOpen = ref(false)

defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggleSidebar'])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}
</script>

<template>
  <nav @click="closeDropdown" class="bg-[#0f0f0f] text-white px-4 h-14 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-4">
      <button 
        @click="$emit('toggleSidebar')"
        class="p-2 hover:bg-white/10 rounded-full transition"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <a href="/" class="flex items-center gap-1">
        <div class="bg-red-600 rounded-lg px-1 py-0.5">
          <svg class="w-6 h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M23.5 6.6c-.3-1.1-1.1-2-2.2-2.3C19.4 4 12 4 12 4s-7.4 0-9.3.3c-1.1.3-1.9 1.2-2.2 2.3C0 8.5 0 12 0 12s0 3.5.3 5.4c.3 1.1 1.1 2 2.2 2.3 1.9.3 9.3.3 9.3.3s7.4 0 9.3-.3c1.1-.3 1.9-1.2 2.2-2.3.3-1.9.3-5.4.3-5.4s0-3.5-.3-5.4zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
          </svg>
        </div>
        <span class="font-bold text-xl tracking-tight">YouTube</span>
        <span class="text-[10px] text-gray-400 self-start mt-1">EE</span>
      </a>
    </div>

    <div class="flex-1 max-w-[720px] ml-10 flex items-center gap-4">
      <div class="flex flex-1 items-center">
        <div class="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 ml-8 focus-within:border-blue-500 focus-within:ml-0 transition-all">
          <svg class="w-5 h-5 text-gray-400 hidden focus-within:block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            @keydown.enter="handleSearch"
            type="text"
            placeholder="Otsige"
            class="w-full bg-transparent py-2 outline-none text-white placeholder-gray-400"
          />
        </div>
        <button class="bg-[#222222] border border-l-0 border-[#303030] px-5 py-2 rounded-r-full hover:bg-[#272727] transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      <button class="p-2 bg-[#181818] hover:bg-[#272727] rounded-full transition">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-2">
      <div class="relative">
        <button 
          @click.stop="toggleDropdown"
          class="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Loomine
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div 
          v-if="dropdownOpen"
          @click.stop
          class="absolute top-full mt-2 w-48 bg-[#282828] border border-[#303030] rounded-lg shadow-lg z-50"
        >
          <router-link 
            to="/upload" 
            @click="closeDropdown"
            class="block px-4 py-2 text-sm hover:bg-[#383838] transition"
          >
            Laadi video üles
          </router-link>
          <router-link 
            to="/livestream" 
            @click="closeDropdown"
            class="block px-4 py-2 text-sm hover:bg-[#383838] transition"
          >
            Alusta otseülekannet
          </router-link>
          <router-link 
            to="/post" 
            @click="closeDropdown"
            class="block px-4 py-2 text-sm hover:bg-[#383838] transition"
          >
            Loo postitus
          </router-link>
        </div>
      </div>
      <button class="p-2 hover:bg-white/10 rounded-full relative transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute top-1 right-1 bg-red-600 text-[10px] font-bold px-1 rounded-full border-2 border-[#0f0f0f]">9+</span>
      </button>
      <div class="ml-2 w-8 h-8 rounded-full bg-gray-600 overflow-hidden cursor-pointer">
        <img src="https://via.placeholder.com/32" alt="Avatar" />
      </div>
    </div>
  </nav>
</template>
