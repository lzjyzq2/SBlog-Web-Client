<template>
    <div class="author-follow-panel">
        <a-avatar class="head" icon="user" :size="48" />
        <div class="info">
            <p class="name">{{username}}</p>
            <p class="sign">{{sign}}</p>
        </div>
        <a-button class="follow" type="primary">关注</a-button>
    </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    username: String,
    sign: String
  }
};
</script>

<style lang="less" scoped>
.author-follow-panel {
  p {
    margin-bottom: 0px;
  }
  height: 70px;
  background: #f6f6f6;
  border-radius: 3px;
  display: flex;
  align-items: center;
  .head {
    margin: 0px 10px;
  }
  .info {
    flex: 1;
    display: inline-block;
    height: 48px;
    margin-left: 5px;
    .name {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: bold;
    }
    .sign {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      color: #767676;

      // word-break: keep-all; //英文不换行
      // white-space: nowrap; //汉字不换行
      // overflow: hidden; //超出设定宽度隐藏内容
      // text-overflow: ellipsis; //截断内容后...显示

      @media screen and (max-width: 576px) {
        visibility: hidden;
      }
    }
  }
  .follow {
    margin: auto 10px;
  }
}
</style>