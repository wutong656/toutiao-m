<template>
  <div class="channel">
    <span>渠道删选：</span>
    <el-select v-model="value" size="middle" placeholder="请选择推广渠道">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>任务：</span>
    <el-select v-model="value" size="middlel" placeholder="请选择任务">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>素材：</span>
    <el-select v-model="value" size="middle" placeholder="请选择素材">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value: ''
    }
  }
}
</script>

<style scoped>
  .channel {
    margin: 20px 0px;
  }
  .channel span {
    margin-left: 40px;
  }
  .channel span:first-child {
    margin-left: 0;
  }
</style>
