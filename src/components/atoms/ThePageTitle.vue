<template>
  <h1 class="text-2xl py-4">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 300;
}
</style>

<script>
export default {
  name: 'ThePageTitle'
}
</script>