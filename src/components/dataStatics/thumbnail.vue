<template>
  <div class="thumbnail">
    <TitleView :title="thumbnailTitle"/>
    <div class="content">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tplList" :key="index" :label="item.tplName"
                     :name="item.activeOrder"></el-tab-pane>
        <div class="search-wrap">
          <div class="search-area">
            <el-row>
              <el-col :span="7">
                <el-date-picker
                  size="small"
                  v-model="startEndData"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="5">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="searchForm.templateName">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
              </el-col>

              <el-col :span="4">
                <el-button type="primary" @click="clearConditionsFn">清空筛选条件</el-button>
              </el-col>
              <el-col :span="2">
                <el-button  type="primary" @click="uploadImgFn">上传</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="search-content">
            <el-col :span="4" v-for="(item, index) in dataList" :key="index" :offset="index!= 0 && index!=5 ? 1 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <div class="imgUrl">
                  <img :src="item.imgUrl" class="image">
                  <div class="labelIcon">
                    <img  v-if="item.label == 2"  src="../../images/haibaoTpl/newIcon@2x.png" alt="" >
                    <img  v-if="item.label == 3"  src="../../images/haibaoTpl/dingzhiIcon.png" alt="" >
                  </div>
                </div>
                <div style="padding: 14px;">
                  <span>{{item.templateName }}</span>
                  <span>{{item.id}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{item.addTime }}</time>
                    <el-popover
                      placement="top"
                      width="130"
                      trigger="click"
                      v-model="item.popoverVisible">
                      <div>
                        <el-radio-group v-model="item.labelTypeStr" fill="#48ac2e" size="mini">
                          <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="10">
                              <el-radio-button label="最新" type="success"></el-radio-button>
                            </el-col>
                            <el-col :span="10">
                              <el-radio-button label="通用" type="success"></el-radio-button>
                            </el-col>
                          </el-row>
                          <el-row :gutter="20"
                                  style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #ccc">
                            <el-col :span="10">
                              <el-radio-button label="定制" type="success"></el-radio-button>
                            </el-col>
                            <el-col :span="10">
                              <el-radio-button label="无" type="success"></el-radio-button>
                            </el-col>
                          </el-row>
                        </el-radio-group>
                      </div>
                      <div style="text-align: left; margin: 0;">
                        <el-button type="primary" size="mini" @click="sureModifyLabelFn(item)">确定</el-button>
                        <el-button size="mini" type="text" @click="item.popoverVisible = false">取消</el-button>
                      </div>
                      <el-button slot="reference" type="text" class="button" @click="modifyLabelFn(item)">修改标签
                      </el-button>
                    </el-popover>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>
        </div>
      </el-tabs>
    </div>
    <!--分页-->
    <div class="footer">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="100">
    </el-pagination>
    </div>
  </div>
</template>

<script>
  import convertTime from "../../utils/formatTime"
  import Vue from 'vue';
  import {mapGetters,mapActions} from 'vuex';
  import {GET_DATALIST,FETCH_DATALIST} from '../../store/modules/thumbnail-list';
  import Component from 'vue-class-component';
  import TitleView from "../../viewUI/TitleView.vue"

  @Component({
    components:{
    TitleView
    },
    computed: {
      ...mapGetters({
        dataList: "GET_DATALIST"
      }),
    },
    methods: {
      ...mapActions({
        fetchDataSets: FETCH_DATALIST,
      }),
    },
    mounted() {
      this.convertTime();
      let params = this.searchForm;
      params.currentPage =  1;
      params.size = this.size ;
      this.fetchDataSets(params);
    },
  })
  export default class Thumbnail extends Vue {
    thumbnailTitle="爆款模板列表";
    tplList = [
      {
        tplName: "海报模板",
        activeOrder: "first",
      },
      {
        tplName: "单页模板",
        activeOrder: "second",
      },
    ];
    activeName = "first";
    startEndData = "";
    searchForm = {
      templateType: 1,
      beginTime:"",
      endTime:"",
      templateName: "",
    };
    popoverVisible = false;
    currentPage = 1;

    handleClick(tab,event) {
      this.searchForm.templateType = tab.name == "first" ? 1 : 2;
      this.startEndData = "";
      this.convertTime();
      this.searchForm.templateName = "";
      this.currentPage = 1;
      let params = this.searchForm;
      params.currentPage=1;
      params.size=this.size;
      this.fetchDataSets(params);
    };

    searchFn() {
        this.convertTime();
      console.log("test");
      let params = this.searchForm;
      params.currentPage=this.currentPage ;
      params.size=this.size;
      this.fetchDataSets(params);
    };
    clearConditionsFn(){
      this.startEndData = "";
      let params = {"templateType":this.searchForm.templateType,"beginTime":"","endTime":"","templateName":"","currentPage":1,"size":this.size}
      this.fetchDataSets(params);
    };
    convertTime(){
      console.log("await");
      this.searchForm.beginTime = this.startEndData == "" || this.startEndData==null ? "" : convertTime.formatDateTime_day(this.startEndData[0]);
      this.searchForm.endTime = this.startEndData == "" ||  this.startEndData == null? "" : convertTime.formatDateTime_day(this.startEndData[1]);
    };
    modifyLabelFn(obj) {
      console.log("修改",obj);
      obj.popoverVisible = true;
    };

    sureModifyLabelFn(obj) {
      switch (obj.labelTypeStr) {
        case "无":
          this.$set(obj,"labelType",0);
          break;
        case "最新":
          this.$set(obj,"labelType",2);
          break;
        case "通用":
          this.$set(obj,"labelType",1);
          break;
        case "定制":
          this.$set(obj,"labelType",3);
          break;
      }
      obj.popoverVisible = false;
    };
    uploadImgFn(){
      this.$router.push("/dataStatics/uploadTplImg");
    };

    handleSizeChange(size) {
      console.log("size",size);
      this.size = size;
    };

    handleCurrentChange(val) {
      console.log(val);
      this.convertTime();
      let params = this.searchForm;
      this.currentPage = val;
      params.currentPage = val;
      params.size = this.size;
      this.fetchDataSets(params);
    };

  }

</script>

<style scoped>
  .search-area .el-input {
    width: 260px;
  }

  .search-content {
    padding: 20px 60px 0 0px;
  }

  /*图片css*/
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  /*分页*/
  .footer {
    position: relative; margin-bottom:100px;
  }

  .el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: bold;
    /* margin-left: 50%; */
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, -50%);
  }
  .imgUrl{
    position: relative;
  }
  .labelIcon{
    position: absolute;top:-4px;left:-4px
  }
</style>
