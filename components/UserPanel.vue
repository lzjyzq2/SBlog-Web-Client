<template>
  <a-row class="userpanel">
    <a-col>
      <a-row>
        <a-avatar class="head" icon="user" :size="70" />
      </a-row>
      <a-row class="username">User</a-row>
      <a-row class="slogan">Good Good Study!Day Day UP!</a-row>
      <a-row class="data">
          <a-col :span='6'>
              关注
              <p>0</p>
          </a-col>
          <a-col :span='6'>
              文章
              <p>0</p>
          </a-col>
          <a-col :span='6'>
              文集
              <p>0</p>
          </a-col>
          <a-col :span='6'>
              标签
              <p>0</p>
          </a-col>
      </a-row>
      <a-row class="follow">
          <a-button class="follow" type="primary" block>关注</a-button>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
export default {
  data: function() {
    return {};
  }
};
</script>
<style lang="less">
.userpanel {
  border: 1px solid #e8e8e8;
  box-shadow: 0 5px 5px 0 #e8e8e8;
  border-radius: 3px;
  text-align: center;
  .head{
      margin-top: 30px;
  }
  .username{
      font-size: 18px;
      font-weight: bold;
      color: #505050;
      height: 27px;
      line-height: 27px;
      margin-top: 15px;
  }
  .slogan{
      font-size: 14px;
      height: 21px;
      line-height: 21px;
      margin-top: 5px;
  }
  .data{
      margin: 15px 15px 0px 15px;
      p{
          font-weight: bold;
          font-size: 19px;
      }
  }
  .follow{
      padding: 0px 15px 15px 15px;
      button{
          height: 32px;
          line-height: 32px;
      }
  }
}
</style>