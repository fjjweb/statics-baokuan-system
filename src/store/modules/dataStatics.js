import axios from 'axios'
import Vue from 'vue'

export default {
  state: {
    allDateCountUsing: {},
    AllDateCount_chart:{}
  },
  getters: {
    getAllDateCountUsing(state) {
      return state.allDateCountUsing;
    },
    getChartAllDateCount(state) {
      return state.AllDateCount_chart;
    },
  },
  mutations: {
    setAllDateCountUsing(state,{respBody}) {
      state.allDateCountUsing = respBody
    },
    setChartAllDateCount(state,{respBody}) {
      state.AllDateCount_chart = respBody
    },
  },
  actions: {
    fetch_AllDateCountUsing({commit}) {
      return axios.get(baokuanHOST + '/redisAllDateCount').then(({data:{respBody}}) => {
        commit("setAllDateCountUsing",{respBody});
        return respBody;
      }).catch(err => console.log(err));
    },
    fetch_chartAllDateCount({commit},params) {
      return axios.get(baokuanHOST + '/detailsDateCount?templateId='+params.templateId +'&timeType='+params.timeType,params).then(({data:{respBody}}) => {
        console.log("99",respBody);
        if(respBody == null)return;
        commit("setChartAllDateCount",{respBody});
        return respBody;
      }).catch(err => console.log(err));
    },
  },

}
