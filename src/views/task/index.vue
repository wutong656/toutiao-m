<template>
  <div>
    <div class="heads">
      <span>当前位置： 投放管理/任务管理</span>
      <h2>任务管理</h2>
    </div>
    <div class="container">
      <div class="content">
        <div class="content-header">
          <ul>
            <li v-for="(item, index) in navList" :key="index">{{ item.title }}</li>
          </ul>
          <el-button slot="reference" type="primary" class="btn" @click="creatfn">新建</el-button>
          <el-dialog
            :title="format"
            :visible.sync="dialogVisible"
          >
            <el-form label-width="80px" label-position="right">
              <el-form-item label="任务名称">
                <el-input placeholder="请输入内容" />
              </el-form-item>
              <el-form-item label="渠道">
                <el-select v-model="form.id" placeholder="请输入">
                  <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="目标获客">
                <el-input placeholder="请输入内容" />
              </el-form-item>
              <el-form-item label="任务类型">
                <el-select v-model="form.type" placeholder="请输入">
                  <el-option
                    v-for="item in options2"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="执行时间">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />

              </el-form-item>
              <el-form-item label="素材">
                <el-select placeholder="请输入">
                  <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 表格区域 -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="index" label="序号" width="60" />
          <el-table-column prop="name" label="任务名称" width="230" />
          <el-table-column prop="channelName" label="渠道" width="90" />
          <el-table-column prop="materialName" label="素材" width="200" />
          <el-table-column prop="typeName" label="任务类型" width="90" />
          <el-table-column prop="targetCustomers" label="目标客户数量" width="120" />
          <el-table-column prop="actualCustomers" label="实际获客数量" width="120" />
          <el-table-column label="完成率" width="150">
            <template slot-scope>
              <el-progress :percentage="100" />
            </template>
          </el-table-column>
          <el-table-column label="执行时间" width="230">
            <template>
              2021.09.03
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template>
              进行中
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template>
              编辑
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { querysList } from '@/api/task'
export default {
  data() {
    return {
      time: '',
      format: '',
      form: {
        channelId: '',
        createUser: 'admin',
        type: ''
      },
      dialogVisible: false,
      options1: [],
      options2: [],
      options3: [],
      navList: [{
        title: '全部',
        id: 1001
      }, {
        title: '进行中',
        id: 1002
      }, {
        title: '未开始',
        id: 1003
      }, {
        title: '已结束',
        id: 1004
      }],
      tableData: []
    }
  },
  mounted() {
    this.getList('api/v1/promotion/query/channel', 'options3')
    this.getList('/api/v1/channel/pulldown/task', 'options2')
    this.getList('/api/v1/promotion/query/material', 'options1')
  },
  methods: {
    creatfn() {
      this.format = '新建任务'
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getList(url, list) {
      querysList(url).then(res => {
        this[list] = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .heads {
    padding: 10px 20px 0px;
    span {
      color: #8d8d8d
    }
  }
  .container {
    padding: 20px;
    background-color: #F0F2F5;
    .content {
      padding: 20px;
      background-color: #fff;
      height: 600px;
      .content-header {
        overflow: hidden;
        border-bottom: 1px solid black;
        padding-bottom: 20px;
        ul {
          list-style: none;
          float: left;
          padding: 0;
          margin: 0;
          li {
            float: left;
            padding: 10px;
            border: 1px solid black
          }
        }
        .btn {
          float: right;
        }
        ::v-deep .el-input--medium .el-input__inner {
          border: none;
        }
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid black
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    border: none;
  }
</style>
