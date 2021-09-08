<template>
  <div>
    <!-- 头部区域 -->
    <Header title="投放管理 /" task="流量分析" />
    <!-- 主体部分 -->
    <div class="content">
      <div class="content-top">
        <div class="timer">
          <span>推广时间：</span>
          <ul>
            <li v-for="(item, index) in navList" :key="index" :class="{ active:form.dateType == item.id }" @click="queryGet(item.id)">{{ item.name }}</li>
          </ul>
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="channel">
          <span>渠道：</span>
          <el-select v-model="form.channelId" size="middle" placeholder="请选择推广渠道">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span>任务：</span>
          <el-select v-model="form.promotionId" size="middlel" placeholder="请选择任务">
            <el-option
              v-for="item in options2"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          <span>素材：</span>
          <el-select v-model="form.materialId" size="middle" placeholder="请选择素材">
            <el-option
              v-for="item in options3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <!-- 主体中间部分 -->
      <div class="content-middle">
        <div class="caption">
          <ul>
            <li>
              <span>浏览量（PV）</span>
              <p>1,998,286</p>
            </li>
            <li>
              <span>访客数（UV）</span>
              <p>908,473</p>
            </li>
            <li>
              <span>贡献下游浏览量</span>
              <p>908,473</p>
            </li>
            <li>
              <span>平均停留时长</span>
              <p>00:02:36</p>
            </li>
          </ul>
        </div>
        <!-- 可视化图表 -->
        <div class="echarts">
          <div class="fa">
            <el-select v-model="value1" size="middle" placeholder="指标：浏览量（PV）">
              <el-option
                v-for="item in options4"
                :key="item.id"
                :value="item.name"
              />
            </el-select>
          </div>
          <div id="echarts1_box" style="width: 400px; height: 400px" />
          <div id="echarts2_box" style="width: 800px; height: 400px; margin-left: 60px;" />
        </div>
        <!-- 表格区域 -->
        <div class="tab">
          <el-table
            :data="tableData1"
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#fafafa', color: 'black'}"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column prop="order" label="序号" width="80" />
            <el-table-column prop="channel" label="渠道" width="600" />
            <el-table-column prop="views" label="浏览量（PV）" width="120" align="center" />
            <el-table-column prop="visitor" label="访客数（PV）" width="150" align="center" />
            <el-table-column prop="down" label="贡献下游浏览量" width="150" align="right" />
            <el-table-column prop="duration" label="平均停留时长" align="right" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import Header from '@/components/Headers'
import { huan, norm, inline, chartQuery, listQuery } from '@/api/flow'
export default {
  components: {
    Header
  },
  data() {
    return {
      value: '',
      value1: '',
      navList: [{
        name: '今日',
        id: 0
      }, {
        name: '本周',
        id: 1
      }, {
        name: '本月',
        id: 2
      }, {
        name: '自定义',
        id: 3
      }],
      form: {
        dateType: '',
        channelId: '',
        promotionId: '',
        materialId: '',
        index: ''
      },
      time: '',
      chart11: [],
      tableData1: [{
        id: 1,
        order: '- 1',
        channel: '搜索渠道',
        views: '1,052,091',
        visitor: '1,052,091',
        down: '1,052,091',
        duration: '1,052,091',
        children: [{
          id: 20,
          channel: '百度',
          views: '1,052,091',
          visitor: '1,052,091',
          down: '1,052,091',
          duration: '08:50:08'
        }, {
          id: 21,
          channel: '神马搜索',
          views: '1,052,091',
          visitor: '1,052,091',
          down: '1,052,091',
          duration: '08:50:08'
        }, {
          id: 22,
          channel: '360搜索',
          views: '1,052,091',
          visitor: '1,052,091',
          down: '1,052,091',
          duration: '08:50:08'
        }, {
          id: 23,
          channel: '头条',
          views: '1,052,091',
          visitor: '1,052,091',
          down: '1,052,091',
          duration: '08:50:08'
        }]
      }, {
        id: 2,
        order: '+ 2',
        channel: '导航广告',
        views: '1,052,091',
        visitor: '1,052,091',
        down: '1,052,091',
        duration: '08:50:08'
      }, {
        id: 3,
        order: '+ 3',
        channel: '地铁广告',
        views: '1,052,091',
        visitor: '1,052,091',
        down: '1,052,091',
        duration: '08:50:08'
      }],
      options1: [],
      options2: [],
      options3: [],
      options4: [{
        index: 0,
        name: '浏览量（PV）'
      }, {
        index: 1,
        name: '访客数（UV）'
      }]
    }
  },
  mounted() {
    this.chart2()
    // this.channel()
    this.getQuery('api/v1/promotion/query/channel', 'options1')
    this.getQuery('api/v1/channel/pulldown/task', 'options2')
    this.getQuery('api/v1/promotion/query/material', 'options3')
    this.paramsGet()
  },
  methods: {
    getQuery(url, list) {
      listQuery(url).then(res => {
        this[list] = res.data
      })
    },
    queryGet(id) {
      if (id >= 0 && id < 3) {
        this.form.dateType = id
        this.paramsGet()
      } else if (id === 3 && !this.time) {
        this.$message({
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      } else {
        this.form.dateType = 3
        this.form.startDate = this.time[0]
        this.form.endDate = this.time[1]
        this.paramsGet()
      }
    },
    paramsGet() {
      // 环形图
      huan(this.form).then(res => {
        res.data.forEach(val => {
          delete val.percentageNum
          delete val.percentage
        })
        this.chart11 = res.data
        this.chart1()
      })
      // 数据指标
      // norm(this.form).then(res => {
      //   // console.log(res.data)
      // })
      // 表格
      // chartQuery(this.form).then(res => {
      //   // console.log(res.data)
      // })
      // 折线图
      inline(this.form).then(res => {
        console.log(res.data)
      })
    },
    cellStyle({ rowIndex }) {
      if (rowIndex === 1 || rowIndex === 2 || rowIndex === 3 || rowIndex === 4) {
        return 'background: #F5F7FA'
      }
    },
    chart1() {
      var myChart1 = echarts.init(document.getElementById('echarts1_box'))
      var option1 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          itemHeight: 10,
          itemWidth: 10,
          icon: 'circle'
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            labelLine: {
              show: true
            },
            label: {
              normal: {
                formatter: '{b} : {d}%'
              }
            },
            color: ['#5DB1FF', '#F2637B', '#3AA1FF', '#36CBCB', '#4ECB73', '#FBD437'],
            data: this.chart11
          }
        ]
      }
      myChart1.setOption(option1)
    },
    chart2() {
      var myChart2 = echarts.init(document.getElementById('echarts2_box'))
      var option2 = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['tokyo', 'london'],
          itemHeight: 5,
          itemWidth: 20,
          itemGap: 20,
          icon: 'rect',
          y: 'bottom'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value',
          max: 30,
          minInterval: 5,
          interval: 5
        },
        series: [{
          name: 'tokyo',
          type: 'line',
          data: [7, 6, 9, 14, 18, 22, 25, 26, 23, 18, 13, 9]
        },
        {
          name: 'london',
          type: 'line',
          data: [3, 4, 6, 8, 12, 15, 17, 16, 14, 11, 7, 5]
        }]
      }
      myChart2.setOption(option2)
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    background-color: #F0F2F5;
    padding: 20px 25px;
    .content-top {
      background-color: #fff;
      padding: 10px 15px;
      .block {
        float: right;
        margin-right: 50px;
        margin-top: 30px;
      }
      .timer {
        margin: 20px 0px;
      }
    }
    .content-middle {
      background-color: #fff;
      margin-top: 30px;
      padding: 10px 10px;
      overflow: hidden;
    }
  }
  .echarts {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 30px;
    div {
      float: left;
    }
  }
  .tab {
    border-top: 1px solid #f2f2f2;
    margin-top: 20px;
  }
  .timer ul {
      display: inline-block;
      padding: 0;
      margin: 0;
      vertical-align: middle;
      list-style: none;
      overflow: hidden;
      li {
        float: left;
        border: 1px solid #d9d9d9;
        padding: 10px 15px;
        cursor: pointer;
      }
  }
  .el-range-editor.el-input__inner {
    margin-left: 50px;
  }
  .channel {
    margin: 20px 0px;
    span {
      margin-left: 40px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .fa {
    position: absolute;
    z-index: 4;
  }
  .caption ul {
    border-bottom: 1px solid #f2f2f2;
    list-style: none;
    padding-bottom: 20px;
    overflow: hidden;
    li {
      float: left;
      padding: 0px 160px 0px 20px;
      border-right: 2px solid #f2f2f2;
      p {
        margin: 0;
        font-size: 25px;
        margin-top: 5px;
        font-family: 'Courier New', Courier, monospace;
      }
      span {
        font-size: 12px;
      }
      &:last-child {
         border: none;
      }
    }
  }
  .active {
    border: 1px solid #409EFF !important;
    color: #409EFF
  }
</style>
