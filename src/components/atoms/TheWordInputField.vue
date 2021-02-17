<template>
  <div>
    <input
      v-model="localValue"
      type="text"
      placeholder="Type the word above here"
      class="block text-2xl text-center p-10 w-full"
    >
  </div>
</template>

<style lang="scss" scoped>
div {
  input[type="text"] {
    background-color: $black;
    border: none;
    box-sizing: border-box;
    border-radius: 0;
    color: $text-white-primary;
    -webkit-appearance: none;
    appearance: none;

    &:focus {
      outline: none;
    }
  }
}
</style>

<script>
export default {
  name: 'TheWordInputField',
  props: {
    value: {
      type: String
    }
  },
  computed: {
    localValue: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  }
}
</script>