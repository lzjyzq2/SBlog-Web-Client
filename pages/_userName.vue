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
import "~/assets/css/public.less";

export default {
  layout:'blog',
  validate({ params }) {
    //TODO 用户校验
    return true;
  },
  async asyncData(context) {

    let publicInfoRes = await context.app.$sblogclient.publicInfo(context.params.userName);
    let tagsRes = await context.app.$sblogclient.publicTags(context.params.userName);

    return {
      publicInfo: publicInfoRes.data.data,
      tags: tagsRes.data.data
    }
    // await Promise.all([
    //     context.app.$sblogclient.publicInfo(context.params.userName),
    //     context.app.$sblogclient.publicTags(context.params.userName)
    //   ]).then(res=>{
    //     console.log(res[0].data.data);
    //     console.log(res[1].data.data);
    //     return{
    //       publicInfo: res[0].data.data,
    //       tags: res[1].data.data
    //     }
    //   });
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
      ],
      publicInfo:{}
    };
  },
  components: {
    UserHomeNav,
    UserPanel,
    TagPanel
  }
};
</script>