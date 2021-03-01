<template>
  <div class="container">
    <page404 v-if="error.statusCode === 404" />
    <div v-else>
      应用发生错误异常
    </div>
  </div>
</template>

<script>
import Page404 from "../components/error/404"

  export default {
    props: ['error'],
    layout: 'blog', // 你可以为错误页面指定自定义的布局
    components:{
      Page404
    }
  }
</script>
<style lang="less" scoped>
.container{
  width: 100%;
}
</style>