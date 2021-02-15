<template>
  <span :class="[className]" class="block absolute py-2 px-4">{{ gameState }}</span>
</template>

<style lang="scss" scoped>
span {
  color: white;

  &.stand_by {
    background-color: #e08308;
  }

  &.playing {
    background-color: #0505c2;
  }

  &.cleared {
    background-color: #00c500;
  }
}
</style>

<script>
export default {
  name: 'TheGameStateLabel',
  props: {
    gameState: {
      type: String,
      required: true
    }
  },
  computed: {
    className(){
      if(this.gameState === "stand_by"){
        return "stand_by"
      } else if(this.gameState === "playing"){
        return "playing"
      } else if(this.gameState === "cleared"){
        return "cleared"
      }

      return ""
    }
  }
}
</script>