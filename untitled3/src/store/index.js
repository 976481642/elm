import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);



import VuePersist from "vuex-persist"
const  vuexLocal=new VuePersist({
  storage:window.localstorage
});



export default new vuex.Store({
  plugins:[vuexLocal.plugin],
  state:{

  },
  mutations:{

  },
  getters:{

  },
  modules:{

  },
  actions:{

  }
})
