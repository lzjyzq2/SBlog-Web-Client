<template>
  <div class="commentpanel">
    <div class="main">
      <a-avatar class="head" icon="user" :size="48" />
      <div class="textarea">
        <a-textarea
          v-model="content"
          placeholder="发表你的看法吧~"
          :autoSize="{ minRows: 5, maxRows: 6 }"
        />
        <div class="action">
            <a-button icon="smile" shape="circle" />
            <a-button class="comment" type="primary">回复</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      content: ""
    };
  }
};
</script>

<style lang="less" scoped>
.commentpanel {
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  .main {
    display: flex;
    .head {
      margin-right: 10px;
    }
    .textarea {
      flex: 1;
    }
  }
  .action {
      margin-top: 10px;
      .comment{
          float: right;
      }
  }
}
</style>