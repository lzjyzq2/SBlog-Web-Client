<template>
  <a-layout style="flex:1;display:flex" :hasSider="true">
    <a-layout-sider theme="light" style="flex:1">
      <a-menu mode="inline">
        <a-sub-menu v-for="item in books" :key="item.id">
          <span slot="title">{{item.title}}</span>
          <a-sub-menu v-for="row in item.rows" :key="row.id">
            <span slot="title">{{row.title}}</span>
            <a-menu-item v-for="article in row.articles" :key="article.id">{{article.title}}</a-menu-item>
            <a-menu-item>
              <a-icon type="plus-circle" />新建文章
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item>
            <a-icon type="plus-square" />新建卷
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item>
          <a-icon type="plus-square" />新建文集
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="flex:1">
      <a-layout-content class="blog-write-content">
        <p class="title">标题</p>
        <a-input />
        <p class="title">正文</p>

        <a-row class="post-content">
          <a-col :span="12">
            <div contenteditable="plaintext-only" class="input" @keyup="onContentChange" />
          </a-col>
          <a-col :span="12">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
            />
            <div class="viewer" v-html="$md.render(input)" />
          </a-col>
        </a-row>

        <p class="title">标签（使用;分隔）</p>
        <a-input />
        <p class="title">
          定时发布
          <a-switch v-model="timePublish" />
        </p>
        <div v-if="timePublish">
          <a-date-picker @change="onChange" />
          <a-time-picker :defaultValue="moment('12:08', 'HH:mm')" format="HH:mm" />
        </div>
        <p class="title">评论</p>
        <a-radio-group name="comment" :defaultValue="true">
          <a-radio :value="true">开启</a-radio>
          <a-radio :value="false">关闭</a-radio>
        </a-radio-group>

        <p class="title">私密文章</p>
        <a-radio-group name="coverArticle" :defaultValue="false">
          <a-radio :value="true">开启</a-radio>
          <a-radio :value="false">关闭</a-radio>
        </a-radio-group>

        <p class="title">原创</p>
        <a-radio-group name="coverArticle" :defaultValue="true">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>

        <a-row type="flex" justify="end">
          <a-button>保存到草稿</a-button>
          <a-button type="primary" class="publish">发布</a-button>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import moment from "moment";
import markdowncss from "~/assets/css/markdown.less";
import hljs from "~/assets/css/highlightjs.less";

export default {
    asyncData (context) {
    //const { data } = await context.app.$sblogclient.getBookList();

    return context.app.$sblogclient.getBookList().then(res=>{
      console.log(res);
      return {books:res.data.data};
    }).catch((error)=>{
      
    })
  },
  data: function() {
    return {
      books: [
        {
          id: 0,
          title: "Java学习日志",
          info: "记录Java学习生活记录",
          rows: [
            {
              id: 0,
              title: "卷一",
              articles: [
                {
                  id: 0,
                  title: "文章标题一"
                },
                {
                  id: 1,
                  title: "文章标题二"
                }
              ]
            },
            {
              id: 1,
              title: "卷二",
              articles: [
                {
                  id: 2,
                  title: "文章标题一"
                },
                {
                  id: 3,
                  title: "文章标题二"
                }
              ]
            }
          ]
        }
      ],
      timePublish: false,
      input: ""
    };
  },
  methods: {
    onChange: function(e) {},
    onContentChange: function(e) {
      this.input = e.target.outerText;
    },
    moment
  }
};
</script>

<style lang="less" scoped>
.blog-write-content {
  padding: 20px;
  .title {
    margin: 10px 0px;
    font-weight: bold;
    color: #505050;
    font-size: 20px;
  }
  .post-content {
    background: white;

    .input {
      background: white;
      border-right: 1px solid #e8e8e8;
      min-height: 500px;
      padding: 10px;
    }
    .viewer {
      padding: 10px;
    }
  }
  .publish{
    margin-left: 10px;
  }
}
</style>