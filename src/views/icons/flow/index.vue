<template>
  <div>
    <!-- 头部区域 -->
    <Header title="投放管理 /" task="流量分析" />
    <!-- 主体部分 -->
    <div class="content">
      <div class="content-top">
        <Timer />
        <Channel />
      </div>
      <!-- 主体中间部分 -->
      <div class="content-middle">
        <Caption />
        <!-- 可视化图表 -->
        <div class="echarts">
          <div id="echarts1_box" style="width: 400px; height: 400px" />
          <div id="echarts2_box" style="width: 800px; height: 400px" />
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
import Timer from '@/components/Timers'
import Channel from '@/components/Channel'
import Caption from '@/components/Caption'
export default {
  components: {
    Header,
    Timer,
    Channel,
    Caption
  },
  data() {
    return {
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
      }]
    }
  },
  mounted() {
    this.chart1()
    this.chart2()
  },
  methods: {
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
            data: [{
              value: 1048, name: 'Tom'
            }, {
              value: 735, name: 'Mary'
            }, {
              value: 580, name: 'Jim'
            }, {
              value: 484, name: 'Tony'
            }, {
              value: 300, name: 'May'
            }]
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

<style scoped>
  .content {
    background-color: #F0F2F5;
    padding: 20px 25px;
  }
  .content-top {
    background-color: #fff;
    padding: 10px 15px;
  }
  .content-top .block {
    float: right;
    margin-right: 50px;
    margin-top: 30px;
  }
  .content-middle {
    background-color: #fff;
    margin-top: 30px;
    padding: 10px 10px;
    overflow: hidden;
  }
  .echarts {
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 30px;
  }
  .echarts div {
    float: left;
  }
  .tab {
    border-top: 1px solid #f2f2f2;
    margin-top: 20px;
  }
</style>
