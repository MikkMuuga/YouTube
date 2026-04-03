<script setup>
import { ref } from 'vue'

defineProps({
  isOpen: { type: Boolean, required: true }
})

defineEmits(['close'])

const activeItem = ref('Home')

const mainItems = [
  { icon: 'home', label: 'Avaleht' },
  { icon: 'shorts', label: 'Shorts' },
]

const subscriptions = [
  { name: 'Viva La Dirt Leag...', color: 'bg-teal-500', hasUpdate: true },
  { name: 'Venttu', color: 'bg-orange-400', hasUpdate: true },
  { name: 'NileBlue', color: 'bg-blue-500', hasUpdate: false },
  { name: 'Jaden Williams', color: 'bg-red-400', hasUpdate: true },
]

const getIcon = (name) => {
  const icons = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    shorts: 'M10 14.65v-5.3L15 12l-5 2.65zM17.61 5.43l-3.32-1.8c-1.42-.77-3.15-.26-3.92 1.15L8.91 7.42c-.22.4-.07.89.33 1.11.4.22.89.07 1.11-.33l1.46-2.64c.38-.7.21-1.58-.49-1.97-.71-.39-1.6-.22-1.99.49L7.23 7.82 4.14 9.5c-1.42.77-1.93 2.54-1.15 3.96l3.32 1.8c.77 1.42 2.54 1.93 3.96 1.15l1.46-.79c.4-.22.89-.07 1.11.33.22.4.07.89-.33 1.11l-1.46.79c-1.42.77-1.93 2.54-1.15 3.96l3.32 1.8c1.42.77 3.15.26 3.92-1.15l1.46-2.64c.22-.4.07-.89-.33-1.11-.4-.22-.89-.07-1.11.33l-1.46 2.64c-.38.7-.21 1.58.49 1.97.71.39 1.6.22 1.99-.49l2.1-3.75 3.09-1.68c1.42-.77 1.93-2.54 1.15-3.96l-3.32-1.8z',
  }
  return icons[name] || icons.home
}
</script>

<template>
  <aside
    class="fixed left-0 top-14 h-[calc(100vh-56px)] w-60 bg-[#0f0f0f] text-white z-40 overflow-y-auto custom-scrollbar transition-transform md:translate-x-0"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="px-3 py-3 space-y-1">
      <button
        v-for="item in mainItems"
        :key="item.label"
        @click="activeItem = item.label"
        :class="[
          'w-full flex items-center gap-6 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium',
          activeItem === item.label ? 'bg-[#272727] hover:bg-[#3f3f3f]' : 'hover:bg-white/10'
        ]"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path :d="getIcon(item.icon)" />
        </svg>
        {{ item.label }}
      </button>

      <div class="border-t border-white/10 my-3"></div>

      <div class="flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-xl cursor-pointer">
        <span class="font-bold text-base">Tellimused</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>

      <div class="space-y-0.5">
        <button
          v-for="sub in subscriptions"
          :key="sub.name"
          class="w-full flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-xl text-sm transition-colors group"
        >
          <div :class="['w-6 h-6 rounded-full shrink-0', sub.color]"></div>
          <span class="flex-1 text-left truncate">{{ sub.name }}</span>
          <div v-if="sub.hasUpdate" class="w-1 h-1 bg-blue-500 rounded-full"></div>
        </button>
        
        <button class="w-full flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-xl text-sm transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          <span>Kuva rohkem</span>
        </button>
      </div>

      <div class="border-t border-white/10 my-3"></div>
      
      </div>
  </aside>
</template>
