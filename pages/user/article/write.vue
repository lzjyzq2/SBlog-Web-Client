<template>
    <a-layout :hasSider="true">
        <a-layout-sider theme="light">
            <a-button icon="plus-square" type="link" @click="showBookModal" block>新建文集</a-button>
            <a-modal v-model="createBookVisible" title="新建文集" @ok="createBookOk">
                <a-input placeholder="文集名称" v-model="createBookName" />
                <a-input placeholder="文集描述" v-model="createBookInfo" />
            </a-modal>
            <a-menu
                mode="inline"
                :open-keys="openKeys"
                @openChange="onOpenChange"
                @select="menuItemSelect" >
                <a-sub-menu v-for="(book,bIndex) in books" :key="book.id+''" :index="bIndex">
                    <span slot="title">{{book.name}}</span>
                    <a-sub-menu v-for="(subsection,sIndex) in book.subsections" :key="book.id+':'+subsection.id" :index="sIndex">
                        <span slot="title">{{subsection.name}}</span>
                        <a-menu-item
                            v-for="(article,aIndex) in subsection.articles"
                            :index="bIndex+':'+sIndex+':'+aIndex"
                            :key="book.id+':'+subsection.id+':'+article.id"
                        >{{selectArticle&&article.id==selectArticle.id?selectArticle.title:article.title}}</a-menu-item>
                        <a-button
                            icon="plus-circle"
                            type="link"
                            block
                            @click="createArticle(book.id,subsection.id)"
                        >新建文章</a-button>
                    </a-sub-menu>
                    <a-button
                        icon="plus-square"
                        type="link"
                        block
                        @click="showRowModal(book.id)"
                    >新建分卷</a-button>
                    <a-modal v-model="createSubVisible" title="新建分卷" @ok="createRowOk">
                        <a-input placeholder="卷名称" v-model="createSubName" />
                    </a-modal>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout style="width:100%">
            <a-layout-content class="blog-write-content" v-if="selectArticle">
                <p class="title">标题</p>
                <a-input v-model="selectArticle.title" />
                <p class="title">正文</p>

                <no-ssr>
                    <v-md-editor ref="editor" v-model="selectArticle.content" style="min-height:500px"></v-md-editor>
                </no-ssr>
                <p class="title">
                    自动摘要
                    <a-switch v-model="selectArticle.autoSummary" />
                </p>
                <a-textarea
                    v-if="!selectArticle.autoSummary"
                    placeholder="摘要"
                    v-model="selectArticle.summary"
                    class="summary"
                    :autosize="true"
                />
                <p class="title">标签（使用;分隔）</p>
                <a-select
                    mode="tags"
                    style="width: 100%"
                    :token-separators="[',']"
                    @change="tagsChange"
                >
                    <a-select-option v-for="item in tags" :key="'item'+item.id">{{ item.name}}</a-select-option>
                </a-select>
                <p class="title">
                    定时发布
                    <a-switch v-model="selectArticle.taskPublish" />
                </p>
                <div v-if="selectArticle.taskPublish">
                    <a-date-picker @change="onDateChange" v-model="publishTime" />
                    <a-time-picker v-model="publishTime" @change="onTimeChange" />
                </div>
                <p class="title">评论</p>
                <a-radio-group
                    name="comment"
                    v-model="selectArticle.canComment"
                    :defaultValue="selectArticle.canComment"
                >
                    <a-radio :value="true">开启</a-radio>
                    <a-radio :value="false">关闭</a-radio>
                </a-radio-group>

                <p class="title">私密文章</p>
                <a-radio-group
                    name="coverArticle"
                    v-model="selectArticle.canView"
                    :defaultValue="selectArticle.canView"
                >
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>

                <p class="title">原创</p>
                <a-radio-group
                    name="coverArticle"
                    v-model="selectArticle.canCopy"
                    :defaultValue="selectArticle.canCopy"
                >
                    <a-radio :value="true">是</a-radio>
                    <a-radio :value="false">否</a-radio>
                </a-radio-group>

                <a-row type="flex" justify="end">
                    <a-button @click="deleteBtn" type="danger">删除</a-button>
                    <a-button @click="saveBtn">保存到草稿</a-button>
                    <a-button type="primary" class="publish" @click="publishBtn">发布</a-button>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import moment from "moment";
// import markdowncss from "~/assets/css/markdown.less";
import hljs from "~/assets/css/highlightjs.less";
import EditerView from "~/components/common/EditerView";
import "katex/dist/katex.min.css";
export default {
  asyncData(context) {
    return context.app.$sblogclient
      .getBookList()
      .then(res => {
        if(res.data.data.length>0){
          return {
            books: res.data.data,
            // openKeys: [''+res.data.data[0].id],
            // latestOpenKey: ''+res.data.data[0].id
          };
        }
        
      })
      .catch(error => {});
  },
  components: {
    EditerView
  },
  data: function() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      books: [],
      // books: [
      //   {
      //     id: 0,
      //     name: "Java学习日志",
      //     info: "记录Java学习生活记录",
      //     subsections: [
      //       {
      //         id: 0,
      //         name: "卷一",
      //         articles: [
      //           {
      //             id: 0,
      //             title: "文章标题一"
      //           },
      //           {
      //             id: 1,
      //             title: "文章标题二"
      //           }
      //         ]
      //       },
      //       {
      //         id: 1,
      //         name: "卷一",
      //         articles: [
      //           {
      //             id: 2,
      //             title: "文章标题一"
      //           },
      //           {
      //             id: 3,
      //             title: "文章标题二"
      //           }
      //         ]
      //       },
      //       {
      //         id: 2,
      //         name: "卷一",
      //         articles: [
      //           {
      //             id: 4,
      //             title: "文章标题一"
      //           },
      //           {
      //             id: 5,
      //             title: "文章标题二"
      //           }
      //         ]
      //       },
      //     ],
      //   },
      //   {
      //     id: 1,
      //     name: "Java学习日志",
      //     info: "记录Java学习生活记录",
      //     subsections: [
      //       {
      //         id: 3,
      //         name: "卷一",
      //         articles: [
      //           {
      //             id: 6,
      //             title: "文章标题一"
      //           },
      //           {
      //             id: 7,
      //             title: "文章标题二"
      //           }
      //         ]
      //       },
      //     ]
      //   }
      // ],
      input: "", //输入内容
      tags: [{ id: 1, name: "Test" }], //标签
      createBookVisible: false, //
      createBookName: "", //
      createBookInfo: "", //
      createSubVisible: false, //
      createSubName: "", //
      isModitfy: false, //是否已修改
      publishTime: moment(),


      openKeys: [], //
      latestOpenKey: "", //
      selectArticleKey: null, //
      selectArticle: null,
    };
  },
  mounted: function() {
    
  },
  methods: {
    onDateChange: function(e) {},
    onTimeChange: function(e) {},
    tagsChange: function(e) {},


    showBookModal: function() {
      this.createBookVisible = true;
    },
    createBookOk: function(e) {
      this.createBookVisible = false;
      this.$sblogclient
        .createBook(this.createBookName, this.createBookInfo)
        .then(res => {
          if (res.data.code == 0) {
            this.books = [res.data.data].concat(this.books);
          }
        })
        .catch(error => {});
    },

    showRowModal: function(bid) {
      this.createSubVisible = true;
      this.selectBookId = bid;
    },
    createRowOk: function() {
      this.createSubVisible = false;
      this.$sblogclient
        .createSub(this.selectBookId, this.createSubName)
        .then(res => {
          if (res.data.code == 0)
            for (var i = 0; i < this.books.length; i++) {
              if (this.books[i].id == this.selectBookId) {
                if (this.books[i].subsections == undefined) {
                  this.books[i].subsections = [res.data.data];
                } else {
                  this.books[i].subsections.push(res.data.data);
                }
              }
            }
        });
    },
    getLasetOpenKey:function(openKeys){
      let latestOpenKey;
      if(openKeys.length>=this.openKeys.length){
        latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key)===-1);
      }else{
        latestOpenKey = this.openKeys.find(key => openKeys.indexOf(key)===-1);
      }
      return latestOpenKey;
    },
    onOpenChange:function(openKeys) {
      const latestOpenKey = this.getLasetOpenKey(openKeys);
      const ids = this.getId(latestOpenKey);
      if(ids.length==1){
        if(this.openKeys.indexOf(latestOpenKey)===-1){
          // 文集菜单被打开
          this.openKeys = [latestOpenKey];
          this.requestSubData(ids[0]);
        }else{
          // 文集菜单被关闭
          this.openKeys = [];
        }
      }else if(ids.length==2){
        if(this.openKeys.indexOf(latestOpenKey)===-1){
          // 分卷菜单被打开
          this.openKeys = [ids[0]+'',latestOpenKey]
          this.requestArticleData(ids[0],ids[1]);
        }else{
          // 分卷菜单被关闭
          this.openKeys = [ids[0]+'']
        }
      }
    },
    requestSubData: function(bid) {
        this.$sblogclient.getSubList(bid).then(res => {
          if (res.data.code == 0)
            this.books.find(book => book.id == bid).subsections = res.data.data;
        });
    },
    requestArticleData:function(bid,sid){
      this.$sblogclient.getArticleList(sid).then(res => {
          if (res.data.code == 0)
            this.books
              .find(book => book.id == bid)
              .subsections.find(
                sub => sub.id == sid
              ).articles = res.data.data;
        });
    },
    createArticle: function(bookId, subId) {
      let book = {
        title: "新建文章",
        summary: "",
        content: "开始创作你的文章吧~",
        subsectionId: subId,
        tags: [],
        canComment: true,
        canCopy: false,
        canView: true,
        isTaskPublish: false,
        publishTime: Date.now(),
        state: 0
      };
      this.$sblogclient.createArticle(book).then(res => {
        this.books
          .find(book => book.id == bookId)
          .subsections.find(sub => sub.id == subId)
          .articles.push(res.data.data);
      });
    },
    menuItemSelect: function({ item, key, selectedKeys }) {
      let ids = this.getId(key);


      let selectBook = this.books.find(book=>book.id==ids[0]);
      let selectSub = selectBook.subsections.find(subsection => subsection.id = ids[1]);
      let selectArticle = selectSub.articles.find(article => article.id == ids[2]);

      this.$sblogclient.getArticleInfo(selectArticle.id).then(res => {
        this.selectArticle = res.data.data;
        this.selectArticleKey = key;
      });
    },
    getIndex:function(index){
      return index.split(":");
    },
    getId:function(key){
      if(key!=null)
        return key.split(":");
    },
    getArticleArray: function() {
      if(this.selectArticleKey!=null)
      return this.selectArticleKey.split(":");
    },
    publishBtn: function() {
      if (this.selectArticle) {
        this.selectArticle.state = 1;
        if (this.selectArticle.taskPublish)
          this.selectArticle.publishTime = this.publishTime.format(
            "YYYY-MM-DD HH:mm:ss"
          );
        if (this.selectArticle.autoSummary)
          this.selectArticle.summary = this.$refs.editor.$el.children[1].children[1].children[1].outerText.substring(0,200);
        this.$sblogclient.updateArticle(this.selectArticle).then(res => {
          if (res.data.code == 0) this.$message.info("发布成功", 2.5);
        });
      }
    },
    saveBtn: function() {
      if (this.selectArticle) {
        this.selectArticle.state = 0;
        if (this.selectArticle.taskPublish)
          this.selectArticle.publishTime = this.publishTime.format(
            "YYYY-MM-DD HH:mm:ss"
          );
        if (this.selectArticle.autoSummary)
          this.selectArticle.summary = this.$refs.editor.$el.children[1].children[1].children[1].outerText.substring(0,200);
        this.$sblogclient.updateArticle(this.selectArticle).then(res => {
          if (res.data.code == 0) this.$message.info("保存为草稿成功", 2.5);
        });
      }
    },
    deleteBtn: function() {
      if (this.selectArticle)
        this.$sblogclient.deleteArticle(this.selectArticle.id).then(res => {
          if (res.data.code == 0) {
            this.$message.info("删除成功", 2.5);
            this.selectArticle = null;
            let idarr = this.getArticleArray();
            let selectBook = this.books.find(book=>book.id==idarr[0]);
            let selectSub = selectBook.subsections.find(subsection => subsection.id = idarr[1]);
            let aIndex = selectSub.articles.findIndex(article => article.id == idarr[2]);
            selectSub.articles.splice(aIndex,1);
            this.selectArticleKey = null;
          }
        });
    },
    moment
  }
};
</script>

<style lang="less" scoped>
.blog-write-content {
  padding: 20px;
  width: 100%;
  max-width: 100%;
  display: block;
  .title {
    margin: 10px 0px;
    font-weight: bold;
    color: #505050;
    font-size: 20px;
  }
  .post-content {
    background: white;
    width: 100%;
  }
  .publish {
    margin-left: 10px;
  }
  .summary {
    background: white;
    border-right: 1px solid #e8e8e8;
    padding: 10px;
  }
}
</style>
<style lang="less">
.v-note-edit {
  word-break: break-all;
  box-shadow: 0 0 black;
}
</style>