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
      <a-row class="contentbox" type="flex" :gutter="24">
        <a-col :md="{span:6,order:1}" :xs="{span:24,order:2}">
          <!-- 左侧用户信息与用户站点导航菜单 -->
          <user-panel />
          <user-home-nav :user-name="userName" style="margin-top:20px" />
          <tag-panel :user-name="userName" :tags="tags" style="margin-top:20px" />
        </a-col>
        <a-col :xs="{span:24,order:1}" :md="{span:18,order:2}">
          <!-- 文章浏览 -->
          <div class="main-box">
            <div class="postcontent-box">
              <p class="title">Title Title Title Title Title Title Title</p>
              <author-follow-panel
                style="margin:10px 10px"
                :username="'lzjyzq2'"
                :sign="'Day Day Up!Good Good Study!'"
              />
              <div class="post-content" v-html="posthtml"></div>
            </div>
            <div class="side-box"></div>
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
/**
 * 用户主页
 */
import UserHomeNav from "~/components/UserHomeNav";
import UserPanel from "~/components/UserPanel";
import TagPanel from "~/components/TagPanel";
import AuthorFollowPanel from "~/components/common/AuthorFollowPanel";
import mdtest from "~/assets/README.md";
import markdowncss from "~/assets/markdown.less";
import hljs from "~/assets/highlightjs.less"
export default {
  layout: "blog",
  validate({ params }) {
    //TODO 用户校验
    return true;
  },
  data: function() {
    return {
      current: [],
      tags: [
        {
          tag: "Test",
          num: 10
        },
        {
          tag: "Java",
          num: 10
        },
        {
          tag: "SpringBoot",
          num: 10
        },
        {
          tag: "Text",
          num: 10
        },
        {
          tag: "C#",
          num: 10
        },
        {
          tag: "JPA",
          num: 10
        },
        {
          tag: "Test",
          num: 10
        }
      ],
      posthtml: mdtest,
      userName: "lzjyzq2"
    };
  },
  components: {
    UserHomeNav,
    UserPanel,
    TagPanel,
    AuthorFollowPanel
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

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 27px;
    font-weight: bold;
    margin: 10px;
  }
  @media screen and (max-width: 576px) {
    .main-box {
      width: 100%;
    }
    .postcontent-box {
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      box-shadow: 0 5px 5px 0 #e8e8e8;
    }
    .side-box {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .main-box {
      width: 100%;
    }
    .postcontent-box {
      width: 100%;
      margin-right: 100px;
      border: 1px solid #e8e8e8;
      box-shadow: 0 5px 5px 0 #e8e8e8;
      border-radius: 3px;
    }
    .side-box {
      width: 100px;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
  @media screen and (min-width: 1200px) {
    .contentbox {
      width: 1200px;
    }
  }
}
</style>