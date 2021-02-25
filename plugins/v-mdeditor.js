import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
VueMarkdownEditor.use(githubTheme,{
    extend(md, hljs) {
        // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
        // md.set(option).use(plugin);
        // 注册语言包
        md.use(require('markdown-it-katex'));
        md.use(require('markdown-it-highlightjs'));
        md.use(require('markdown-it-sub'));
        md.use(require('markdown-it-sup'));
      },
});
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createTipPlugin());
VueMarkdownEditor.use(createEmojiPlugin());
Vue.use(VueMarkdownEditor);
