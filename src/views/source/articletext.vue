<template>
  <div class="app-container">
    <div class="source-tabs">
      <span class="iconfont icon-fanhui" @click="$router.go(-1)"><span>返回</span></span>
      标题标题标题标题标题标题标题标题标题标题标题标题
      <router-link :to="{path:'addimg',query:{type:'edit'}}" class="source-btn">
        编辑
      </router-link>
      <span class="source-btn">|</span>
      <span class="source-btn" @click="dialogVisible = true">删除</span>
    </div>
    <div class="source-article">
      <el-row :gutter="20">
        <el-col :span="18">
          详情
        </el-col>
        <el-col :span="6">
          <ul>
            <li><span>素材标签：</span>产品</li>  
            <li><span>素材说明：</span>为最大程度整合资源，提振开门红营销氛围，深化队伍对产品认知，推动开门红产品销售。</li>  
            <li><span>文本链接：</span><b class="f-c-1890ff">付费渠道/线上广告/搜索渠道</b></li>  
          </ul>
          <ul class="border">
            <li><span>任务名称：</span><b class="f-c-1890ff">付费渠道/线上广告/搜索渠道</b></li>  
            <li><span>执行时间：</span><b>2020-09-21  至  2021-09-21</b></li>  
            <li><span>总引入用户数：</span><b>20万人</b></li>  
          </ul> 
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="素材删除确认"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletesure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/article.scss' 
export default {
  name: 'Sourcearticleimg',
  components: {  },
  data() {
    return {
      dialogVisible:false
    }
  },
  created() {
    console.log("query"+this.$route.query.id);
  },
  methods: {
    deletesure(){
      this.dialogVisible = false;
      this.$router.push({path:'index'})

    }
  }
}
</script>
