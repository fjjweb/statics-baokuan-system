<template>
  <div>
    <TitleView :title="staticsTitle"></TitleView>

    <div class="pubPart section1">
      <h3>数据概括<i class="el-icon-question" @click="popOverFn"></i></h3>
      <div class="popOver">
        <el-popover
          placement="top"
          title=""
          width="460"
          popper-class="popOver"
          trigger="hover"
          v-model="popVisible">
          <p>总浏览量：所有模板的浏览量总合;</p>
          <p>总使用量：所有模板的使用量总合;</p>
          <p>总分享量：所有模板的分享量总合;</p>
          <p>有效转化率：通过模板进入到商品详情页的访问人数除以浏览量；</p>
        </el-popover>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="content">
            <h6>总浏览量(次)</h6>
            <h3>{{allDateCountUsing.scanCount}}</h3>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="content">
            <h6>总使用量(次)</h6>
            <h3>{{allDateCountUsing.useCount}}</h3>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="content">
            <h6>总分享量(次)</h6>
            <h3>{{allDateCountUsing.shareCount}}</h3>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="content">
            <h6>有效转化率(百分比) </h6>
            <h3>{{allDateCountUsing.inversion}}</h3>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pubPart section2">
      <h3>数据详情</h3>
      <div class="searchCondition">
        <el-row>
          <el-col :span="4">
            <span>时间粒度</span>
            <el-radio-group v-model="searchForm.dataTypeStr" size="small" @change="getAllChartData(searchForm.dataTypeStr)" style="margin-left:20px;">
              <el-radio-button label="日"></el-radio-button>
              <el-radio-button label="周"></el-radio-button>
              <el-radio-button label="月"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              size="small"
              v-model="searchForm.startEndData"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="10">
          <div id="chart1" style="width: 600px;height:400px;"></div>
        </el-col>
        <el-col :span="10">
          <div id="chart2" style="width: 600px;height:400px;"></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <div id="chart3" style="width: 600px;height:400px;"></div>
        </el-col>
        <el-col :span="10">
          <div id="chart4" style="width: 600px;height:400px;"></div>
        </el-col>
      </el-row>
    </div>
    <div class="pubPart section2">
      <h3>模板列表</h3>
      <el-row :gutter="20" style="margin-bottom:20px;">
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
        <el-col :span="4">
          <el-select v-model="tableSearchForm.templateType" placeholder="模板类型" size="small">
            <el-option label="模板类型" value=""></el-option>
            <el-option label="单页" value="1"></el-option>
            <el-option label="海报" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span=4>
          <el-select v-model="tableSearchForm.sortOrder" placeholder="排序方式" size="small">
            <el-option
              v-for="item in sortList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span=4>
          <el-select v-model="tableSearchForm.selectedCategory" multiple placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in catagoryList"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span=4>
          <el-select v-model="tableSearchForm.designer" multiple placeholder="全部设计师" size="small">
            <el-option
              v-for="(item,index) in designers"
              :key="index"
              :label="item.designerName"
              :value="item.designerId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom:20px;">
        <el-col :span=5 >
          <el-input type="text" v-model="tableSearchForm.templateName"
                    prefix-icon="el-icon-search"
                    placeholder="输入模板名称" size="small" >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="clearConditionsFn">清空筛选条件</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="templateType"
          label="模板类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属类型">
        </el-table-column>
        <el-table-column
          prop="watchCount"
          label="浏览量">
        </el-table-column>
        <el-table-column
          prop="useCount"
          label="使用量">
        </el-table-column>
        <el-table-column
          prop="shareCount"
          label="分享量">
        </el-table-column>
        <el-table-column
          prop="convertCount"
          label="转化率">
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="添加时间">
        </el-table-column>
        <el-table-column
          prop="designer"
          label="设计师">
        </el-table-column>
        <el-table-column
          prop="action"
          label="图片">
        </el-table-column>
      </el-table>
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
  import Vue from 'vue'
  import {mapGetters,mapActions} from "vuex"
  import Component from 'vue-class-component'
  import TitleView from "../../viewUI/TitleView.vue"
  import convertTime from "../../utils/formatTime"
  @Component({
    components: {
      TitleView
    },
    computed: {
      ...mapGetters({
        "catagoryList": "getCatagoryList",
        "allDateCountUsing":"getAllDateCountUsing",
        "AllDateCount_chart":"getChartAllDateCount"
      }),

    },
    methods: {
      ...mapActions([
        "fetchCatagoryList",
        "fetch_AllDateCountUsing",
        "fetch_chartAllDateCount",
      ]),
      async  fetch_chart() {
        await this.fetch_chartAllDateCount({templateId:"",timeType:this.searchForm.timeType});
        this.drawLine1("chart1",this.timeArr,this.AllDateCount_chart.scanCountArray,"总浏览量")
        this.drawLine1("chart2",this.timeArr,this.AllDateCount_chart.useCountArray,"总使用量")
        this.drawLine1("chart3",this.timeArr,this.AllDateCount_chart.shareCountArray,"总分享量")
        this.drawLine4("chart4",this.AllDateCount_chart.inversion,this.AllDateCount_chart.useCount,this.AllDateCount_chart.scanCount)
      },
      drawLine1(id,XData,YData,chartName){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: XData
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [chartName]
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {show: true,type: ['stack','tiled']},
              saveAsImage: {show: true}
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: chartName,
            data: YData,
            type: 'line',
            color: ['#409EFF'],
            smooth: true
          }]
        });
      },
      drawLine4(id,inversion,useCount,scanCount){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['总使用量','总浏览量']
          },
          series: [
            {
              name: '有效转化率',
              type: 'pie',
              radius: ["50%","70%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
//                    color:"red",
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: useCount,name: '总使用量',itemStyle: {color: "green"}},
                {value: scanCount,name: '总浏览量',itemStyle: {color: "#abcdef"}}
              ]
            }
          ]
        });
      },
    },
    mounted(){
      this.fetch_AllDateCountUsing();
//      图表chart的时间和方法处理
      switch (this.searchForm.timeType){
        case "day": this.timeArr = convertTime.getBeforeDateArr();break;
        case "week": this.timeArr = convertTime.getBeforeWeekArr();break;
        case "mouth": this.timeArr = convertTime.getPreMonthDayArr();break;
        default:break;
      }
      this.fetch_chart();
      this.fetch_chart();
      this.fetchCatagoryList();

    }
  })
  export default class DataStatics extends Vue {
    timeArr=[];
    staticsTitle = "单品爆款数据统计";
    searchForm = {
      templateId:"",
      dataTypeStr: "日",
      timeType:"day",
      startEndData: "",
    };
    startEndData = "";
    tableSearchForm = {
      startTime: "",
      endTime: "",
      templateType: "",
      sortOrder: "",
      selectedCategory: "",
      designerSelected: [],
      designer:"",
      "categoryId": "",
      currentPage: 1,
      size: 10,
      templateName: "",
    };
    sortList = [
      {
        value: '',
        label: '排序方式'
      },
      {
        value: 'scanDown',
        label: '浏览量由高到低'
      },{
        value: 'scanUp',
        label: '使用量由低到高'
      },{
        value: 'useDown',
        label: '使用量由高到低'
      },{
        value: 'useUp',
        label: '使用量由低到高'
      },{
        value: 'shareDown',
        label: '分享量由高到低'
      },{
        value: 'shareUp',
        label: '分享量由低到高'
      },{
        value: 'inversionDown',
        label: '转化率由高到低'
      },{
        value: 'inversionUp',
        label: '转化率由低到高'
      }];
    designers = [
      {
        designerId: '全部',
        designerName: '全部'
      },
      {
        designerId: '桑红彪',
        designerName: '桑红彪'
      },{
        designerId: '宛娟',
        designerName: '宛娟'
      }
    ];
    tableData = [
      {
        order: 1,
        templateName: "模板名称",
        templateType: "模板类型",
        categoryName: "所属类型",
        watchCount: "浏览量",
        useCount: "使用量",
        shareCount: "分享量",
        convertCount: "转化率",
        addDate: '2016-05-02',
        designer: '王小虎',
        action: '图片'
      },{
        order: 1,
        templateName: "模板名称",
        templateType: "模板类型",
        categoryName: "所属类型",
        watchCount: "浏览量",
        useCount: "使用量",
        shareCount: "分享量",
        convertCount: "转化率",
        addDate: '2016-05-02',
        designer: '王小虎',
        action: '图片'
      },{
        order: 1,
        templateName: "模板名称",
        templateType: "模板类型",
        categoryName: "所属类型",
        watchCount: "浏览量",
        useCount: "使用量",
        shareCount: "分享量",
        convertCount: "转化率",
        addDate: '2016-05-02',
        designer: '王小虎',
        action: '图片'
      },{
        order: 1,
        templateName: "模板名称",
        templateType: "模板类型",
        categoryName: "所属类型",
        watchCount: "浏览量",
        useCount: "使用量",
        shareCount: "分享量",
        convertCount: "转化率",
        addDate: '2016-05-02',
        designer: '王小虎',
        action: '图片'
      }];
    currentPage = 1;
    size = 10;

    myChart = "";
    popVisible = false;
    getAllChartData(val){
      switch(val){
        case "日":this.searchForm.timeType="day";this.timeArr = convertTime.getBeforeDateArr();break;
        case "周":this.searchForm.timeType="week";this.timeArr = convertTime.getBeforeWeekArr();break;
        case "月":this.searchForm.timeType="mouth";break;
        default:break;
      }
      this.fetch_chart();

    };
    popOverFn() {
      this.popVisible = !this.popVisible
    };

    handleSizeChange(size) {
      console.log("size",size);
      this.size = size;
    };

    handleCurrentChange(val) {
      this.currentPage = val;
    };
    searchFn(){
      this.tableSearchForm.startTime = this.startEndData == "" || this.startEndData==null ? "" : convertTime.formatDateTime_day(this.startEndData[0]);
      this.tableSearchForm.endTime = this.startEndData == "" ||  this.startEndData == null? "" : convertTime.formatDateTime_day(this.startEndData[1]);
      console.log(this.tableSearchForm);
    };
    clearConditionsFn(){}

  }
</script>
<style scoped>
  .pubPart {
    margin: 10px 0;
  }

  .pubPart h3 {
    margin: 15px 0;
  }

  .popOver {
    position: absolute;
    left: 100px;
    top: -10px;
  }

  .section1 {
    position: relative;
  }

  .section1 .content {
    width: 80%;
    padding: 10px;
    background-color: #fff;
  }

  .searchCondition {
    margin: 10px 0;
  }

  #chart1, #chart2, #chart3, #chart4 {
    background-color: #fff;
  }
  /*分页*/
  .footer {
    position: relative;
    margin-bottom:100px;
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
</style>
