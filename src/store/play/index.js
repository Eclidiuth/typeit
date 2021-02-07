export default {
  namespaced: true,

  state: () => ({
    wordListName: 'JavaScript config files',
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
  }),
  getters: {
    wordLists: state => state.wordLists,
    wordListName: state => state.wordListName,
    wordList: (state, getters) => {
      const wordList = getters.wordLists.filter(list => list.name === getters.wordListName)
      return wordList ? wordList[0] : null
    },
    wordListWords: (state, getters) => getters.wordList.words,

    findWordListByName: (state, getters) => wordListName => {
      const wordList = getters.wordLists.filter(list => list.name === wordListName)
      return wordList ? wordList[0] : null
    }
  },
  mutations: {
    setWordListName : (state, wordListName) => state.wordListName = wordListName,
    setWordLists    : (state, wordLists) => state.wordLists = wordLists,

    setWordListWords: (state, payload) => state.wordLists[payload.index].words = payload.wordListWords
  },
  actions: {
    updateWordListName : ({ commit }, wordListName)  => commit('setWordListName', wordListName),
    updateWordLists    :     ({ commit }, wordLists) => commit('setWordLists', wordLists),

    updateWordListWords: ({ commit, getters}, payload) => {
      const wordListIndex = getters.wordLists.findIndex(wordList => wordList.name === payload.wordListName)
      commit('setWordListWords', { index: wordListIndex, wordListWords: payload.wordListWords })
    }
  }
}