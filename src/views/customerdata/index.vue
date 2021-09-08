<template>
  <div>
    <Header task="客户数据" />
    <div class="content">
      <ul>
        <li>
          <p>客户数</p>
          <span>10897688人</span>
        </li>
        <li>
          <p>准客户</p>
          <span>9209303人</span>
        </li>
        <li>
          <p>成交客户</p>
          <span>1688385人</span>
        </li>
        <li>
          <p>转化率</p>
          <span>36%</span>
        </li>
      </ul>
      <div class="main">
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
        <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#fafafa', color:'black'}">
          <el-table-column prop="serial" label="序号" width="60" />
          <el-table-column prop="name" label="客户姓名" width="100" />
          <el-table-column prop="sex" label="性别" width="80" />
          <el-table-column prop="phone" label="手机号码" width="130" />
          <el-table-column prop="task" label="任务名称" width="260" />
          <el-table-column prop="channel" label="渠道" width="100" />
          <el-table-column prop="date" label="留资时间" width="100" />
          <el-table-column prop="goods" label="购买产品" width="300" />
          <el-table-column prop="trajectory" label="访问轨迹">
            <template slot-scope="row">
              <el-link type="primary" :href="row.url">素材标题</el-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Headers'
import Channel from '@/components/Channel'
import Pagination from '@/components/PageCount'
export default {
  components: {
    Header,
    Channel,
    Pagination
  },
  data() {
    return {
      value1: '',
      tableData: [{
        serial: 1,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }, {
        serial: 2,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }, {
        serial: 3,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }, {
        serial: 4,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }, {
        serial: 5,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }, {
        serial: 6,
        name: '李晓红',
        sex: '女',
        phone: '188****5678',
        task: '“牛刀小试”开门红首销推动方案',
        channel: '付费渠道',
        date: '2020-09-20',
        goods: '2021华夏菩提树（至尊版）两全保险',
        trajectory: '素材标题'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    background-color: #F0F2F5;
    padding: 10px 15px 200px 15px;
    ul {
      list-style: none;
      overflow: hidden;
      background-color: #fff;
      padding: 10px 0px;
      li {
        float: left;
        border-right: 2px solid #f2f2f2;
        padding: 10px 100px;
        p {
          color: #807F8E;
          font-size: 12px;
          width: 50px;
          margin: 3px auto;
        }
        span {
          font-size: 25px;
          text-align: center;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 10px 20px 200px 20px;
    overflow: hidden;
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
