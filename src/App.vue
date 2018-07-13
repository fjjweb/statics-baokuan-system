<template>
  <div id="app">
    <el-tree class="router"
      :data="data"
             :highlight-current="true"
             :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    <router-view class="view"></router-view>
  </div>

</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: '爆款数据统计',
          children: [{
            label: '爆款缩略图列表',
            routerPath: '/dataStatics/thumbnail'
          },
            {
              label: '爆款数据统计',
              routerPath: '/dataStatics/dataStatics'
            }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
      methods:{
      handleNodeClick(data){
        this.$router.push({path: data.routerPath})
      }
    }
  }
</script>

<style>
  @import "assets/style/reset.css";
  @import "assets/style/base.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

/*临时宽度,部署时去掉router*/
.router {
  width: 12%;
  min-width: 120px;
  float: left;
  /*display: none;*/
}
.view {
  overflow-y: auto;
  float: left;
  width: 85%;
  /*width: 99%;*/
  margin-left: 1%;
}
</style>
