<template>
  <div class="w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="video in videos" 
        :key="video.id"
        class="cursor-pointer group"
      >
        <div class="relative mb-3 overflow-hidden rounded-lg bg-[#222222]">
          <img 
            :src="video.thumbnail" 
            :alt="video.title"
            class="w-full h-56 object-cover group-hover:brightness-75 transition"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const videos = ref([
  {
    id: 1,
    title: 'Üks',
    channel: 'Tech Talk EE',
    channelAvatar: 'https://via.placeholder.com/36?text=TT',
    thumbnail: 'https://www.slideteam.net/media/catalog/product/cache/1280x720/g/o/golden_trophy_with_number_one_position_stock_photo_Slide01.jpg',
    duration: '12:45',
    views: '125K vaatamist',
    uploadedAt: '2 nädalat tagasi'
  },
  {
    id: 2,
    title: 'Vue.js',
    channel: 'Code Masters',
    channelAvatar: 'https://via.placeholder.com/36?text=CM',
    thumbnail: 'https://cdn.shopify.com/s/files/1/0533/2089/files/vuejs-tutorial.png?v=1509471047',
    duration: '25:30',
    views: '89K vaatamist',
    uploadedAt: '1 kuu tagasi'
  },
  {
    id: 3,
    title: 'Eesti',
    channel: 'Muusika Elu',
    channelAvatar: 'https://via.placeholder.com/36?text=ME',
    thumbnail: 'https://minuaeg.com/wp-content/uploads/2020/06/Eesti.jpg',
    duration: '1:05:20',
    views: '250K vaatamist',
    uploadedAt: '1 nädal tagasi'
  },
  {
    id: 4,
    title: 'Sport',
    channel: 'Sport Uudised',
    channelAvatar: 'https://via.placeholder.com/36?text=SU',
    thumbnail: 'https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg',
    duration: '15:50',
    views: '45K vaatamist',
    uploadedAt: '3 päeva tagasi'
  },
  {
    id: 5,
    title: 'Javascript sigma',
    channel: 'Dev Academy',
    channelAvatar: 'https://via.placeholder.com/36?text=DA',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlGdAXqFAzC873pjFmVEOqdpot0I2nRqwxMA&s',
    duration: '8:15',
    views: '156K vaatamist',
    uploadedAt: '5 päeva tagasi'
  },
  {
    id: 6,
    title: 'Fotograafia',
    channel: 'Photo Studio',
    channelAvatar: 'https://via.placeholder.com/36?text=PS',
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
    duration: '22:10',
    views: '98K vaatamist',
    uploadedAt: '1 nädal tagasi'
  },
  {
    id: 7,
    title: 'Toidud',
    channel: 'Chef Kitchen',
    channelAvatar: 'https://via.placeholder.com/36?text=CK',
    thumbnail: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    duration: '18:45',
    views: '320K vaatamist',
    uploadedAt: '2 päeva tagasi'
  },
  {
    id: 8,
    title: 'Python',
    channel: 'Travel Vlog',
    channelAvatar: 'https://via.placeholder.com/36?text=TV',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1280px-Python-logo-notext.svg.png',
    duration: '45:30',
    views: '78K vaatamist',
    uploadedAt: '1 nädal tagasi'
  }
])
</script>
