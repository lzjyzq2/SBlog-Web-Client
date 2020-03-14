<template>
  <div class="article-item">
    <nuxt-link :to="url" class="title">{{title}}</nuxt-link>
    <p class="content">{{content}}</p>
    <div class="info">
        <a-icon type="clock-circle" class="icon"/><span>{{date}}</span>
        <a-icon type="tags" class="icon" /><span class="tag" v-for="item in tag" :key="item">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    url:String,
    title: String,
    content: String,
    date: String,
    tag: Array
  }
};
</script>

<style lang="less" scoped>
.article-item {
  margin: 10px 15px 0px 15px;
  p{
      margin-bottom: 0px;
  }
  .title{
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      font-weight: bold;
      color: #1c1c1c;
  }
  .content{
      font-size: 16px;
      color: #505050;
  }
  .info{
      margin: 10px 0px;
  }
  .icon{
      margin-right: 5px;
  }
  .tag{
      margin-right: 5px;
  }
}
</style>