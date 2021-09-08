<template>
  <div>
    <!-- 头部区域 -->
    <Header title="投放管理 /" task="访客分析" />
    <!-- 主体部分 -->
    <div class="content">
      <div class="content-top">
        <div class="timer">
          <span>推广时间：</span>
          <el-button-group>
            <el-button style="border: 1px solid #1890ff">今日</el-button>
            <el-button>本周</el-button>
            <el-button>本月</el-button>
            <el-button>自定义</el-button>
          </el-button-group>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <Channel />
        <div class="vis">
          <span>访客：</span>
          <el-button-group>
            <el-button style="border: 1px solid #1890ff">全部</el-button>
            <el-button>准客户</el-button>
            <el-button>成交客户</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="content-middle">
        <ul>
          <li>
            <span>访客数（UV）</span>
            <p>1,998,286</p>
          </li>
          <li>
            <span>新访客数</span>
            <p>908,473</p>
          </li>
          <li>
            <span>转化次数</span>
            <p>908,473</p>
          </li>
          <li>
            <span>转化率</span>
            <p>53.45%</p>
          </li>
        </ul>
        <!-- 中部echarts -->
        <div class="middle">
          <div id="china_map" />
          <!-- 表格区域 -->
          <div class="tab">
            <el-table :data="tableData" :header-cell-style="{background:'#f4f4f4', color: 'black'}" :cell-style="cellStyle">
              <el-table-column prop="order" label="" width="80" />
              <el-table-column prop="name" label="省份" width="370" />
              <el-table-column prop="data" label="访客数（UV）" width="120" />
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
import 'echarts/china.js'
import Header from '@/components/Headers'
import Channel from '@/components/Channel'
export default {
  components: {
    Header,
    Channel
  },
  data() {
    return {
      value1: '',
      tableData: [{
        order: '1',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }, {
        order: '2',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }, {
        order: '3',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }, {
        order: '4',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }, {
        order: '5',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }, {
        order: '6',
        name: '广东',
        data: '124,183',
        proportion: '11.5%'
      }]
    }
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById('china_map'))
    const dataList = [{
      name: '北京', value: 200
    }, {
      name: '四川', value: 800
    }, {
      name: '福建', value: 600
    }, {
      name: '山东', value: 400
    }, {
      name: '江苏', value: 400
    }]
    var option1 = {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        min: 0,
        max: 1000,
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
    this.sex()
    this.age()
    this.education()
    this.occupation()
  },
  methods: {
    cellStyle({ columnIndex }) {
      if (columnIndex === 1) {
        return 'fontWeight: 700'
      }
    },
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
        series: [{
          data: [78, {
            value: 24,
            itemStyle: {
              color: '#F56E6A'
            }}],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9',
            label: {
              show: true,
              formatter: '{c}%'
            }
          }
        }]
      }
      myChart.setOption(options)
    },
    age() {
      var myChart = echarts.init(document.getElementById('d2'))
      var options = {
        title: {
          text: '年龄分布',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: ['18岁一下', '18-24岁', '25-34岁', '35-44岁', '45-54岁', '55岁以上'],
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
          data: [6, 26, 46, 22, 6, 6],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: '#4FA8F9'
          }
        }]
      }
      myChart.setOption(options)
    },
    education() {
      var myChart = echarts.init(document.getElementById('d3'))
      var options = {
        title: {
          text: '学历分布',
          left: '0px'
        },
        xAxis: {
          type: 'category',
          data: ['高中及一下', '大专', '本科及以上']
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
    }
  }
}
</script>

<style scoped>
   ul {
    list-style: none;
    overflow: hidden;
    padding-bottom: 20px;
  }
  p {
    padding: 0;
    margin: 0;
  }
  .content {
    background-color: #F0F2F5;
    padding: 20px 25px;
  }
  .content-top {
    background-color: #fff;
    padding: 10px 15px;
    overflow: hidden;
  }
  .content-middle ul {
    border-bottom: 1px solid #f2f2f2;
  }
  .content-middle {
    background-color: #fff;
    margin-top: 30px;
    padding: 10px 10px;
    overflow: hidden;
  }
  .content-middle ul li {
    float: left;
    padding: 0px 160px 0px 20px;
    border-right: 2px solid #f2f2f2;
  }
  .content-middle ul li:last-child {
    border: none;
  }
  .content-middle ul li span {
    font-size: 12px;
  }
  .content-middle ul li p {
    font-size: 25px;
    margin-top: 5px;
    font-family: 'Courier New', Courier, monospace;
  }
  #china_map .tab {
    float: left;
  }
  .middle {
    height: 400px;
    width: 100%;
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
  .footer {
    height: 400px;
    width: 100%;
    margin-top: 50px;
  }
  .footer>div {
    float: left;
    width: 32%;
    height: 400px;
  }
  #btm {
    height: 400px;
    width: 100%;
  }
  .vis {
    margin: 20px 0px;
  }
  .el-button-group>.el-button:not(:last-child) {
    margin: 0;
  }
   .timer {
    margin: 20px 0px;
  }
  .el-button-group>.el-button:not(:last-child) {
    margin: 0;
  }
  .el-range-editor.el-input__inner {
    margin-left: 50px;
  }
</style>
