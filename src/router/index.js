import Vue from 'vue'
import Router from 'vue-router'
import Thumbnail from "../components/dataStatics/thumbnail.vue"
import UploadTplImg from "../components/dataStatics/uploadTplImg.vue"
import DataStatics from "../components/dataStatics/dataStatics.vue"

Vue.use(Router)

var router = new Router({
  routes: [
    {path: '/',name: 'Thumbnail',component: Thumbnail},
    {path: '/dataStatics/thumbnail',name: 'Thumbnail',component: Thumbnail},
    {path: '/dataStatics/uploadTplImg',name: 'UploadTplImg',component: UploadTplImg},
    {path: '/dataStatics/dataStatics',name: 'DataStatics',component: DataStatics},
  ]
})

export default router
