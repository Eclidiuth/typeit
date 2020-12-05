<template>
  <li>
    <slot />
  </li>
</template>

<script>
export default {
  name: 'TheWordListItem'
}
</script>

<style lang="scss" scoped>
li {
  background-color: $text-white-primary;
  border-radius: 8px;
  color: $text-black-primary;
  display: inline-block;
  padding: 8px;
}
</style>