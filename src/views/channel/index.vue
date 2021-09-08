<template>
  <div class="app-container">
    <div class="channel-container">
      <el-button type="primary" icon="el-icon-plus" size="mini" class="channel-add" @click="dialog = true">新建</el-button>
      <ul class="channel-tabs">
        <li v-for="(item,index) in navlist" @click="tabclick(item.id)" :class="{active:navactive == item.id}">{{item.title}}</li>
      </ul>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="b"
          label="渠道类型"
          width="220">
        </el-table-column>
        <el-table-column
          prop="c"
          label="渠道名称">
        </el-table-column>
        <el-table-column
          prop="d"
          label="合作类型">
        </el-table-column>
        <el-table-column
          label="渠道评级">
          <template slot-scope="{row}">
            <span v-if="row.e=='A'">A</span>
            <span v-else-if="row.e=='B'">B</span>
            <span v-else-if="row.e=='C'">C</span>
            <span v-else>未评级</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="f"
          label="合作时间"
          width="220">
        </el-table-column>
        <el-table-column
          label="合作状态">
          <template slot-scope="{row}">
            <span v-if="row.j=='A'||row.j=='B'||row.j=='C'||row.j=='D'||row.j=='E'"><em class="circle background1"></em>运行中</span>
            <span v-else-if="row.j=='F'||row.j=='G'||row.j=='H'||row.j=='I'||row.j=='G'||row.j=='K'"><em class="circle background2"></em>未开始</span>
            <span v-else><em class="circle background3"></em>已结束</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="stopClick(scope.row)">停止</el-button>
            <span class="channel-shu">|</span>
            <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
       <el-dialog :title="formtitle" :visible.sync="dialog">
        <el-form :model="form" label-width="100px">
          <el-form-item label="渠道类型">
            <el-select v-model="form.a" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称">
            <el-input v-model="form.b" autocomplete="off" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="合作类型">
            <el-select v-model="form.c" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作时间">
            <el-date-picker
              v-model="form.d"
              type="date"
              placeholder="合作时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="form.e" >{{baktext}}</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="channelsure()">保 存</el-button>
        </div>
      </el-dialog> 
    </div>
  </div>
</template>

<script>
import { channelList } from '@/api/channel'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Channel',
  components: { Pagination },
  data() {
    return {
      navactive: '1',
      navlist:[
        {title:"全部",id:1},
        {title:"进行中",id:2},
        {title:"未开始",id:3},
        {title:"已结束",id:4}
      ],
      total: 0,
      tableData: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      dialog:false,
      form:{
        a:'',
        b:'',
        c:'',
        d:'',
        e:'',
      },
      formtitle:"新建渠道",
      baktext:"停止"
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //  停止
    stopClick(row) {
      console.log(row)
    },
    editClick(row) {
      console.log(row)
      this.dialog = true;
      this.form = {
        a:'shanghai',
        b:'是啥嘎嘎嘎嘎',
        c:'shanghai',
        d:'',
        e:false,
      }
    },
    tabclick(id){
      console.log(id)
      this.navactive = id;
    },
    getList() {
      this.listLoading = true
      channelList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    channelsure(){
      console.log(this.form);
      this.dialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-container{
  padding:20px;
  background: #fff;
  position: relative;
}
.channel-shu{
  color: #1890ff;
  padding: 0 5px;
}
.circle{
  width:5px;
  height:5px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.background1{
  background: #67c23a;
}
.background2{
  background: #dfd215;
}
.background3{
  background: #f56c6c;
}
.channel-tabs{
  margin:0px;
  padding: 0px;
  margin-bottom: 20px;
}
.channel-tabs li{
  border:1px solid #dfe6ec;
  line-height: 30px;
  display: inline-block;
  width:80px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: all ease 0.3s;
}
.channel-tabs li.active{
  border:1px solid #1890ff;
  color: #1890ff;
}
.channel-tabs li:hover{
  color: #1890ff;
}
.channel-tabs li:first-child{
  border-radius: 4px 0px 0px 4px;
}
.channel-tabs li:last-child{
  border-radius: 0px 4px 4px 0px;
}
.pagination-container {
  margin: auto;
  text-align: right;
  margin-top: 10px;
}
.channel-add{
  position: absolute;
  right: 0;
  top: 23px;
}
.el-select,.el-date-editor.el-input, .el-date-editor.el-input__inner{width: 100%;}
</style>
