<template>
  <div class="flex flex-col xl:flex-row gap-6">

    <div class="flex-1 min-w-0">

    <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
        <iframe v-if="video.videoUrl" :src="video.videoUrl" class="w-full h-full" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <div v-else class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
          Video pole saadaval
        </div>
      </div>

      <h1 class="text-lg font-bold mt-4 mb-3 leading-snug text-white">{{ video.title }}</h1>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div class="flex items-center gap-3">
          <img :src="video.channelAvatar" :alt="video.channel" class="w-10 h-10 rounded-full shrink-0" />
          <div class="leading-tight">
            <p class="font-semibold text-sm text-white">{{ video.channel }}</p>
            <p class="text-xs text-gray-400">{{ video.subscribers }} tellijat</p>
          </div>

          <button
            class="btn btn-sm rounded-full ml-1 transition-all"
            :class="subscribed ? 'btn-ghost border border-white/20 text-white' : 'bg-white text-black hover:bg-white/90'"
            @click="subscribed = !subscribed"
          >
            {{ subscribed ? 'Tellitud' : 'Telli' }}
          </button>

          <div v-if="subscribed" class="dropdown dropdown-bottom">
            <label tabindex="0" class="btn btn-sm btn-ghost btn-circle text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu menu-sm bg-[#282828] text-white rounded-box z-50 w-48 p-2 shadow-xl mt-1">
              <li v-for="opt in notifOptions" :key="opt.value">
                <a class="gap-2" :class="notifPref === opt.value ? 'bg-white/10' : ''" @click="notifPref = opt.value">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="opt.icon"/>
                  </svg>
                  {{ opt.label }}
                  <svg v-if="notifPref === opt.value" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">

          <div class="join rounded-full overflow-hidden">
            <button
              class="btn btn-sm join-item gap-1.5 border border-white/20 text-white hover:bg-white/10 transition-colors"
              :class="liked ? 'bg-white/20' : 'bg-transparent'"
              @click="$emit('toggleLike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :fill="liked ? 'white' : 'none'" viewBox="0 0 24 24" stroke="white" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
              </svg>
              {{ video.views.split(' ')[0] }}
            </button>
            <button
              class="btn btn-sm join-item border border-white/20 border-l-white/10 text-white hover:bg-white/10 transition-colors"
              :class="disliked ? 'bg-white/20' : 'bg-transparent'"
              @click="$emit('toggleDislike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rotate-180" :fill="disliked ? 'white' : 'none'" viewBox="0 0 24 24" stroke="white" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
              </svg>
            </button>
          </div>

          <button class="btn btn-sm btn-ghost border border-white/20 rounded-full gap-1.5 text-white hover:bg-white/10" @click="$emit('toast', 'Link kopeeritud!')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            Jagamine
          </button>

          <button
            class="btn btn-sm btn-ghost border border-white/20 rounded-full gap-1.5 text-white hover:bg-white/10 transition-colors"
            :class="saved ? 'bg-white/20' : ''"
            @click="saved = !saved"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :fill="saved ? 'white' : 'none'" viewBox="0 0 24 24" stroke="white" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            Salvesta
          </button>

          <button class="btn btn-sm btn-ghost border border-white/20 rounded-full gap-1.5 text-white hover:bg-white/10" @click="$emit('toast', 'Aitäh saadetud! 💖')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Aitäh
          </button>

          <button class="btn btn-sm btn-ghost border border-white/20 rounded-full gap-1.5 text-white hover:bg-white/10" @click="$emit('toast', 'Allalaadimine algas...')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Allalaadimine
          </button>

        </div>
      </div>

      <div
        class="mt-4 bg-[#272727] rounded-xl p-4 text-sm text-gray-300 cursor-pointer select-none"
        @click="descExpanded = !descExpanded"
      >
        <div class="flex items-center gap-2 font-semibold text-white mb-1">
          <span>{{ video.views }}</span>
          <span class="text-gray-500">·</span>
          <span>{{ video.uploadedAt }}</span>
        </div>
        <p :class="descExpanded ? '' : 'line-clamp-2'" class="text-gray-400">
          {{ video.description || 'Kirjeldus puudub.' }}
        </p>
        <span class="text-xs font-bold mt-2 block text-white">
          {{ descExpanded ? 'Näita vähem' : 'Näita rohkem' }}
        </span>
      </div>

      <div class="mt-6">
        <h3 class="text-base font-bold mb-4 text-white">{{ comments.length }} kommentaari</h3>

        <div class="flex gap-3 mb-6 items-start">
          <div class="w-10 h-10 rounded-full bg-neutral flex items-center justify-center text-sm font-bold text-white shrink-0">Y</div>
          <div class="flex-1">
            <input
              v-model="newText"
              @focus="composeFocused = true"
              @keydown.enter="postComment"
              type="text"
              placeholder="Lisage kommentaar ..."
              class="w-full bg-transparent border-b border-white/20 focus:border-white px-0 py-2 text-sm outline-none text-white transition-colors"
            />
            <div v-if="composeFocused" class="flex justify-end gap-2 mt-3">
              <button @click="cancelComment" class="btn btn-ghost btn-sm rounded-full text-white">Tühista</button>
              <button @click="postComment" :disabled="posting" class="btn btn-primary btn-sm rounded-full">
                {{ posting ? 'Postitan...' : 'Kommenteeri' }}
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <div v-for="c in comments" :key="c.id" class="flex gap-3 items-start">
            <div class="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
              :style="{ backgroundColor: avatarColor(c.author) }">
              {{ (c.author || '?').charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-sm font-medium text-white">@{{ c.author.toLowerCase() }}</span>
                <span class="text-xs text-gray-500">{{ timeAgo(c.createdAt) }}</span>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{{ c.text }}</p>
              <div class="flex items-center gap-1 mt-2">
                <button @click="toggleLike(c.id)" class="btn btn-ghost btn-xs btn-circle" :class="c.liked ? 'text-blue-400' : 'text-gray-500'">
                  <i class="ti ti-thumb-up text-base"></i>
                </button>
                <span class="text-xs text-gray-500 mr-1">{{ c.likes || '' }}</span>
                <button class="btn btn-ghost btn-xs btn-circle text-gray-500">
                  <i class="ti ti-thumb-down text-base"></i>
                </button>
                <button class="btn btn-ghost btn-xs rounded-full text-sm font-medium text-gray-400 ml-1">Vasta</button>
              </div>
            </div>
            <button class="btn btn-ghost btn-xs btn-circle text-gray-600">
              <i class="ti ti-dots-vertical text-base"></i>
            </button>
            <button
              @click="deleteComment(c.id)"
              class="btn btn-ghost btn-xs btn-circle text-gray-600 hover:text-red-400">
              <i class="ti ti-trash text-base"></i>
            </button>
          </div>
        </div>

        <p v-if="!comments.length" class="text-sm text-gray-500">Puuduvad kommentaarid.</p>
      </div>

    </div>

    <div class="w-full xl:w-[380px] shrink-0">
      <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Soovitatavad</p>
      <div class="flex flex-col gap-3">
        <div
          v-for="rec in recommended"
          :key="rec.id"
          class="flex gap-3 cursor-pointer group/rec"
          @click="$emit('select', rec)"
        >
          <div class="relative shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-[#222]">
            <img :src="rec.thumbnail" :alt="rec.title" class="w-full h-full object-cover group-hover/rec:brightness-75 transition" />
            <span class="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{{ rec.duration }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white/80 line-clamp-2 leading-snug group-hover/rec:text-white transition">{{ rec.title }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ rec.channel }}</p>
            <p class="text-xs text-gray-500">{{ rec.views }} · {{ rec.uploadedAt }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  video: { type: Object, required: true },
  recommended: { type: Array, default: () => [] },
  liked: { type: Boolean, default: false },
  disliked: { type: Boolean, default: false }
})

defineEmits(['select', 'toast', 'toggleLike', 'toggleDislike'])

const playing = ref(false)
const subscribed = ref(false)
const notifPref = ref('all')
const saved = ref(false)
const descExpanded = ref(false)
const API = 'http://localhost:4000'

const notifOptions = [
  { label: 'Lasku kõik', value: 'all', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { label: 'Personaliseeritud', value: 'personalized', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { label: 'Lülita välja', value: 'off', icon: 'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.354 5.354l2.828 2.828.793-.793a2 2 0 00-2.828-2.828l-.793.793zm1.966 4.261l-2.828-2.828.793-.793a2 2 0 112.828 2.828l-.793.793zm4.243-1.242a2 2 0 00-2.828-2.828l-.793.793 2.828 2.828.793-.793z' }
]

const activeCategory = ref('Kõik')

const comments = ref([])
const newText = ref('')
const composeFocused = ref(false)
const posting = ref(false)

watch(() => props.video, (v) => {
  comments.value = v?.comments ? [...v.comments] : []
}, { immediate: true })

function avatarColor(name) {
  const colors = ['#ef4444','#f97316','#f59e0b','#84cc16','#06b6d4','#3b82f6','#8b5cf6','#ec4899']
  if (!name) return colors[0]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function timeAgo(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const sec = Math.floor(diff / 1000)
  if (sec < 10) return 'just now'
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h`
  return Math.floor(hr / 24) + 'd'
}

function toggleLike(id) {
  const c = comments.value.find(x => x.id === id)
  if (!c) return
  c.liked = !c.liked
  c.likes += c.liked ? 1 : -1
}

function cancelComment() {
  newText.value = ''
  composeFocused.value = false
}

async function postComment() {
  if (!newText.value.trim()) return
  posting.value = true
  try {
    const res = await fetch(`${API}/api/videos/${props.video.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText.value.trim() })
    })
    if (!res.ok) throw new Error('Post failed')
    await fetchComments()
    cancelComment()
  } catch (e) {
    console.error(e)
  } finally {
    posting.value = false
  }
}
async function deleteComment(commentId) {
  try {
    await fetch(`${API}/api/videos/${props.video.id}/comments/${commentId}`, {
      method: 'DELETE'
    })
    comments.value = comments.value.filter(c => c.id !== commentId)
  } catch (e) {
    console.error(e)
  }
}
async function fetchComments() {
  const res = await fetch(`${API}/api/videos/${props.video.id}/comments`)
  const data = await res.json()
  comments.value = data
}

</script>

<style scoped>
</style>
