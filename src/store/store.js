// import Vue from 'vue'
// import Vuex from 'vuex'
// // import * as actions from './action'
// // import * as getters from './getter'
// // 使用 vuex
// Vue.use(Vuex)
//
// // 创建一个对象来保存应用启动时的初始状态
// const state = {
//   // 应用启动时， count置为0
//   count: 0
// }
//
// const mutations = {
//   // mutation的第一个参数是当前的state
//   // 你可以在函数里修改 state
//   increment (state, amount) {
//     state.count = state.count + amount
//   }
//
// }
//
//
//
// // 整合初始状态和变更函数，我们就得到了我们所需的 store
// // 至此，这个 store 就可以链接到我们的应用中
// export default new Vuex.Store({
//   actions,
//   getters,
//   state,
//   mutations
// })

import Vue from 'vue';
import Vuex from 'vuex';
import Thumbnail from './modules/thumbnail-list';
import UploadTplImg from './modules/uploadTplImg';
import dataStatics from './modules/dataStatics';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Thumbnail,
    UploadTplImg,
    dataStatics,
  },
});


