<template>
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
</template>

<script>
export default {
  name: 'Caption'
}
</script>

<style lang="scss" scoped>
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
</style>
