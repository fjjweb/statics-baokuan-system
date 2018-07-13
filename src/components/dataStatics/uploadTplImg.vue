<template>
  <div class="uploadTpl_view">
    <TitleView :title="uploadImgTitle"/>
    <el-row style="padding:40px;">
      <el-col :span=4 style="height:10px;"></el-col>
      <el-col :span="8">
        <div class="uploadImg_left">
          <!--:data="ruleForm.upLoadData"-->
          <!--:headers=headers-->
          <!--name="fileStr"-->
          <el-upload
            class="avatar-uploader"
            action=""
            :data="upLoadData"
            :headers=headers
            name="fileStr"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            accept=".jpg,.jpeg,.png">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <el-button size="small" type="primary"
                       style="position: absolute;z-index:3;bottom:-8px;width: 90%;left:5%;border-radius: 5px!important;">
              上传图片
            </el-button>
          </el-upload>

        </div>
      </el-col>
      <el-col :span="10">
        <div class="uploadImg_right">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="uploadImgForm">
            <el-form-item label="图片地址" prop="imgUrl" size="small">
              <el-input v-model="ruleForm.imgUrl" readonly></el-input>
            </el-form-item>
            <el-form-item label="模板名称" prop="templateName" size="small">
              <el-input v-model="ruleForm.templateName"></el-input>
            </el-form-item>
            <el-form-item label="模板ID" prop="id" required size="small">
              <el-input v-model="ruleForm.id" placeholder="请输入模板ID" @change="validateFn(ruleForm.id,1)"></el-input>
              <span v-show="IsIdNum" class="errMsg">模板ID必须是数字类型</span>
            </el-form-item>
            <el-form-item label="指定身份" prop="positions" size="small">
              <el-select v-model="ruleForm.positions" multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in positionsArr"
                  :key="index"
                  :label="item.memberName"
                  :value="item.identityId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板类型" prop="templateType" size="small">
              <el-select v-model="ruleForm.templateType" placeholder="请选择">
                <el-option label="单页" value="1"></el-option>
                <el-option label="海报" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属类型" prop="selectedCategory" size="small">
              <el-select v-model="ruleForm.selectedCategory" multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in catagoryList"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.categoryId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费条件" prop="free" size="small">
              <el-select v-model="ruleForm.free" placeholder="请选择">
                <el-option label="免费" value="1"></el-option>
                <el-option label="收费" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="添加标签" prop="label" size="small">
              <el-select v-model="ruleForm.label" placeholder="请选择">
                <el-option label="无" value="1"></el-option>
                <el-option label="最新" value="2"></el-option>
                <el-option label="通用" value="3"></el-option>
                <el-option label="定制" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板编号" prop="templateNo" size="small">
              <el-input v-model="ruleForm.templateNo" placeholder="请输入模板编号" @change="validateFn(ruleForm.templateNo,2)"></el-input>
              <span v-show="IsNoNum" class="errMsg">模板编号必须是数字类型</span>
            </el-form-item>
            <el-form-item label="设计师" prop="designer" size="small">
              <el-input v-model="ruleForm.designer" placeholder="请输入设计师姓名"></el-input>
            </el-form-item>
            <el-form-item label="模板地址" prop="templateUrl" size="small">
              <el-input v-model="ruleForm.templateUrl" placeholder="请输入模板地址"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">上传</el-button>
              <el-button @click="cancelUpload('ruleForm')">取消</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Vue from "vue";
  import {mapGetters,mapActions} from "vuex";
  import Component from "vue-class-component"
  import TitleView from "../../viewUI/TitleView.vue"
  import axios from 'axios'
  import Validate from '../../utils/validate'
  @Component({
    components: {
      TitleView
    },
    computed: {
      ...mapGetters(
        {
          catagoryList: "getCatagoryList",
          positionsArr: "getPositionsArr"
        },
      )
    },
    methods: {
      ...mapActions([
        "fetchCatagoryList",
        "fetchPositionsArr",
        "fetchSubmitForm",
      ])
    },
    mounted() {
      this.fetchCatagoryList();
      this.fetchPositionsArr();
    },
  })
  export  default class UploadTplImg extends Vue {
    uploadImgTitle = "上传模板缩略图列表"
    rules = {
      imgUrl: [
        {required: true,message: '图片地址不能为空',trigger: 'blur'},
      ],
      templateName: [
        {required: true,message: '请输入模板名称',trigger: 'blur'},
        {max: 10,message: '模板名称不能超过10个字符',trigger: 'blur'}
      ],
      id: [
        {required: true,message: '请输入模板ID',trigger: 'blur'},
      ],
      selectedCategory: [
        {type: 'array',required: true,message: '请至少选择一个模板所属类型',trigger: 'change'}
      ],
      positions: [
        {type: 'array',required: true,message: '请至少选择一个身份',trigger: 'change'}
      ],
      templateType: [
        {required: true,message: '请选择模板类型',trigger: 'change'}
      ],
      free: [
        {required: true,message: '请选择收费条件',trigger: 'blur'},
      ],
      label: [
        {required: true,message: '请选择标签类型',trigger: 'blur'},
      ],

      templateNo: [
        {required: true,message: '请输入模板编号',trigger: 'blur'},
      ],
      designer: [
        {required: true,message: '请输入设计师名字',trigger: 'blur'},
      ],
      templateUrl: [
        {required: true,message: '请输入模板地址',trigger: 'blur'},
      ]

    }
    ruleForm = {
      imgUrl: '',
      templateName: '',
      id: "",
      templateType: "",
      selectedCategory: [],
      positions: [],
      free: "",
      label: "",
      templateNo: "",
      designer: "",
      templateUrl: "www.99114.cn",
    };
    upLoadData = {
      fileStr: ""
    };
    IsIdNum=false;IsNoNum=false;
    ImageUploadUrl = "http://plw-file.99114.cn/file/uploadBase64Json";
    headers = {"Content-Type": 'application/json'};
    imageUrl = "http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png";


    beforeAvatarUpload(file) {
//      图片是否合法校验
      const isJpgPng = file.type === 'image/jpeg' || 'image/png' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (!isJpgPng) {
        this.$message.error('图片上传失败,请上传格式为：*.jpg、*.jpeg、*png');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 0.5MB!');
      }
//      上传图片
      const that = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.upLoadData.fileStr = this.result; // 这个就是base64编码了
        axios.post(uploadImgHOST + '/file/uploadBase64Json',that.upLoadData).then(({data}) => {
          console.log(data);
          that.imageUrl = returnImgUrlHOST + data.filePath;
          that.ruleForm.imgUrl = that.imageUrl;
        })
      }
      return false;
    };
    validateFn(num,flag){
      switch(flag) {
        case 1:
          this.IsIdNum = Validate.IsNum(num)?false:true;
          break;
        case 2:
          this.IsNoNum = Validate.IsNum(num)?false:true;
          break;
        default:break;
      }
    };
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.categoryId = this.ruleForm.selectedCategory.join(",")
          this.ruleForm.memberLevel = this.ruleForm.positions.join(",")
          console.log("ruleForm",JSON.stringify(this.ruleForm));
          this.fetchSubmitForm(this.ruleForm).then(res=> {
            this.$router.push("/dataStatics/thumbnail")
          })
        } else {
          return false;
        }
      });
    };

  }

</script>

<style scoped>
  .uploadImg_left {
    position: relative;
    width: 302px;
    height: 530px;
    margin-top: -20px;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #fff;
  }

  .uploadImg_left .el-upload-list {
    margin: -15px 10px 0 !important;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 280px;
    height: 498px;
    margin: 5px;
    display: block;
  }
  .errMsg{
    color:red;
    font-size:12px;
  }
</style>
