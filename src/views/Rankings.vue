<template>
  <ti-sheet id="rankings">
    <div class="px-8">
      <the-page-title>Rankings</the-page-title>
      <div v-for="(record, index) in records" :key="index">
        <h2>{{ record.name }}</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">No.</th>
                <th class="text-left">Time</th>
                <th class="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(timeRecord, index) in record.timeRecords" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ timeRecord.time }}</td>
                <td>{{ timeRecord.date }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </ti-sheet>
</template>


<style lang="scss" scoped>
#rankings {
  h2 {
    font-size: $fsize-body-1;
    font-weight: normal;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import ThePageTitle from '../components/atoms/ThePageTitle.vue'
import TiSheet from '../components/atoms/TiSheet.vue'

export default {
  components: {
    'ti-sheet': TiSheet,
    ThePageTitle
  },
  name: 'Rankings',
  computed: {
    ...mapGetters('ranking', ['records'])
  },
  mounted(){
    const records = localStorage.getItem('ranking/records')
    if(records){
      this.$store.dispatch('ranking/updateRecords', JSON.parse(records))
    }
  }
}
</script>