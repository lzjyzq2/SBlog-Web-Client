<template>
    <div contenteditable="true" :value="value" @input="filterComment($event.target.value)"></div>
</template>
<script>
export default {
    data:function() {
        return{

        }
    },props:['value'],
    methods:{
        filterComment:function(comment){
            this.$emit('input',comment)
        }
    }
}
</script>