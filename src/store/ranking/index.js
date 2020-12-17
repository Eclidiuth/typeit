export default {
  namespaced: true,

  state: () => ({
    records: [
      {
        name: 'テスト用データ2',
        timeRecords: [
          {
            time: 10,
            date: '2020/12/11 00:00:00'
          },
          {
            time: 15,
            date: '2020/12/11 00:00:30'
          },
          {
            time: 25,
            date: '2020/12/11 00:01:00'
          },
          {
            time: 20,
            date: '2020/12/11 00:01:00'
          },
        ]
      },
      {
        name: 'JavaScript config files',
        timeRecords: [
          {
            time: 20.1,
            date: '2020/12/16 00:00:00'
          },
          {
            time: 22.2,
            date: '2020/12/16 00:05:00'
          },
          {
            time: 24.0,
            date: '2020/12/16 00:10:00'
          },
        ]
      }
    ]
  }),
  getters: {
    records: state => state.records,

    findRecordByName: state => name => {
      const result = state.records.filter(record => record.name === name)
      return result ? result[0] : null
    },
  },
  mutations: {
    setRecords: (state, newRecords) => state.records = newRecords,
    setTimeRecord: (state, { recordName, newTimeRecords }) => {
      const index = state.records.findIndex(record => record.name === recordName)
      if(state.records[index]){
        state.records[index].timeRecords = newTimeRecords
      } else {
        state.records.push({
          name: recordName,
          timeRecords: newTimeRecords
        })
      }
    }
  },
  actions: {
    updateRecords: ({ commit }, newRecords) => commit('setRecords', newRecords),
    updateTimeRecord: ({ commit }, payload) => commit('setTimeRecord', payload),
  }
}