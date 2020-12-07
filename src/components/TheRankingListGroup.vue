<template>
  <div>
    <h3>Rankings</h3>
    <ul>
      <li class="rankingList-header rankingList-item">
        <span class="rankingList-recordNumber">No.</span>
        <span class="rankingList-recordTime">Time</span>
        <span class="rankingList-recordDate">Date</span>
      </li>
      <the-ranking-list-item v-for="record in records" :key="record.number" 
        :number="record.number" :time="record.time" :date="record.date"
        class="rankingList-item" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    .rankingList-header {
        background-color: $white-secondary;
        display: flex;

        .rankingList-recordNumber,
        .rankingList-recordTime,
        .rankingList-recordDate {
          display: block;
          font-size: $fsize-body-1;
          padding: 16px;
        }

        .rankingList-recordNumber {
          flex: 1 1 5%;
          text-align: center;
        }
        .rankingList-recordTime {
          flex: 1 1 50%;
        }
        .rankingList-recordDate {
          flex: 1 1 45%;
        }
    }

    .rankingList-item {
      &:nth-child(odd) {
        background-color: $white-secondary;
      }
    }
  }
}
</style>

<script>
import TheRankingListItem from '@/components/TheRankingListItem.vue'

export default {
  name: 'TheRankingListGroup',
  components: {
    TheRankingListItem
  },
  data(){
    return ({
      records: [
        {
          number: 1,
          time  : 20.0,
          date  : new Date()  
        },
        {
          number: 2,
          time  : 25.0,
          date  : new Date()  
        },
        {
          number: 3,
          time  : 30.0,
          date  : new Date()  
        },
      ]
    })
  }
}
</script>