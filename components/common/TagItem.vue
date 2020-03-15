<template>
  <nuxt-link class="tag-item" :to="{name:'userName-tag-tag-page',params:{tag:tag,page:1}}">
    {{tag}}
    <div class="num">{{num}}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    tag: String,
    num: Number
  }
};
</script>

<style lang="less" scoped>
.tag-item {
  border-radius: 3px 0px 0px 3px;
  background: #e5e5e5;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  padding-left: 5px;
  margin: 4px;
  display: inline-block;
  color: #505050;
  &:last-child {
    margin-right: 0px;
  }
  .num {
    border-radius: 0px 3px 3px 0px;
    background: #d6d6d6;
    padding: 0px 5px;
    margin-left: 5px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    display: inline-block;
  }
}
</style>