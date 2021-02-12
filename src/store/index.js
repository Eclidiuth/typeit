import Vue     from 'vue'
import Vuex    from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wordLists: [
      {
        name: 'テスト用データ1',
        words: ['a', 'b', 'c'],
        timeRecords: []
      },
      {
        name: 'テスト用データ2',
        words: ['ab', 'cd', 'ef'],
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
        words: [
          'webpack.config.js',
          'postcss.config.js',
          'vue.config.js',
          'jsconfig.js',
          'babel.config.js',
          '.babelrc',
          '.eslintrc'
        ],
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
      },
      {
        name: 'Redux',
        words: [
          "import { configureStore } from '@reduxjs/toolkit'",
          "import { createSlice } from '@reduxjs/toolkit'",
          "import { Provider } from 'react-redux'",
          "import { useSelector, useDispatch } from '@reduxjs/toolkit'",
          "export const { actionCreator1 } = hogeSlice.actions",
          "export default hogeSlice.reducer",
          "export default configureStore({reducer: { hoge: hogeReducer }})",
          "export const selectHoge = state => state.hoge.value",
          "const hoge = useSelector(selectHoge)",
          "const dispatch = useDispatch()"
        ],
        timeRecords: [
          {
            time: 135.1,
            date: '2020/12/22 16:37:48'
          }
        ]
      }
    ]
  },
  getters: {
    wordLists: state => state.wordLists,
    findRecordByName: state => wordListName => {
      const wordList = state.wordLists.filter(wordList => wordList.name === wordListName)
      return wordList && wordList[0].timeRecords
    }
  },
  mutations: {
    setWordLists: (state, payload) => state.wordLists = payload,
    setWordListWords: (state, payload) => {
      const wordListIndex = state.wordLists.findIndex(wordList => wordList.name === payload.wordListName)
      state.wordLists[wordListIndex].words = payload.wordListWords
    },
    addWordList: (state, wordList) => {
      state.wordLists.push({
        name: wordList.name,
        words: wordList.words,
        timeRecords: []
      })
    },
    deleteWordList: (state, wordListName) => {
      const index = state.wordLists.findIndex(wordList => wordList.name === wordListName)
      if(index != -1){
        state.wordLists.splice(index, 1)
      }
    },
    addTimeRecord: (state, payload) => {
      const wordListIndex = state.wordLists.findIndex(wordList => wordList.name === payload.wordListName)
      state.wordLists[wordListIndex].timeRecords.push(payload.timeRecord)
    }
  },
  actions: {
    updateWordLists: ({ commit }, payload) => commit('setWordLists', payload),
    updateWordListWords: ({ commit }, payload) => commit('setWordListWords', payload),
    addWordList: ({ commit }, wordListName) => commit('addWordList', wordListName),
    deleteWordList: ({ commit }, wordListName) => commit('deleteWordList', wordListName),
    addTimeRecord: ({ commit, state }, payload) => {
      commit('addTimeRecord', payload)
      localStorage.setItem('wordLists', JSON.stringify(state.wordLists))
    }
  },
})
