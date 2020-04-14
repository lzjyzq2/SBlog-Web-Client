<template>
  <a-layout class="admin">
    <a-layout-header class="head">
      <a-menu :selectedKeys="current" mode="horizontal" theme="dark" :style="{ lineHeight: '64px' }">
        <a-menu-item key="admin-dashboard">
          <nuxt-link :to="{name:'admin'}">
            <a-icon type="dashboard" />DashBoard
          </nuxt-link>
        </a-menu-item>
        <a-sub-menu key="admin-article">
          <span slot="title">
              <a-icon type="read" />Article
          </span>
          <a-menu-item key="admin-article-write">
            <nuxt-link :to="{name:'admin-article-write'}">
              Write
            </nuxt-link>
          </a-menu-item>
           <a-menu-item key="admin-article-manage">
            <nuxt-link :to="{name:'admin-article-manage'}">
              Manage
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="admin-anthology">
          <nuxt-link :to="{name:'admin-anthology'}">
            <a-icon type="book" />Anthology
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-file">
          <nuxt-link :to="{name:'admin-file'}">
            <a-icon type="file" />File
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-links">
          <nuxt-link :to="{name:'admin-links'}">
            <a-icon type="link" />Links
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-collection">
          <nuxt-link :to="{name:'admin-collection'}">
            <a-icon type="folder" />Collection
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-follow">
          <nuxt-link :to="{name:'admin-follow'}">
            <a-icon type="star" />Follow
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin-settings">
          <nuxt-link :to="{name:'admin-settings'}">
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