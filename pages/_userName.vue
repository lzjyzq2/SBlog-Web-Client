<template>
  <a-row class="container" type="flex" justify="center">
    <a-col :span="24">
      <a-row class="blog-menu-box">
        <a-col class="blog-menu-col">
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
        </a-col>
      </a-row>
    </a-col>
    <a-col>
      <a-row class="contentbox" :gutter="24">
        <a-col :md="6" :xs="0">
          <!-- 左侧用户信息与用户站点导航菜单 -->
          <!-- a-col xs下使用push替换路由与菜单位置  -->
          <user-panel />
          <user-home-nav style="margin-top:20px" />
          <tag-panel :tags="tags" style="margin-top:20px"/>
        </a-col>
        <a-col :xs="24" :md="18">
          <!-- 用户站点内，子路由 -->
          <nuxt-child />
        </a-col>
      </a-row>
    </a-col>
    <!-- <a-col :span="24">
      <blog-footer/>
    </a-col> -->
  </a-row>
</template>
<script>
/**
 * 用户主页
 */
import UserHomeNav from "~/components/UserHomeNav";
import UserPanel from "~/components/UserPanel";
import TagPanel from "~/components/TagPanel";
import BlogFooter from "~/components/BlogFooter";

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
    TagPanel,
    BlogFooter
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
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

  .contentbox {
    margin: 20px 0px;
    max-width: 1200px;
  }
}
</style>