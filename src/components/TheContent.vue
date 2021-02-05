<template>
  <div class="container my-5">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
.container {
  background-color: $white;
  min-width: 640px;
}
</style>

<script>
export default {
  name: 'TheContent'
}
</script>