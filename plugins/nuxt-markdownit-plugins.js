export default function (context, inject) {
  var md = context.$md;
  var div = require('markdown-it-div');
  var reg = /^tip\s+(.*)$|^warning\s+(.*)$|^danger\s+(.*)$/;
  var classNameReg = /^tip\s+|^warning\s+|^danger\s+/;
  context.$md.use(require('markdown-it-div'), {
    validate: function (params) {
      return params.trim().match(reg);
    },
    render: function (tokens, idx) {
        if(reg.test(tokens[idx].info.trim())){
            var m = tokens[idx].info.trim().match(reg);
            if (tokens[idx].nesting === 1) {
              // opening tag
              var titleText = m.find((title,index)=>title!=undefined&&index>0);
              var startTag =  '<div class="'+md.utils.escapeHtml(m[0]).match(classNameReg)+'">';
              if(titleText!=undefined)
                startTag +='<p class="title">'+ titleText +'</p>\n';
              return startTag;
            }
        }else{
            if (tokens[idx].nesting === 1)
                return '<div class="'+tokens[idx].info+'">';
        }
        return '</div>\n';
    }
  })
  inject('md', md);
}