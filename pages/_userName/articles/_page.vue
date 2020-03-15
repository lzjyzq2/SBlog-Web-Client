<template>
  <div class="main-content">
    <!-- UserHome -->
    <div class="list-title">所有文章</div>
    <div>
      <article-list-item
        class="item-line"
        v-for="n in 5"
        :key="n"
        :url="articleList[0].url"
        :title="articleList[0].title"
        :content="articleList[0].content"
        :date="articleList[0].date"
        :tag="articleList[0].tag"
      />
    </div>
    <a-pagination hideOnSinglePage :defaultCurrent="parseInt($route.params.page)" :total="pagecount" @change="onChange" class="pagination" />
  </div>
</template>
<script>
/**
 * 用户文章列表页
 */
import ArticleListItem from "~/components/common/ArticleListItem";

export default {
  data: function() {
    return {
      articleList: [
        {
          url: "/articles/0",
          title:
            "Title，One Tilte,The title is very important，The title is very ...... ",
          content:
            "Text, the body is also very important, otherwise who knows what you want to do.Text, the body is also very important, otherwise who knows what you want to do......",
          date: "2020-03-11",
          tag: ["sblog", "text", "title"]
        }
      ],
      pagecount: 20
    };
  },
  components: {
    ArticleListItem
  },
  methods: {
    onChange(pageNumber) {
      
    }
  }
};
</script>
<style lang="less">
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
  .pagination{
    margin: 20px auto;
    text-align: center;
  }
}
</style>