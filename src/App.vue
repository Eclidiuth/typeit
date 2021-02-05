<template>
  <div id="app">
    <the-nav />
    <router-view />
  </div>
</template>

<script>
import "tailwindcss/tailwind.css"
import TheNav from '@/components/molecules/TheNav.vue'
import '@/scss/style.scss'
export default {
  components: {
    TheNav
  }
}
</script>