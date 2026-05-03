import { ref } from 'vue'

export function useVideoPlayer() {
  const activeVideo = ref(null)
  const playing = ref(false)
  const subscribed = ref(false)
  const notifPref = ref('all')
  const liked = ref(false)
  const disliked = ref(false)
  const saved = ref(false)
  const descExpanded = ref(false)
  const toast = ref('')
  let toastTimer = null

  function openVideo(video) {
    activeVideo.value = video
    playing.value = false
    subscribed.value = false
    liked.value = false
    disliked.value = false
    saved.value = false
    descExpanded.value = false
    notifPref.value = 'all'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeVideo() {
    activeVideo.value = null
    playing.value = false
  }

  function showToast(msg) {
    toast.value = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toast.value = '' }, 2500)
  }

  function toggleLike() {
    liked.value = !liked.value
    if (liked.value) disliked.value = false
  }

  function toggleDislike() {
    disliked.value = !disliked.value
    if (disliked.value) liked.value = false
  }

  return {
    activeVideo,
    playing,
    subscribed,
    notifPref,
    liked,
    disliked,
    saved,
    descExpanded,
    toast,
    openVideo,
    closeVideo,
    showToast,
    toggleLike,
    toggleDislike,
  }
}