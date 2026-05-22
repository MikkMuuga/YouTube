<template>
  <div class="flex flex-col xl:flex-row gap-8 p-4 md:p-6 max-w-[1700px] mx-auto bg-[#0f0f0f] min-h-screen text-white">
    
    <div class="flex-1 min-w-0">
      
      <div class="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group/player shadow-2xl ring-1 ring-white/10">
        <div class="w-full h-full flex flex-col items-center justify-center bg-[#111]">
          <img
            :src="video.thumbnail"
            :alt="video.title"
            class="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover/player:scale-105"
          />
          <div class="relative z-10 flex flex-col items-center gap-4">
            <button
              class="btn btn-circle btn-lg h-20 w-20 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-orange-500/20 shadow-2xl"
              @click="playing = !playing"
            >
              <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <span class="text-white/80 font-medium tracking-wide drop-shadow-md">{{ playing ? 'Mängib...' : 'Vajuta esitamiseks' }}</span>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
          <div class="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer group/progress" @click="$emit('toast', 'Edasta video!')">
            <div class="h-full bg-red-600 rounded-full relative transition-all duration-300" :style="{ width: playing ? '35%' : '0%' }">
               <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform"></div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-white text-sm">
            <button @click="playing = !playing" class="hover:scale-110 transition-transform">
              <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <span class="tabular-nums font-light text-gray-200">{{ playing ? '4:22' : '0:00' }} / {{ video.duration }}</span>
            <div class="ml-auto flex items-center gap-4">
              <div class="flex items-center gap-2 group/vol">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                <div class="w-16 h-1 bg-white/30 rounded-full overflow-hidden"><div class="h-full w-3/4 bg-white"></div></div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white cursor-pointer hover:text-red-500 transition-colors" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <h1 class="text-xl md:text-2xl font-black mt-5 mb-4 leading-tight tracking-tight">{{ video.title }}</h1>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div class="flex items-center gap-4">
          <div class="relative">
            <img :src="video.channelAvatar" :alt="video.channel" class="w-11 h-11 rounded-full object-cover ring-2 ring-white/5" />
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 border-2 border-[#0f0f0f] rounded-full"></div>
          </div>
          <div class="min-w-0">
            <p class="font-bold text-base hover:text-gray-300 cursor-pointer truncate">{{ video.channel }}</p>
            <p class="text-xs text-gray-400">{{ video.subscribers }} tellijat</p>
          </div>

          <button
            class="btn btn-sm px-5 rounded-full ml-2 font-bold transition-all duration-300"
            :class="subscribed ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-black hover:bg-gray-200'"
            @click="subscribed = !subscribed"
          >
            {{ subscribed ? 'Tellitud' : 'Telli' }}
          </button>

          <div v-if="subscribed" class="dropdown dropdown-bottom">
            <label tabindex="0" class="btn btn-sm btn-ghost btn-circle bg-white/5 hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu menu-sm bg-[#212121] text-white rounded-xl z-50 w-52 p-2 shadow-2xl mt-2 border border-white/10">
              <li v-for="opt in notifOptions" :key="opt.value">
                <a class="py-3 rounded-lg flex items-center gap-3 hover:bg-white/5" @click="notifPref = opt.value">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="opt.icon"/>
                  </svg>
                  <span class="flex-1">{{ opt.label }}</span>
                  <div v-if="notifPref === opt.value" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          <div class="flex items-center bg-white/10 rounded-full p-0.5 shrink-0">
            <button
              class="flex items-center gap-2 px-4 py-1.5 rounded-l-full hover:bg-white/10 transition-colors border-r border-white/10 font-medium text-sm"
              @click="$emit('toggleLike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="liked ? 'fill-white' : 'fill-none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
              </svg>
              {{ video.views.split(' ')[0] }}
            </button>
            <button
              class="px-4 py-1.5 rounded-r-full hover:bg-white/10 transition-colors"
              @click="$emit('toggleDislike')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rotate-180" :class="disliked ? 'fill-white' : 'fill-none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
              </svg>
            </button>
          </div>

          <button class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors shrink-0" @click="$emit('toast', 'Link kopeeritud!')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            Jaga
          </button>

          <button class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors shrink-0" @click="$emit('toast', 'Aitäh saadetud!')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Täna
          </button>
        </div>
      </div>

          <div
            class="mt-6 bg-white/5 hover:bg-white/[0.08] rounded-2xl p-4 transition-colors cursor-pointer border border-white/5"
            @click="descExpanded = !descExpanded"
          >
        <div class="flex items-center gap-3 font-bold text-sm mb-2 text-gray-100">
          <span>{{ video.views }} vaatamist</span>
          <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>{{ video.uploadedAt }}</span>
        </div>
        <p :class="descExpanded ? '' : 'line-clamp-2'" class="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {{ video.description || 'Kirjeldus puudub.' }}
        </p>
        <button class="text-sm font-bold mt-3 text-white hover:underline transition-all">
          {{ descExpanded ? 'Näita vähem' : 'Loe edasi' }}
        </button>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-bold mb-4">{{ comments.length }} kommentaari</h3>
        <div class="flex gap-3 mb-8 items-start">
          <div class="avatar placeholder flex-shrink-0">
            <div class="rounded-full w-10 bg-neutral text-neutral-content text-sm font-bold flex items-center justify-center">
            </div>
          </div>
          <div class="flex-1">
            <input
              v-model="newText"
              @focus="composeFocused = true"
              type="text"
              placeholder="Lisage kommentaar ..."
              class="w-full bg-transparent border-b border-white/20 focus:border-white px-0 py-2 text-sm outline-none transition-colors"
            />
            <div v-if="composeFocused" class="flex justify-end gap-2 mt-3">
              <button @click="cancelComment" class="btn btn-ghost btn-sm rounded-full">Tühista</button>
              <button @click="postComment" :disabled="posting" class="btn btn-primary btn-sm rounded-full">
                {{ posting ? 'Postitan...' : 'Kommenteeri' }}
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div v-for="c in comments" :key="c.id" class="flex gap-3 items-start">
            <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              :style="{ backgroundColor: avatarColor(c.author) }">
              {{ (c.author || '?').charAt(0) }}
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-sm font-medium">@{{ c.author.toLowerCase() }}</span>
                <span class="text-xs text-gray-500">{{ timeAgo(c.createdAt) }}</span>
              </div>
              <p class="text-sm text-gray-200 leading-relaxed whitespace-pre-line">{{ c.text }}</p>

              <div class="flex items-center gap-1 mt-2">
                <button
                  @click="toggleLike(c.id)"
                  class="btn btn-ghost btn-xs btn-circle"
                  :class="c.liked ? 'text-blue-400' : 'text-gray-500'"
                >
                  <i class="ti ti-thumb-up text-base"></i>
                </button>
                <span class="text-xs text-gray-500 mr-1">{{ c.likes || '' }}</span>
                <button class="btn btn-ghost btn-xs btn-circle text-gray-500">
                  <i class="ti ti-thumb-down text-base"></i>
                </button>
                <button class="btn btn-ghost btn-xs rounded-full text-sm font-medium text-gray-300 ml-1">Vasta</button>
              </div>
            </div>

            <button class="btn btn-ghost btn-xs btn-circle text-gray-600 self-start mt-1">
              <i class="ti ti-dots-vertical text-base"></i>
            </button>
          </div>
        </div>

        <p v-if="!comments.length" class="text-sm text-gray-500">Puuduvad kommentaarid.</p>
      </div>
    </div>

    <div class="w-full xl:w-[400px] shrink-0">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-bold uppercase tracking-widest text-gray-400">Järgmisena</h2>
        <div class="flex items-center gap-2 text-xs font-bold">
          AUTOMAATESITUS
          <input type="checkbox" class="toggle toggle-xs toggle-primary" checked />
        </div>
      </div>
      
      <div class="flex flex-col gap-4">
        <div
          v-for="rec in recommended"
          :key="rec.id"
          class="flex gap-3 group/rec cursor-pointer"
          @click="$emit('select', rec)"
        >
          <div class="relative shrink-0 w-44 aspect-video rounded-xl overflow-hidden bg-[#222]">
            <img :src="rec.thumbnail" :alt="rec.title" class="w-full h-full object-cover transition-transform duration-500 group-hover/rec:scale-110 group-hover/rec:brightness-75" />
            <span class="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">{{ rec.duration }}</span>
          </div>
          <div class="flex-1 min-w-0 py-1">
            <h3 class="text-sm font-bold text-gray-100 line-clamp-2 leading-snug group-hover/rec:text-blue-400 transition-colors">{{ rec.title }}</h3>
            <p class="text-xs text-gray-400 mt-1.5 flex items-center gap-1 hover:text-white transition-colors">
              {{ rec.channel }}
              <svg class="w-3 h-3 fill-gray-400" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM10 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/></svg>
            </p>
            <p class="text-[11px] text-gray-500 mt-0.5 font-medium">{{ rec.views }} • {{ rec.uploadedAt }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  video: { type: Object, required: true },
  recommended: { type: Array, required: true },
  liked: { type: Boolean, default: false },
  disliked: { type: Boolean, default: false },
})

defineEmits(['select', 'toast', 'toggleLike', 'toggleDislike'])

const playing = ref(false)
const subscribed = ref(false)
const notifPref = ref('all')
const saved = ref(false)
const descExpanded = ref(false)

const notifOptions = [
  {
    value: 'all',
    label: 'Kõik',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
  },
  {
    value: 'personal',
    label: 'Isiklikud',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    value: 'none',
    label: 'Mitte ühtegi',
    icon: 'M6 18L18 6M6 6l12 12'
  },
]

const comments = ref(props.video.comments ? [...props.video.comments] : [])
const newText = ref('')
const composeFocused = ref(false)
const posting = ref(false)

watch(() => props.video, (v) => {
  console.log('video prop:', v?.id, 'comments:', v?.comments)
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
  const days = Math.floor(hr / 24)
  return `${days}d`
}

function cancelComment() {
  newText.value = ''
  composeFocused.value = false
}

async function postComment() {
  if (!newText.value.trim()) return
  posting.value = true
  try {
    const res = await fetch(`http://localhost:4000/api/videos/${props.video.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: 'You', text: newText.value.trim() })
    })
    if (!res.ok) throw new Error('Post failed')
    const created = await res.json()
    comments.value.unshift(created)
    cancelComment()
  } catch (e) {
    console.error(e)
  } finally {
    posting.value = false
  }
}

function toggleLike(id) {
  const c = comments.value.find(x => x.id === id)
  if (!c) return
  c.liked = !c.liked
  if (c.liked) c.likes = (c.likes || 0) + 1
  else c.likes = Math.max(0, (c.likes || 1) - 1)
}
</script>