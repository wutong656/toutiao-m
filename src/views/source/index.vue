<template>
  <div class="app-container">
    <div class="source-tabs">
      素材管理
      <ul>
        <li v-for="(item,index) in tabslist" :key="'tab'+index" :class="{active:item.id == tabsindex}" @click="tabsclick(item.id)">{{item.title}}</li>
      </ul>
    </div>
    <div class="source-nav">
      <ul>
        <li v-for="(item,index) in navlist" :key="'nav'+index" :class="{active:item.id == navindex}" @click="navclick(item.id)">{{item.title}}<span>{{item.num}}</span></li>
      </ul>
      <div class="source-time">
        <el-input placeholder="请输入任务名称或素材标题搜索"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <span class="sort">排序</span>
        <ul>
          <li v-for="(item,index) in timelist" :key="'time'+index" :class="{active:item.id == timeindex}" @click="timesclick(item.id)">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <div class="source-content">
      <el-row :gutter="15">
        <router-link :to="{path:'addimg',query:{type:'add'}}">
            <el-col :span="5">
              <div class="imgblock">
                <div class="add">
                  <span class="iconfont icon-tianjia"></span>
                  <p>添加图片素材</p>
                </div>
              </div>
            </el-col>
        </router-link>
        <el-col :span="5" v-for="(item,index) in 9" :key="'ct'+index">
          <router-link :to="{path:'articleimg',query:{id:'1'}}">
            <div class="imgblock">
              <!-- <video width="100%" height="100%" preload="auto">
                <source src="https://vodpub2.v.news.cn/publish/20210825/XxjwsmE007006_20210825_CBVFN0A001.mp4" type="video/mp4">
                你的浏览器不支持 HTML5 video.
              </video> -->
              <img src="https://sales-dev.ihxlife.com/imr/yx_plan/gv/person_plan/images/img_family_scheme.png" />
              <div class="bg"></div>
              <div class="visit">
                <span class="iconfont icon-ren"></span>
                10万
                <span class="iconfont icon-qizi"></span>
                10
              </div>
            </div>
            <div class="title">
              <span>产品</span>
              标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import '@/styles/source.scss' 
import "@/assets/icon/iconfont.css";
export default {
  name: 'Source',
  components: {  },
  data() {
    return {
      tabsindex:1,
      tabslist:[
        {id:1,title:"图片"},
        {id:2,title:"视频"},
        {id:3,title:"图文"},
      ],
      navindex:1,
      navlist:[
        {id:1,title:"全部",num:"282"},
        {id:2,title:"产品",num:"80"},
        {id:3,title:"节日",num:"12"},
        {id:4,title:"保险理念",num:"20"},
        {id:5,title:"增员",num:"120"},
      ],
      timeindex:1,
      timelist:[
        {id:1,title:"用户"},
        {id:2,title:"时间"},
      ],
      ctimglist:[
        {id:1,title:"用户"},
        {id:2,title:"时间"},
      ]
    }
  },
  created() {
    
  },
  methods: {
    tabsclick(id){
      console.log(id);
      this.tabsindex = id;
    },
    navclick(id){
      console.log(id);
      this.navindex = id;
    },
    timesclick(id){
      console.log(id);
      this.timeindex = id;
    },
  }
}
</script>


