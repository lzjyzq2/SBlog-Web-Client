<template>
  <div class="book-item">
    <nuxt-link :to="url" class="title">{{title}}</nuxt-link>
    <p class="content">{{content}}</p>
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
    content: String
  }
};
</script>

<style lang="less" scoped>
.book-item {
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
      padding-bottom: 10px;
  }
}
</style>