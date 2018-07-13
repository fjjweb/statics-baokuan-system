import axios from 'axios'
import Vue from 'vue'
export default {
  state:{
    catagoryList:[],
    positionsArr:[],
    uploadForm:{}
  },
  getters:{
    getCatagoryList(state){
      return state.catagoryList
    },
    getPositionsArr(state){
      return state.positionsArr
    },
  },
  mutations:{
    setCatagoryList(state,{res}){
      state.catagoryList = [...state.catagoryList,...res.data.respBody];
    },
    setPositionsArr(state,{res}){
      state.positionsArr = [...state.positionsArr,...res.data.respBody];
    },
    setSubmitForm(state,{res}){
      state.uploadForm = res.data;
    }
  },
  actions:{
    fetchCatagoryList({commit}){
      return axios.get(baokuanHOST + '/getAllCategory').then((res) => {
        console.log("===",res);
        commit("setCatagoryList",{res});
        return res;
      }).catch(err => console.log(err));
    },
    fetchPositionsArr({commit}){
      return axios.get(baokuanHOST +'/getAllIdentity').then((res) => {
        console.log("setPositionsArr",res);
        commit("setPositionsArr",{res});
        return res;
      }).catch(err => console.log(err));
    },
    fetchSubmitForm({commit},params){
      return axios.post(baokuanHOST+'/saveTemplate',params).then((res) => {
      // return axios.post("http://192.168.1.210:7210"+'/saveTemplate',params).then((res) => {
        commit("setSubmitForm",{res});
        return res;
      }).catch(err => console.log(err));
    }
  }
}
