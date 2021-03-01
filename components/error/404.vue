<template>
    <div class="page">
        <div class="statusCode">
            404 NOT FOUND.
        </div>
        <div class="hint">
            页面被吃掉了！
        </div>
        <div>
            <nuxt-link to="/">返回首页</nuxt-link><a-button type="link"  @click="history.back();">返回上一页</a-button>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.page{
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.statusCode{
  color: black;
  font-size: 40px;
}
.hint{
    font-size: 30px;
    color: rgb(87, 220, 238);
}
</style>