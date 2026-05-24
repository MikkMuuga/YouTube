<template>
  <div class="w-full">

    <div v-if="loading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-white"></span>
    </div>

    <div v-else-if="error" class="text-red-400 text-center py-20">{{ error }}</div>

    <div v-else-if="!activeVideo && !loading && !error && filteredVideos.length === 0" class="text-center text-gray-300 py-20">
      Ei leitud ühtegi videot otsingus "{{ searchQuery }}".
    </div>

    <div v-else-if="!activeVideo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <VideoCard
        v-for="video in filteredVideos"
        :key="video.id"
        :video="video"
        @select="openVideo"
      />
    </div>

    <VideoWatch
      v-else
      :video="activeVideo"
      :recommended="recommended"
      :liked="liked"
      :disliked="disliked"
      @select="openVideo"
      @toast="showToast"
      @toggleLike="toggleLike"
      @toggleDislike="toggleDislike"
    />

    <button
      v-if="activeVideo"
      class="fixed top-4 left-4 z-50 btn btn-sm btn-ghost bg-[#282828]/90 backdrop-blur text-white gap-1.5 shadow border border-white/10"
      @click="closeVideo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Tagasi
    </button>

    <transition name="fade-up">
      <div v-if="toast" class="toast toast-top toast-center z-[999]">
        <div class="alert bg-[#333] text-white border-0 shadow-lg text-sm py-2 px-4 rounded-xl">{{ toast }}</div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import VideoCard from './VideoCard.vue'
import VideoWatch from './VideoWatch.vue'
import { fetchVideos } from './videos.js'
import { useVideoPlayer } from './useVideoPlayer.js'
import { defineProps } from 'vue'

const videos = ref([])
const loading = ref(true)
const error = ref(null)
const route = useRoute()

const searchQuery = computed(() => (route.query.search || '').toString().trim())

onMounted(async () => {
  try {
    videos.value = await fetchVideos()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const {
  activeVideo,
  liked,
  disliked,
  toast,
  openVideo,
  closeVideo,
  showToast,
  toggleLike,
  toggleDislike,
} = useVideoPlayer()

const props = defineProps({
  activeCategory: { type: String, default: 'Kõik' }
})
const filteredVideos = computed(() => {
  if (props.activeCategory === 'Kõik') return videos.value
  return videos.value.filter(video => video.category === props.activeCategory)
})

const recommended = computed(() =>
  videos.value.filter(v => v.id !== activeVideo.value?.id)
)
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>