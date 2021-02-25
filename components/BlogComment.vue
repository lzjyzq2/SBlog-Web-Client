<template>
    <div class="comment-box">
        <comment-panel @comment="comment"/>
        <div>
            <comment-item
                v-for="(comment,index) in comments.comments"
                :key="comment.commentId"
                :showInput="comment.commentId==nowCommentKey"
                @showComment="showCommentPanel(comment.commentId)"
                :index="index"

                :comment="comment"
            >
                <template v-slot:input>
                    <comment-panel mode="reply" :parentCommentId="comment.commentId" :commentIndex="[index]"/>
                </template>
                <!-- <template v-slot:item>
                    <comment-item
                        v-for="n in 10"
                        :key="n"
                        :showInput="n==nowCommentKey"
                        @showComment="showCommentPanel(n)"
                    >
                        <template v-slot:input>
                            <comment-panel mode="reply" :parentCommentId="replay.commentId" :commentIndex="[index,n]"/>
                        </template>
                    </comment-item>
                </template> -->
            </comment-item>
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
  data: function () {
    return {
      commentPage: 0,
      pageCount: this.comments.commentCount,
      nowCommentKey: -1,
    };
  },
  components: {
    CommentItem,
    CommentPanel,
  },
  props: {
    comments: Object,
    articleId: String,
  },
  methods: {
    onChange: function (e) {},
    showCommentPanel: function (key) {
      if (this.nowCommentKey == key) {
        this.nowCommentKey = -1;
      } else {
        this.nowCommentKey = key;
      }
    },
    comment: function (content, parentCommentId, mode,index) {
      if (mode === "reply") {
        this.$sblogclient
          .comment(this.articleId, content,parentCommentId)
          .then((res) => {
            this.$emit("flushReply");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$sblogclient
          .comment(this.articleId, content)
          .then((res) => {
            this.$emit("flushComments",this.articleId,this.commentPage);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
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