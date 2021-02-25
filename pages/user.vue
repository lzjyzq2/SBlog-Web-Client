<template>
  <a-layout class="admin">
    <a-layout-header class="head">
      <a-menu :selectedKeys="current" mode="horizontal" theme="dark" :style="{ lineHeight: '64px' }">
        <a-menu-item key="user-dashboard">
          <nuxt-link :to="{name:'user'}">
            <a-icon type="dashboard" />DashBoard
          </nuxt-link>
        </a-menu-item>
        <a-sub-menu key="user-article">
          <span slot="title">
              <a-icon type="read" />Article
          </span>
          <a-menu-item key="user-article-write">
            <nuxt-link :to="{name:'user-article-write'}">
              Write
            </nuxt-link>
          </a-menu-item>
           <a-menu-item key="user-article-manage">
            <nuxt-link :to="{name:'user-article-manage'}">
              Manage
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="user-anthology">
          <nuxt-link :to="{name:'user-anthology'}">
            <a-icon type="book" />Anthology
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="user-file">
          <nuxt-link :to="{name:'user-file'}">
            <a-icon type="file" />File
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="user-links">
          <nuxt-link :to="{name:'user-links'}">
            <a-icon type="link" />Links
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="user-collection">
          <nuxt-link :to="{name:'user-collection'}">
            <a-icon type="folder" />Collection
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="user-follow">
          <nuxt-link :to="{name:'user-follow'}">
            <a-icon type="star" />Follow
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="user-settings">
          <nuxt-link :to="{name:'user-settings'}">
            <a-icon type="setting" />Settings
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <nuxt-child />
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  layout: "blog",
  data: function() {
    return {
      current: [this.$route.name]
    };
  }
};
</script>

<style lang="less" scoped>
.admin {
  flex:1;
  display: flex;
  .head {
    color: white;
  }
  .content{
    display: flex;
    flex:1;
  }
}
</style>