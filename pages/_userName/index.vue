<template>
    <div class="main-content">
        <!-- UserHome -->
        <div class="list-title">最后更新</div>
        <div>
            <article-list-item
                class="item-line"
                v-for="(item,index) in recentlyArticles"
                :key="item.id+''+ index"
                :url="/articles/+item.id"
                :title="item.title"
                :content="item.summary"
                :date="item.publishTime"
                :tag="item.tag"
            />
        </div>

        <div class="list-title">文集</div>
        <div>
            <book-list-item
                class="item-line"
                v-for="(item,index) in books"
                :key="item.id+''+ index"
                :url="/books/+item.id"
                :title="item.name"
                :content="item.info?'没有简介':item.info"
            />
        </div>
    </div>
</template>
<script>
import ArticleListItem from "~/components/common/ArticleListItem";
import BookListItem from "~/components/common/BookListItem";
/**
 * 用户主页
 */
export default {
  async asyncData(context) {
    let recentlyArticleRes = await context.app.$sblogclient.recentlyArticle(
      context.params.userName
    );
    let publicBooksRes = await context.app.$sblogclient.publicBooks(
      context.params.userName
    );

    return {
      recentlyArticles: recentlyArticleRes.data.data,
      books: publicBooksRes.data.data,
    };

    //  return await Promise.all([
    //     context.app.$sblogclient.recentlyArticle(context.params.userName),
    //     context.app.$sblogclient.publicBooks(context.params.userName)
    //   ]).then(res => {
    //     return {
    //       recentlyArticles: res[0].data.data,
    //       books: res[1].data.data
    //     };
    //   });
  },
  data: function() {
    return {
      username: "",
      userid: -1,
      neckname: "",
      autograph: null,
      follow: 0,
      articles: 0,
      anthology: 0,
      tags: 0,
      canFollow: false,
      allTag: null,
      recentlyArticles: [],
      books: []
    };
  },
  components: {
    ArticleListItem,
    BookListItem
  }
};
</script>
<style lang="less" scoped>
.main-content {
  border: 1px solid #e8e8e8;
  box-shadow: 0 5px 5px 0 #e8e8e8;
  border-radius: 3px;
  .list-title {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #676767;
    text-align: right;
    padding: 0 15px;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
    &:first-child {
      border-top: none;
    }
  }
  .item-line {
    border-bottom: 1px solid #e8e8e8;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>