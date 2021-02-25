<template>
  <div class="commentitem">
    <a-avatar icon="user" class="user-img" :size="48" />
    <div class="comment-info">
      <div class="user-info">
        <p class="name">{{comment.user.uname}}</p>
        <span class="time">{{comment.time}}</span>
      </div>
      <div>{{comment.content}}</div>
      <div>
        <a-icon type="like" />{{comment.approve}}
        <a-button icon="message" type="link" @click="$emit('showComment')">回复</a-button>
        <a-button icon="more" shape="circle" style="float:right" />
      </div>
      <div>
        <slot name="input" v-if="showInput"/>
      </div>
      <div>
        <!-- 子评论 -->
        <slot name="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      
    };
  },
  props: {
    showInput:{
      type:Boolean,
      default:false
    },
    comment:Object
  }
};
</script>

<style lang="less" scoped>
.commentitem {
  display: flex;
  margin: 10px;
  border-bottom: 1px solid #e8e8e8;

  &:last-child{
    border-bottom:none;
  }
  .user-img {

  }
  .comment-info {
    flex: 1;
    .user-info {
      flex: 1;
      .name {
        margin: 0px 0px 0px 5px;
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        color: #505050;
      }
      .time {
        margin: 0px 0px 0px 5px;
        font-size: 14px;
        height: 21px;
        line-height: 21px;
        color: #767676;
      }
    }
  }
}
</style>