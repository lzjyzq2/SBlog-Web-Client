<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="timeline">
        <nuxt-link :to="{name:'timeline'}">{{$t('userpublic.MenuItemTimeline')}}</nuxt-link>
      </a-menu-item>
      <a-menu-item key="messages">
        <nuxt-link :to="{name:'messages'}">{{$t('userpublic.MenuItemMessages')}}</nuxt-link>
      </a-menu-item>
      <a-menu-item key="History">
        <nuxt-link :to="{name:'history'}">{{$t('userpublic.MenuItemHistory')}}</nuxt-link>
      </a-menu-item>
      <a-menu-item key="Collection">
        <nuxt-link :to="{name:'collection'}">{{$t('userpublic.MenuItemCollection')}}</nuxt-link>
      </a-menu-item>
    </a-menu>
    <nuxt-child/>
  </div>
</template>
<script>
/**
 * 用户主页
 */
export default {
  validate({ params }) {
      //TODO 用户校验
    return true;
  },
  data: function() {
    return {
        current:[]
    };
  }
};
</script>
<style lang="less">

</style>