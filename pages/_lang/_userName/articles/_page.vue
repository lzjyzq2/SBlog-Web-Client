<template>
    
</template>
<script>
/**
 * 用户主页
 */
export default {
    validate ({ params }) {
        return /^[0-9]+$/.test(params.userName);
    },
    data:function(){
        return{

        }
    }
}
</script>
<style lang="less">

</style>