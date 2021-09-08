<template>
  <div>
    <!-- 头部区域 -->
    <div class="header">
      <h4>当前位置：投放管理 / 访客分析</h4>
      <h2>投放管理</h2>
    </div>
    <!-- 主体部分 -->
    <div class="content">
      <div class="content-top">
        <div class="timer">
          <span>推广时间：</span>
          <ul>
            <li v-for="(item, index) in navList" :key="index" :class="{ active:listParams.dateType == item.id }" @click="getList(item.id)">{{ item.name }}</li>
          </ul>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </div>
        <div class="channel">
          <span>渠道：</span>
          <el-select v-model="listParams.channelId" size="middle" placeholder="请选择推广渠道" @change="changeList(1, listParams.channelId)">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span>任务：</span>
          <el-select v-model="listParams.promotionId" size="middlel" placeholder="请选择任务" @change="changeList(2, listParams.promotionId)">
            <el-option
              v-for="item in options2"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          <span>素材：</span>
          <el-select v-model="listParams.materialId" size="middle" placeholder="请选择素材" @change="changeList(3, listParams.materialId)">
            <el-option
              v-for="item in options3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="vis">
          <span>访客：</span>
          <ul>
            <li v-for="(item, index) in cusTomer" :key="index" :class="{ active:listParams.index == item.id }" @click="getList1(item.id)">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="content-middle">
        <!-- 指标数据 -->
        <el-row>
          <el-col :span="6">
            <span>访客数（UV）</span>
            <p>{{ quOta.visitors }}</p>
          </el-col>
          <el-col :span="6">
            <span>新访客数</span>
            <p>{{ quOta.newVisitors }}</p>
          </el-col>
          <el-col :span="6">
            <span>转化次数</span>
            <p>{{ quOta.converts }}</p>
          </el-col>
          <el-col :span="6">
            <span>转化率</span>
            <p>{{ quOta.convert_rate }}</p>
          </el-col>
        </el-row>
        <!-- 中部地图 -->
        <div class="middle">
          <!-- 地图 -->
          <div id="china_map" />
          <!-- 表格 -->
          <div class="tab">
            <el-table :data="tableData" :header-cell-style="{background:'#f4f4f4', color: 'black'}" :cell-style="cellStyle">
              <el-table-column prop="provinceCode" label="编码" width="80" />
              <el-table-column prop="provinceName" label="省份" width="370" style="font-weight: 700" />
              <el-table-column prop="amount" label="访客数（UV）" width="120" />
              <el-table-column prop="proportion" label="占比" />
            </el-table>
          </div>
        </div>
        <!-- 底部echarts -->
        <div class="footer">
          <div id="d1" />
          <div id="d2" />
          <div id="d3" />
        </div>
        <div id="btm" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import '@/assets/china'
import { quota, plat, frac, selectParams } from '@/api/visitor'
export default {
  data() {
    return {
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
      cusTomer: [{
        name: '全部',
        id: 2
      }, {
        name: '准客户',
        id: 0
      }, {
        name: '成交客户',
        id: 1
      }],
      options1: [], // 渠道列表
      options2: [], // 任务列表
      options3: [], // 素材列表
      value: '',
      dataList1: [],
      sexList: [], // 性别分布
      ageList: [], // 年龄分布x轴
      ageList1: [], // 年龄分布y轴
      listParams: {
        channelId: '',
        promotionId: '',
        materialId: '',
        index: '',
        customerType: '',
        dateType: ''
      },
      quOta: {}, // 指标数据
      value1: '',
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getParams()
    this.listQuery('api/v1/promotion/query/channel', 'options1') // 渠道查询
    this.listQuery('api/v1/channel/pulldown/task', 'options2') // 任务查询
    this.listQuery('api/v1/promotion/query/material', 'options3') // 素材查询
  },
  methods: {
    listQuery(url, list) {
      selectParams(url).then(res => {
        this[list] = res.data
      })
    },
    changeList(num, id) {
      switch (num) {
        case 1:
          this.listParams.channelId = id
          this.getParams()
          break
        case 2:
          this.listParams.promotionId = id
          this.getParams()
          break
        case 3:
          this.listParams.materialId = id
          this.getParams()
          break
      }
    },
    getList(id) {
      if (id >= 0 && id < 3) {
        this.listParams.dateType = id
        this.getParams()
      } else if (id === 3 && !this.value1) {
        this.$message({
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      } else {
        this.listParams.startDate = this.value1[0]
        this.listParams.endDate = this.value1[1]
        this.listParams.dateType = 3
        this.getParams()
      }
    },
    getList1(id) {
      this.listParams.index = id
      this.getParams()
    },
    getParams() {
      // 指标数据
      quota(this.listParams).then(res => {
        this.quOta = res.data
      })
      // 地图数据
      plat(this.listParams).then(res => {
        this.tableData = res.data
        this.dataList1 = JSON.parse(JSON.stringify(res.data))
        this.dataList1.forEach(v => {
          v.name = v.provinceName
          v.value = v.amount
          delete v.provinceName
          delete v.amount
          delete v.provinceCode
          delete v.proportion
          this.dataList1.push(v)
        })
        this.atals()
      })
      // 柱状图
      frac(this.listParams).then(res => {
        console.log(res.data)
        this.sexList[0] = parseInt(res.data[0].list[0].yvalue)
        this.sexList[1] = {
          value: parseInt(res.data[0].list[1].yvalue),
          itemStyle: {
            color: '#F56E6A'
          }
        }
        this.ageList = res.data[1].list.map(val => {
          return val.xvalue
        })
        this.ageList1 = res.data[1].list.map(val => {
          return parseInt(val.yvalue.split('%')[0])
        })
        this.sex() // 绘制性别图
        this.age() // 绘制年龄图
      })
      this.education()
      this.occupation()
    },
    cellStyle({ columnIndex }) {
      if (columnIndex === 1) {
        return 'fontWeight: 700'
      }
    },
    // 性别分布
    sex() {
      var myChart = echarts.init(document.getElementById('d1'))
      var options = {
        title: {
          text: '性别比例',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: ['男', '女']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#fafafa'
            }
          }
        },
        series: {
          type: 'bar',
          data: this.sexList,
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9',
            label: {
              show: true,
              formatter: '{c}%'
            }
          }
        }
      }
      myChart.setOption(options)
    },
    // 年龄分布
    age() {
      var myChart = echarts.init(document.getElementById('d2'))
      var options = {
        title: {
          text: '年龄分布',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: this.ageList,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#fafafa'
            }
          }
        },
        series: [{
          data: this.ageList1,
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9'
          }
        }]
      }
      myChart.setOption(options)
    },
    // 学历分布
    education() {
      var myChart = echarts.init(document.getElementById('d3'))
      var options = {
        title: {
          text: '学历分布',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: ['高中及以下', '大专', '本科及以上']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#fafafa'
            }
          }
        },
        series: [{
          data: [84, 7, 11],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9'
          }
        }]
      }
      myChart.setOption(options)
    },
    // 职业分布
    occupation() {
      var myChart = echarts.init(document.getElementById('btm'))
      var options = {
        title: {
          text: '职业分布',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: ['教育', '医药卫生', 'IT通信电子', '社会公共管理', '金融保险', '建筑房地产', '能源采矿化工', '汽车', '住宿旅游', '建材家居']
        },
        yAxis: {
          type: 'value',
          max: 40,
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#fafafa'
            }
          }
        },
        series: [{
          data: [31, 28, 8, 7, 6, 5, 6, 5, 3, 2],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9'
          }
        }]
      }
      myChart.setOption(options)
    },
    // 地图
    atals() {
      var myChart1 = echarts.init(document.getElementById('china_map'))
      const dataList = this.dataList1
      var option1 = {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 10000,
          left: 'left',
          top: 'bottom',
          itemHeight: '50',
          text: ['高', '低'],
          inRange: {
            color: ['#e0ffff', '#006edd']
          },
          show: true
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: false,
              fontStyle: '10',
              color: 'rgba(0, 0, 0, 0.5)'
            }, emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(214, 230, 248, 0.6)'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            areaColor: '#f3b329',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rbga(0, 0, 0, 0.5)'
          }
        },
        series: [{
          type: 'map',
          geoIndex: 0,
          data: dataList
        }]
      }
      myChart1.setOption(option1)
    }
  }
}
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    overflow: hidden;
    padding-bottom: 20px;
  }
  p {
    padding: 0;
    margin: 0;
  }
  .header {
    margin-bottom: 20px;
    height: 120px;
    background-color: #fff;
    padding: 10px;
    h4 {
      font-weight: 400;
      color: #807F8E;
    }
  }
  .content {
    background-color: #F0F2F5;
    padding: 20px 25px;
    .content-top {
      background-color: #fff;
      padding: 10px 15px;
    }
    .content-middle {
      background-color: #fff;
      margin-top: 30px;
      padding: 10px;
    }
  }
  .middle {
    height: 400px;
  }
  .middle>div:first-child {
    float: left;
    width: 40%;
    height: 400px;
  }
  .middle>div:last-child {
    float: left;
    width: 55%;
    height: 300px;
    margin-left: 30px;
    border: 1px solid #f2f2f2;
  }
  .timer, .vis, .channel {
    margin: 20px 0px;
  }
  .timer ul, .vis ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: middle;
  }
  .timer ul li, .vis ul li {
    float: left;
    border: 1px solid #d9d9d9;
    padding: 10px 15px;
    cursor: pointer;
  }
  .el-range-editor.el-input__inner {
    margin-left: 50px;
  }
  .channel span {
    margin-left: 40px;
    &:first-child {
      margin-left: 0;
    }
  }
  .active {
    border: 1px solid #409EFF !important;
    color: #409EFF
  }
  .content-middle .el-row {
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 20px;
    margin-bottom: 20px;
    & :last-child {
      border: none;
    }
  }
  .content-middle .el-col {
    border-right: 2px solid #f2f2f2;
    padding-left: 20px;
    span {
      font-size: 12px;
    }
    p {
      font-size: 25px;
      margin-top: 5px;
      font-family: 'Courier New', Courier, monospace;
    }
  }
  .footer {
    height: 400px;
    margin-top: 50px;
    div {
      width: 33%;
      height: 400px;
      float: left;
    }
  }
  #btm {
    height: 400px;
  }
</style>
