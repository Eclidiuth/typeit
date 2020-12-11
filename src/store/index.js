import Vue     from 'vue'
import Vuex    from 'vuex'
import Play    from '@/store/play/index.js'
import Ranking from '@/store/ranking/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    play: Play,
    ranking: Ranking
  }
})
