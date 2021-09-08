<template>
  <div class="app-container">
    <div class="source-tabs">
      <span class="iconfont icon-fanhui" @click="$router.go(-1)"><span>返回</span></span>
      添加视频素材
    </div>
    <div class="source-add" v-if="!issucess">
      <el-row :gutter="30">
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="100px" label-position="left">
            <el-input v-model="form.a" autocomplete="off" placeholder="再次输入标题" class="addipt"></el-input>
            <div class="tabs">
              
              <el-upload
                ref="upload"
                :http-request="httpRequest"
                :show-file-list= "true"
                :file-list="fileList" 
                :on-change="handleChange"
                action=""
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                >
                <span class="f-c-1890ff" v-show="fileList.length>0">重新上传</span>
                <span class="f-c-1890ff" v-show="fileList.length<1">添加视频</span>
              </el-upload>
              <div class="tip">不超过20M，文件格式：rm, rmvb, wmv, avi, mpg, mpeg, mp4</div>
            </div>
            <el-form-item label="素材标签" class="tabs" style="width:100%">
              <el-select v-model="form.b" placeholder="选择" multiple="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <div class="title">素材说明</div>
            <el-input type="textarea" v-model="form.c" rows="4"></el-input>
            <div class="f-mt25">
              <el-button type="primary" @click="onSubmit()">提交</el-button>
              <el-button>取消</el-button>
            </div>
          </el-form>
        </el-col>
        <el-col :span="8">
          <div class="default">
            <span class="font">预览图</span>
            <!-- <img src="" /> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="source-add source-success" v-if="issucess">
      <span class="iconfont icon-caozuochenggong"></span>
      <div class="success">提交成功</div>
      <router-link to="/source/index">
        <el-button type="primary" plain class="f-mr15">返回素材管理</el-button>
      </router-link>
      <el-button type="primary">继续上传</el-button>
    </div>
  </div>
</template>

<script>
import '@/styles/addimg.scss' 
import "@/assets/icon/iconfont.css";
export default {
  name: 'Sourceaddimg',
  components: {  },
  data() {
    return {
      issucess:false,
      form:{
        a:"",
        b:[],
        c:"",
        d:""
      },
      fileList:[]
    }
  },
  created() {
    if(this.$route.query.type == "add"){

    }else if(this.$route.query.type == "edit"){
      this.form = {
        a:"三十个发嘎嘎噶",
        b:["shanghai","beijing"],
        c:"の二太太萨格",
        d:"eeee"
      }
    }
  },
  methods: {
    onSubmit(){
      console.log(this.form)
    },
    httpRequest(param) {
      console.log(param);
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("imgUrl", fileObj); // 文件对象
      console.log(fileObj)
      console.log(fd)
      // image.imageGl(fd).then(res => {
      //   console.log(res);
      //   this.$message.success(res.info); 
      // });
    },
    handleChange(file, fileList) {
      console.log(file)
      console.log(fileList)
        if (fileList.length > 0) {
            this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
        }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 20MB!');
      }
      return isLt2M;
    },
    handleRemove(file, fileList) {
      this.fileList = [];
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-input__suffix{
  display: none;
}
::v-deep .el-select{
  width: 100%;
}
::v-deep .el-form-item__content{
  margin-left: 0;
}
::v-deep .el-input__inner{
  border:none;
  font-size:18px;
  padding: 0px;
}
::v-deep .tabs .el-input__inner{
  font-size:14px;font-weight: bold;
}
::v-deep .addipt input::-webkit-input-placeholder{
  color: #65aff5;
}
::v-deep .addipt input:-moz-placeholder{
color: #65aff5;
}
::v-deep .addipt input::-moz-placeholder{
color: #65aff5;
}
::v-deep .addipt input:-ms-input-placeholder{
color: #65aff5;
}
::v-deep *{
  font-weight: normal !important;
  outline: none;
}
::v-deep .el-upload--picture-card{
  width:60px;
  height: 60px;
  line-height: 60px;
  border: 1px solid #c0ccda;
}
::v-deep .el-upload--picture-card i{
  font-size:20px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width:60px;
  height: 60px;
  line-height: 60px;
  margin-bottom: 0;
}
::v-deep .el-list-enter-active{
  -webkit-transition:none;
  transition:none;
}
::v-deep .el-list-leave-active{
  -webkit-transition:none;
  transition:none;
}
</style>
