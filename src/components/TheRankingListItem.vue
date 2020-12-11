<template>
  <li>
    <span class="rankingList-recordNumber">
      {{ number }}
    </span>
    <span class="rankingList-recordTime">
      {{ time }} seconds
    </span>
    <span class="rankingList-recordDate">
      {{ recordDate }}
    </span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;

  .rankingList-recordNumber,
  .rankingList-recordTime,
  .rankingList-recordDate {
    display: block;
    padding: 16px;
  }

  .rankingList-recordNumber {
    font-size: $fsize-body-1;
    flex: 1 1 5%;
    text-align: center;
  }
  .rankingList-recordTime {
    font-size: $fsize-body-1;
    flex: 1 1 65%;
  }
  .rankingList-recordDate {
    color: $text-black-secondary;
    font-size: $fsize-body-2;
    flex: 1 1 30%;
  }
}
</style>

<script>
export default {
  name: 'TheRankingListItem',
  props: {
    number: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  computed: {
    recordDate(){
      const [yyyymmdd, hhmmss] = this.date.split(" ")
      const [year, month, day] = yyyymmdd.split("/")
      const [hour, minute, second] = hhmmss.split(":")

      return `${year}/${month}/${day}/ ${hour}:${minute}:${second}`
    }
  }
}
</script>