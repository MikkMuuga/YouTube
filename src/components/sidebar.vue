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

const yourItems = [
  { icon: 'history', label: 'Ajalugu', route: '/history' },
  { icon: 'playlist', label: 'Esitusloendid', route: '/playlists' },
  { icon: 'watchlater', label: 'Hiljem vaatamiseks', route: '/watch-later' },
  { icon: 'liked', label: 'Meeldinud videod', route: '/liked-videos' },
  { icon: 'your', label: 'Teie videod', route: '/your-videos' },
  { icon: 'offline', label: 'Offlainitud', route: '/offline' },
]

const discoverItems = [
  { icon: 'music', label: 'Muusika', route: '/music' },
  { icon: 'games', label: 'Mängud', route: '/games' },
  { icon: 'sports', label: 'Sport', route: '/sports' },
]

const getIcon = (name) => {
  const icons = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    shorts: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
    history: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    playlist: 'M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.645-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z',
    watchlater: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    liked: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    your: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    offline: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    music: 'M12 3v9.28c-.47-.46-1.12-.75-1.84-.75-2.2 0-4 1.79-4 4s1.8 4 4 4 4-1.79 4-4V7h4V3h-6z',
    games: 'M21 6h-7V3c0-1.1-.9-2-2-2s-2 .9-2 2v3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4 10h-4v4h-2v-4H7v-2h4v-4h2v4h4v2z',
    sports: 'M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0',
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

      <div class="flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-xl cursor-pointer">
        <span class="font-bold text-base">Teie ></span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>

      <div class="space-y-0.5">
        <button
          v-for="item in yourItems"
          :key="item.label"
          @click="activeItem = item.label"
          :class="[
            'w-full flex items-center gap-4 px-3 py-2 rounded-xl text-sm transition-colors',
            activeItem === item.label ? 'bg-[#272727] hover:bg-[#3f3f3f]' : 'hover:bg-white/10'
          ]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path :d="getIcon(item.icon)" />
          </svg>
          <span>{{ item.label }}</span>
        </button>
      </div>

      <div class="border-t border-white/10 my-3"></div>

      <div class="flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-xl cursor-pointer">
        <span class="font-bold text-base">Avastamiseks</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>

      <div class="space-y-0.5">
        <button
          v-for="item in discoverItems"
          :key="item.label"
          @click="activeItem = item.label"
          :class="[
            'w-full flex items-center gap-4 px-3 py-2 rounded-xl text-sm transition-colors',
            activeItem === item.label ? 'bg-[#272727] hover:bg-[#3f3f3f]' : 'hover:bg-white/10'
          ]"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path :d="getIcon(item.icon)" />
          </svg>
          <span>{{ item.label }}</span>
        </button>
      </div>
      
      </div>
  </aside>
</template>
