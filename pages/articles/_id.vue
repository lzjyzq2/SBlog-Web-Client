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
      <a-row class="contentbox">
        <a-col :md="{span:6,order:1}" :xs="{span:24,order:2}">
          <!-- 左侧用户信息与用户站点导航菜单 -->
          <user-panel />
          <user-home-nav :user-name="userName" style="margin-top:20px" />
          <tag-panel :user-name="userName" :tags="usertags" style="margin-top:20px" />
        </a-col>
        <a-col :xs="{span:24,order:1}" :md="{span:18,order:2}">
          <!-- 文章浏览 -->
          <div class="main-box">
            <!-- 公式使用的样式表 -->
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
            />
            <div class="postcontent-box">
              <div class="title-border">
                <p class="title">Title Title Title Title Title Title Title</p>
                <author-follow-panel
                  style="margin:10px 10px"
                  :username="'lzjyzq2'"
                  :sign="'Day Day Up!Good Good Study!'"
                />
              </div>
              <div class="post-content" v-html="posthtml"></div>
              <div>
                <a-icon type="tags" class="icon" />
                <span class="tag" v-for="item in tags" :key="item">{{item}}</span>
              </div>
              <div class="post-action">
                <a-button shape="circle" icon="like" :size="'large'" style="margin-right:10px" />
                <a-button shape="circle" icon="star" :size="'large'" />
                <a-button shape="circle" icon="more" :size="'large'" style="float:right" />
              </div>
              <author-follow-panel
                style="margin:10px 10px"
                :username="'lzjyzq2'"
                :sign="'Day Day Up!Good Good Study!'"
              />
              <div class="post-nav">
                <nuxt-link class="nav-prev" :to="{name:'articles-id',params:{id:prevId}}">
                  <a-icon type="arrow-left" class="nav-icon" />
                  {{prevTitle}}
                </nuxt-link>
                <nuxt-link class="nav-next" :to="{name:'articles-id',params:{id:nextId}}">
                  {{nextTitle}}
                  <a-icon type="arrow-right" class="nav-icon" />
                </nuxt-link>
              </div>
            </div>

            <blog-comment style="margin-top:20px" />
            <div class="side-box"></div>
          </div>
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
import AuthorFollowPanel from "~/components/common/AuthorFollowPanel";
import mdtest from "~/assets/README.md";
import BlogComment from "~/components/BlogComment";

import markdowncss from "~/assets/css/markdown.less";
import hljs from "~/assets/css/highlightjs.less";
export default {
  layout: "blog",
  validate({ params }) {
    //TODO 用户校验
    return true;
  },
  data: function() {
    return {
      current: [],
      usertags: [
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
      tags: ["markdown", "test"],
      posthtml: mdtest,
      userName: "lzjyzq2",
      nextId: 0,
      nextTitle: "下一篇文章",
      prevId: 0,
      prevTitle: "上一篇文章"
    };
  },
  components: {
    UserHomeNav,
    UserPanel,
    TagPanel,
    AuthorFollowPanel,
    BlogComment
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
  .blog-menu-box {
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 5px 5px 0 #e8e8e8;
      .blog-menu {
        max-width: 1200px;
        margin: 0 auto;
        border-bottom: none;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
      }
  }

  .contentbox {
    margin: 20px 0px;
    max-width: 1200px;
  }

  .main{
    display: flex;
    justify-content: center;
  }
  .title-border {
    border-bottom: 1px solid #e8e8e8;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 27px;
      font-weight: bold;
      margin: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .post-action {
    padding: 10px 0px;
    margin-left: 10px;
    margin-right: 10px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }
  .post-nav {
    padding: 10px 10px;
    display: flex;
    border-top: 1px solid #e8e8e8;
    height: 48px;
    a {
      display: block;
      color: #505050;
      font-size: 18px;
      &:visited {
        color: #505050;
      }
      &:hover {
        color: #1890ff;
      }
    }
    .nav-prev {
      flex: 1;
      text-align: left;
      .nav-icon {
        margin-right: 5px;
      }
    }
    .nav-next {
      flex: 1;
      text-align: right;
      .nav-icon {
        margin-left: 5px;
      }
    }
  }
  .icon,
  .tag {
    margin-right: 5px;
  }
  .icon {
    margin-left: 10px;
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
}
</style>