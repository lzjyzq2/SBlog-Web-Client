<template>
  <div class="tag-panel">
    <tag-item v-for="(tag,index) in tags" :key="tag.tag+index" :tag="tag.tag" :num="tag.num" :user-name="username"/>
  </div>
</template>

<script>
import TagItem from "~/components/common/TagItem";
export default {
  data:function(){
    return{
      username:''
    }
  },
  components: {
    TagItem
  },
  props: {
    tags: Array,
    userName:String
  },
  created:function(){
    if(this.userName===undefined || this.userName==null||this.userName==''){
      this.username = this.$route.params.userName;
    }else{
      this.username = this.userName;
    }
  }
};
</script>

<style lang="less" scoped>
.tag-panel {
  border: 1px solid #e8e8e8;
  box-shadow: 0 5px 5px 0 #e8e8e8;
  border-radius: 3px;
  padding: 10px;
}
</style>