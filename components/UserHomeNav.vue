<template>
  <a-row>
    <a-col class="userhomenav">
      <a-row class="item" :class="$route.name=='userName'?'active':''">
        <nuxt-link :to="{name:'userName'}">{{$t('components.userpanel.home')}}</nuxt-link>
      </a-row>
      <a-row class="item" :class="$route.name=='userName-articles-page'?'active':''">
        <nuxt-link
          :to="{name:'userName-articles-page',params:{page:1}}"
        >{{$t('components.userpanel.articles')}}</nuxt-link>
      </a-row>
      <a-row class="item" :class="$route.name=='userName-books-page'?'active':''">
        <nuxt-link
          :to="{name:'userName-books-page',params:{page:1}}"
        >{{$t('components.userpanel.books')}}</nuxt-link>
      </a-row>
      <a-row class="item" :class="$route.name=='userName-links-page'?'active':''">
        <nuxt-link
          :to="{name:'userName-links-page',params:{page:1}}"
        >{{$t('components.userpanel.links')}}</nuxt-link>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  props: {
    current: {
      type: String,
      default: "home"
    }
  }
};
</script>
<style lang="less">
.userhomenav {
  border: 1px solid #e8e8e8;
  box-shadow: 0 5px 5px 0 #e8e8e8;
  border-radius: 3px;
  .item {
    &.active {
      background: #1890ff;
      a {
        color: white;
      }
    }
    &:first-child{
        border-radius: 3px 3px 0px 0px;
      }
      &:last-child{
        border-radius: 0px 0px 3px 3px;
      }
    &:hover {
      background: #1890ff;
    }
    a {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      display: block;
      background: transparent;
      color: #505050;
      text-align: center;
      text-decoration: none;
    }
    a:hover {
      color: white;
    }
  }
}
</style>