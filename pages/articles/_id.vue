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
            <a-row class="contentbox" :gutter="24">
                <a-col :md="{span:6,order:1}" :xs="{span:24,order:2}">
                    <!-- 左侧用户信息与用户站点导航菜单 -->
                    <user-panel />
                    <user-home-nav :user-name="userName" style="margin-top:20px" />
                    <tag-panel :user-name="userName" :tags="usertags" style="margin-top:20px" />
                </a-col>
                <a-col :xs="{span:24,order:1}" :md="{span:18,order:2}">
                    <!-- 文章浏览 -->
                    <div class="main-box">
                        <div class="postcontent-box">
                            <div class="title-border">
                                <div class="title">{{article.title}}</div>
                                <author-follow-panel
                                    style="margin:10px 20px"
                                    :username="'lzjyzq2'"
                                    :sign="'Day Day Up!Good Good Study!'"
                                />
                            </div>
                            <div
                                class="post-border github-markdown-body"
                                v-html="$md.render(article.content)"
                            ></div>
                            <div class="tag-box">
                                <a-icon type="tags" class="icon" />
                                <span class="tag" v-for="item in tags" :key="item">{{item}}</span>
                            </div>
                            <div class="post-action">
                                <a-button
                                    shape="circle"
                                    icon="like"
                                    :size="'large'"
                                    style="margin-right:10px"
                                />
                                <a-button shape="circle" icon="star" :size="'large'" />
                                <a-button
                                    shape="circle"
                                    icon="more"
                                    :size="'large'"
                                    style="float:right"
                                />
                            </div>
                            <author-follow-panel
                                style="margin:10px 20px"
                                :username="'lzjyzq2'"
                                :sign="'Day Day Up!Good Good Study!'"
                            />
                            <div class="post-nav">
                                <nuxt-link
                                    class="nav-prev"
                                    :to="{name:'articles-id',params:{id:prevId}}"
                                >
                                    <a-icon type="arrow-left" class="nav-icon" />
                                    {{prevTitle}}
                                </nuxt-link>
                                <nuxt-link
                                    class="nav-next"
                                    :to="{name:'articles-id',params:{id:nextId}}"
                                >
                                    {{nextTitle}}
                                    <a-icon type="arrow-right" class="nav-icon" />
                                </nuxt-link>
                            </div>
                        </div>

                        <blog-comment
                            style="margin-top:20px"
                            :comments="comments"
                            :articleId="$route.params.id"
                            @flushComments="flushComment"
                            @flushReply="flushReply"
                        />
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
//import mdtest from "~/assets/README.md";
import BlogComment from "~/components/BlogComment";
import "~/assets/css/github-markdown.css";
//import markdowncss from "~/assets/css/next.less";
import hljs from "~/assets/css/highlightjs.less";
import "katex/dist/katex.min.css";
import "~/assets/css/public.less";

export default {
  layout: "blog",
  validate({ params }) {
    //TODO 用户校验
    return true;
  },
  async asyncData(context) {
    return await Promise.all([
      context.$sblogclient.viewArticle(context.params.id),
      context.$sblogclient.getComments(context.params.id, 0),
    ])
      .then((res) => {
        return {
          article: res[0].data.data,
          comments: res[1].data.data,
        };
      })
      .catch((err) => {
        if (err.status == 404) {
          context.error({ statusCode: 404, message: "Post not found" });
        }
      });
  },
  data: function () {
    return {
      current: [],
      usertags: [
        {
          tag: "Test",
          num: 10,
        },
        {
          tag: "Java",
          num: 10,
        },
        {
          tag: "SpringBoot",
          num: 10,
        },
        {
          tag: "Text",
          num: 10,
        },
        {
          tag: "C#",
          num: 10,
        },
        {
          tag: "JPA",
          num: 10,
        },
        {
          tag: "Test",
          num: 10,
        },
      ],
      tags: ["markdown", "test"],
      posthtml: "::: tip click me\n*content*\n:::\n",
      userName: "lzjyzq2",
      nextId: 0,
      nextTitle: "下一篇文章",
      prevId: 0,
      prevTitle: "上一篇文章",
      article: null,
      comments: null,
    };
  },
  components: {
    UserHomeNav,
    UserPanel,
    TagPanel,
    AuthorFollowPanel,
    BlogComment,
  },
  methods: {
    flushComment: function (articleId,commentPage) {
      this.$sblogclient
        .getComments(articleId,commentPage)
        .then((res) => {
          this.comments = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    flushReply: function () {},
  },
};
</script>
<style lang="less" scoped>
.container {
  // margin: 0 auto;
  // .blog-menu-box {
  //   border-bottom: 1px solid #e8e8e8;
  //   box-shadow: 0 5px 5px 0 #e8e8e8;
  //     .blog-menu {
  //       max-width: 1200px;
  //       margin: 0 auto;
  //       border-bottom: none;
  //       font-size: 16px;
  //       height: 50px;
  //       line-height: 50px;
  //     }
  // }

  // .contentbox {
  //   margin: 20px 0px;
  //   max-width: 1200px;
  // }

  // .main{
  //   display: flex;
  //   justify-content: center;
  // }
  .title-border {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    display: block;
    .title {
      width: 100%;
      line-height: 40px;
      font-size: 27px;
      font-weight: bold;
      padding: 10px 20px;
      word-break: normal;
    }
  }
  .post-border {
    padding: 20px;
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
  .tag-box {
    margin: 5px 0px;
  }
  .icon,
  .tag {
    margin-right: 5px;
    font-size: 20px;
  }
  .icon {
    margin-left: 10px;
  }
  @media screen and (max-width: 576px) {
    .main-box {
      width: 100%;
    }
    .postcontent-box {
      max-width: 100%;
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
      max-width: 100%;
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