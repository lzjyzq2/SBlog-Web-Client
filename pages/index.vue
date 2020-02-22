<template>
  <div class="container">
    <div>
      <h1 class="title">
        SBlogWebClient
      </h1>
      <h2 class="subtitle">
        S&#x27;Blog博客系统
      </h2>
      <div class="links">
        <a
          href="/user/login"
          target="_blank"
          class="button--green"
        >
          开始使用
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link :to="{name:'user-id',params:{id:12}}">test</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 站点主页
 */
export default {
  components: {
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
