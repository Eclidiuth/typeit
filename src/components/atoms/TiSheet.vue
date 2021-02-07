<template>
  <div class="ti-sheet w-9/12 mx-auto my-10 bg-white">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ti-sheet'
}
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.ti-sheet {
  min-width: $content-min-width;
  max-width: $content-max-width;
}
</style>