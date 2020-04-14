<template>
  <div class="container">
      <div class="blog-menu-box">
          <a-menu class="blog-menu" v-model="current" mode="horizontal">
            <a-menu-item key="timeline">
              <nuxt-link :to="{name:'timeline'}">{{$t('userpublic.MenuItemTimeline')}}</nuxt-link>
            </a-menu-item>
            <a-menu-item key="messages">
              <nuxt-link :to="{name:'messages'}">{{$t('userpublic.MenuItemMessages')}}</nuxt-link>
            </a-menu-item>
            <a-menu-item key="history">
              <nuxt-link :to="{name:'history'}">{{$t('userpublic.MenuItemHistory')}}</nuxt-link>
            </a-menu-item>
            <a-menu-item key="collection">
              <nuxt-link :to="{name:'collection'}">{{$t('userpublic.MenuItemCollection')}}</nuxt-link>
            </a-menu-item>
          </a-menu>
      </div>
    <div class="main">
      <a-row class="contentbox" type="flex" :gutter="24">
        <a-col :md="{span:6,order:1}" :xs="{span:24,order:2}">
          <!-- 左侧用户信息与用户站点导航菜单 -->
          <user-panel />
          <user-home-nav style="margin-top:20px" />
          <tag-panel :tags="tags" style="margin-top:20px"/>
        </a-col>
        <a-col :xs="{span:24,order:1}" :md="{span:18,order:2}">
          <!-- 用户站点内，子路由 -->
          <nuxt-child />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
/**
 * 用户主页
 */
import UserHomeNav from "~/components/UserHomeNav";
import UserPanel from "~/components/UserPanel";
import TagPanel from "~/components/TagPanel";

export default {
  layout:'blog',
  validate({ params }) {
    //TODO 用户校验
    return true;
  },
  data: function() {
    return {
      current: [],
      tags:[
        {
          tag:"Test",
          num:10
        },
        {
          tag:"Java",
          num:10
        },{
          tag:"SpringBoot",
          num:10
        },{
          tag:"Text",
          num:10
        },{
          tag:"C#",
          num:10
        },{
          tag:"JPA",
          num:10
        },{
          tag:"Test",
          num:10
        }
      ]
    };
  },
  components: {
    UserHomeNav,
    UserPanel,
    TagPanel
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  .blog-menu-box {
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 5px 5px 0 #e8e8e8;
    .blog-menu-col {
      max-width: 1200px;
      margin: 0 auto;
      .blog-menu {
        border-bottom: none;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .main{
    display: flex;
    justify-content: center;
  }
  .contentbox {
    margin: 20px 0px;
    max-width: 1200px;
  }
}
</style>