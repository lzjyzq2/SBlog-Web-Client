<template>
  <a-layout class="layout-container">
    <a-layout-content class="main">
      <nuxt />
    </a-layout-content>
    <a-layout-footer class="footer">
      <blog-footer />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import BlogFooter from "~/components/BlogFooter";

export default {
  components: {
    BlogFooter
  }
};
</script>
<style lang="less">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.layout-container {
  min-height: 100vh;
  width: 100%;
  background: white;
  .main{
    flex: 1;
    display: flex;
  }
  .footer{
    padding: 0px;
  }
}
</style>
