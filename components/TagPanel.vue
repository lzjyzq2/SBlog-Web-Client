<template>
  <div class="tag-panel">
    <tag-item v-for="(tag,index) in tags" :key="tag.tag+index" :tag="tag.tag" :num="tag.num"/>
  </div>
</template>

<script>
import TagItem from "~/components/common/TagItem";
export default {
  components: {
    TagItem
  },
  props: {
    tags: Array
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