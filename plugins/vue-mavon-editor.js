import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';



mavonEditor.markdownIt.use(require('markdown-it-container'), 'tip', {

    validate: function(params) {
      return params.trim().match(/^tip\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^tip\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        console.log(m);
        return '<div class="tip"><span>' + mavonEditor.markdownIt.utils.escapeHtml(m[1]) + '</span>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  });
  mavonEditor.markdownIt.use(require('markdown-it-container'), 'warning', {

    validate: function(params) {
      return params.trim().match(/^warning\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^warning\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        console.log(m);
        return '<div class="warning"><span>' + mavonEditor.markdownIt.utils.escapeHtml(m[1]) + '</span>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  });
  mavonEditor.markdownIt.use(require('markdown-it-container'), 'danger', {

    validate: function(params) {
      return params.trim().match(/^danger\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^danger\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        console.log(m);
        return '<div class="danger"><span>' + mavonEditor.markdownIt.utils.escapeHtml(m[1]) + '</span>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  });
//  Vue.use(mavonEditor);
// export default ({
//     app,
//     store
//   }) => {
//     mavonEditor.markdownIt.use(require('markdown-it-container'));
// }