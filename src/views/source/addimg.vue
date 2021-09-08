<template>
  <div class="app-container">
    <div class="source-tabs">
      <span class="iconfont icon-fanhui" @click="$router.go(-1)"><span>返回</span></span>
      添加图片素材
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
                action=""
                list-type="picture-card"
                :multiple="false"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="tip" v-show="fileList.length<1">可上传JPG、PNG、PSD、AI、Sketch格式的文件，单个文件大小不超过300M</div>
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 300;
      if (!isLt2M) {
        this.$message.error('上传大小不能超过 300MB!');
      }
      return isLt2M;
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
  width:50px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #c0ccda;
}
::v-deep .el-upload--picture-card i{
  font-size:20px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
  width:50px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 0;
}

</style>
