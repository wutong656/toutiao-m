<template>
  <div class="header">
    <h4>当前位置：{{ title }}  {{ task }}</h4>
    <h2>{{ task }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title', 'task']
}
</script>

<style scoped>
  .header {
    margin-bottom: 20px;
    height: 120px;
    padding-left: 30px;
    background-color: #fff;
    padding: 10px;
  }
  h4 {
    font-weight: 400;
    color: #807F8E;
  }
</style>
