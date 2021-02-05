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
.ti-sheet {
  min-width: 720px;
}
</style>