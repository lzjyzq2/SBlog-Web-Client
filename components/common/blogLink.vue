<template>
  <nuxt-link
    :to="url"
    :tag="tag"
    :replace="replace"
    :append="append"
    :active-class="activeClass"
    :event="event"
    :exact-active-class="exactActiveClass"
  >
    <slot />
  </nuxt-link>
</template>
<script>
export default {
  name: "blogLink",
  data: function() {
    return {
      url: {}
    };
  },
  props: {
    to: String | Object,
    tag: {
      type: String,
      default: "a"
    },
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: "router-link-active"
    },
    exact: {
      type: Boolean,
      default: false
    },
    event: {
      type: String | Array,
      default: () => {
        return "click";
      }
    },
    exactActiveClass: {
      type: String,
      default: "router-link-exact-active"
    },
    noBlogLink: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    if (!this.noBlogLink) {
      if (typeof this.to == "string") {
        let path = this.to;
        this.url = this.checkSeparator(path);
      } else {
        this.url = this.to;
        let path = this.url.path;
        if (path != undefined || path != null) {
          this.url.path = this.checkSeparator(path);
        }
        if (this.url.name != undefined || this.url.name != null) {
          if (this.url.params == null) {
            this.url.params = {
              lang: this.$store.state.locale
            };
          } else if(this.url.params[lang]==null||this.url.name == undefined){
            this.url.params[lang] = this.$store.state.locale;
          }
        }
      }
    }
  },
  methods: {
    checkSeparator: function(path) {
      if (path.startsWith("/")) {
        return this.$store.state.locale + path;
      } else {
        return this.$store.state.locale + "/" + path;
      }
    }
  }
};
</script>