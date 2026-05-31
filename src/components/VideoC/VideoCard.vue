<template>
  <div class="cursor-pointer group" @click="$emit('select', video)">
    <div class="relative mb-3 overflow-hidden rounded-lg bg-[#222222]">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="w-full h-40 object-cover group-hover:brightness-75 transition"
      />
      <span class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-semibold text-white">
        {{ video.duration }}
      </span>
    </div>
    <div class="flex gap-3">
      <img
        :src="video.channelAvatar"
        :alt="video.channel"
        class="w-10 h-10 rounded-full shrink-0"
      />
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-medium line-clamp-2 text-white/80 transition">
          {{ video.title }}
        </h3>
        <p class="text-sm text-gray-400">{{ video.channel }}</p>
        <p class="text-sm text-gray-400">{{ video.views }} • {{ video.uploadedAt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>
