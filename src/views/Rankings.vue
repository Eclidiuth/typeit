<template>
  <ti-sheet id="rankings">
    <div class="w-11/12 mx-auto py-4">
      <the-page-title>Rankings</the-page-title>
      <div v-for="(wordList, index) in wordLists" :key="index" class="my-4">
        <template v-if="wordList.timeRecords.length !== 0">
          <h2>{{ wordList.name }}</h2>
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
                <tr v-for="(timeRecord, index) in wordList.timeRecords" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ timeRecord.time }} seconds</td>
                  <td>{{ timeRecord.date }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
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
    ...mapGetters(['wordLists']),
  }
}
</script>