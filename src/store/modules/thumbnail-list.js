import axios from 'axios'
import Vue from 'vue'
import convertTime from "../../utils/formatTime"
export const GET_DATALIST = "getDataList";
export const SET_DATALIST = "setDataList";
export const FETCH_DATALIST = "fetchDataList";
export default {
  state: {
    dataList: [],
  },
  getters: {
    GET_DATALIST(state) {
      return state.dataList;
    },
  },
  mutations: {
    [SET_DATALIST](state,{data}) {
      console.log(data.respBody);
      state.dataList = [...data.respBody.sgTemplate];
      if( state.dataList.length == 0 ||  state.dataList==null){return}
      state.dataList.forEach(item=> {
        Vue.set(item,"popoverVisible",false);
        Vue.set(item,"labelTypeStr","最新");
        item.addTime =  convertTime.formatDateTime_day(item.addTime)
      })
      // console.log("==",state.dataList)
    },
  },
  actions: {
    [FETCH_DATALIST]({commit},params) {
      return axios.post(baokuanHOST + '/getThumbnailList',params).then(({data}) => {
        commit(SET_DATALIST,{data});
        return data;
      }).catch(err => console.log(err));
    },
  },

}
