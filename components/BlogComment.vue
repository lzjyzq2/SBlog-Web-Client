<template>
  <div class="comment-box">
    <comment-panel />
    <div>
      <comment-item>
        <comment-item v-for="n in 10" :key="n" />
      </comment-item>
      <comment-item v-for="n in 10" :key="n" />
    </div>

    <a-pagination
      hideOnSinglePage
      :defaultCurrent="commentPage"
      :total="pageCount"
      @change="onChange"
      class="pagination"
    />
  </div>
</template>

<script>
import CommentItem from "~/components/common/CommentItem";
import CommentPanel from "~/components/common/CommentPanel";

export default {
  data: function() {
    return {
      commentPage: 1,
      pageCount: 20
    };
  },
  components: {
    CommentItem,
    CommentPanel
  },
  methods: {
    onChange: function(e) {}
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  box-shadow: 0 5px 5px 0 #e8e8e8;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  .pagination {
    margin: 20px auto;
    text-align: center;
  }
}
</style>