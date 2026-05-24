<template>
  <Videogrid :activeCategory="props.activeCategory" />
</template>

<script setup>
import Videogrid from './VideoC/Videogrid.vue'

const props = defineProps({
  activeCategory: { type: String, default: 'Kõik' }
})
</script>

