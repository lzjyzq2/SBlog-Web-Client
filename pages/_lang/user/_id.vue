<template>
    <a>{{$route.params.id}}</a>
</template>
<script>
/**
 * 用户主页
 */
export default {
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id);
    },
    data:function(){
        return{

        }
    }
}
</script>
<style lang="less">

</style>