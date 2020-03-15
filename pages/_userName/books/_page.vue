<template>
  <div class="main-content">
    <!-- UserHome -->
    <div class="list-title">所有文集</div>
    <div>
      <book-list-item
        class="item-line"
        v-for="n in 5"
        :key="n"
        :url="bookList[0].url"
        :title="bookList[0].title"
        :content="bookList[0].content"
      />
    </div>
    <a-pagination hideOnSinglePage :defaultCurrent="parseInt($route.params.page)" :total="pagecount" @change="onChange" class="pagination" />
  </div>
</template>
<script>
/**
 * 用户文章列表页
 */
import BookListItem from "~/components/common/BookListItem";

export default {
  data: function() {
    return {
      bookList: [
        {
          url: "/books/1",
          title:
            "Title，One Tilte,The title is very important，The title is very ...... ",
          content:
            "Text, the body is also very important, otherwise who knows what you want to do.Text, the body is also very important, otherwise who knows what you want to do......",
        }
      ],
      pagecount: 20
    };
  },
  components: {
    BookListItem
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