<template>
  <a-row class="layout-container">
    <a-col :span="24" class="wapper">
      <nuxt />
    </a-col>
    <a-col :span="24">
      <blog-footer />
    </a-col>
  </a-row>
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
#__nuxt,#__layout{
  min-height: 100vh;
  width: 100%;
}
.layout-container {
  min-height: 100vh;
  width: 100%;
}
.wapper {
  min-height: 100vh;
  width: 100%;
  padding-bottom: 59px;
}
</style>
