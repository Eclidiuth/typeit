import Vue     from 'vue'
import Vuex    from 'vuex'
import Ranking from '@/store/ranking/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wordLists: [
      {
        name: 'テスト用データ1',
        words: ['a', 'b', 'c']
      },
      {
        name: 'テスト用データ2',
        words: ['ab', 'cd', 'ef']
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
        ]
      }
    ]
  },
  getters: {
    wordLists: state => state.wordLists
  },
  mutations: {
    setWordLists: (state, payload) => state.wordLists = payload,
    setWordListWords: (state, payload) => {
      const wordListIndex = state.wordLists.findIndex(wordList => wordList.name === payload.wordListName)
      state.wordLists[wordListIndex].words = payload.wordListWords
    }
  },
  actions: {
    updateWordLists: ({ commit }, payload) => commit('setWordLists', payload),
    updateWordListWords: ({ commit }, payload) => commit('setWordListWords', payload)
  },
  modules: {
    ranking: Ranking
  }
})
