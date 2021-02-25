export default function (context, inject) {
  let protocol = process.server ? context.req.protocol+":" : window.location.protocol; //协议
  let host = process.server ? context.req.host : window.location.host; //主机
  let cookie = process.server ? context.req.headers.cookie : document.cookie;
  // Create a custom axios instance
  const sblogclient = context.$axios.create({
    baseURL: protocol + "//" + host,
  });
  sblogclient.interceptors.request.use(res => {
    res.headers.common['Access-Token'] = getCookie("token") || undefined;
    return res;
  });

  // let loginPageUrl = '/' + context.store.state.locale + '/login';
  // let indexPageUrl = '/' + context.store.state.locale + '/';
  let loginPageUrl = '/login';
  let indexPageUrl = '/';

  sblogclient.login = function (username, password) {
    return sblogclient.post('/api/login', {
      username: username,
      password: password
    }).then(response => {
      if (response.data.code == 20) {
        context.store.commit('localStorage/setUserInfo', response.data.data);
        //context.redirect(indexPageUrl + response.data.data.uname);
      }
      return response;
    })
  }

  sblogclient.register = (username, nickname, password, conpassword, email, captcha) => {
    return sblogclient.put('/api/register', {
      username: username,
      nickname: nickname,
      password: password,
      conpassword: conpassword,
      email: email,
      captcha: captcha
    });
  }
  sblogclient.getRegCaptcha = (username, email) => {
    return sblogclient.get('/api/register/captcha', {
      params: {
        username: username,
        email: email
      }
    })
  }

  sblogclient.getBookList = function () {
    return sblogclient.get('/api/user/book/list');
  }

  sblogclient.createBook = (name, info) => {
    return sblogclient.post("/api/user/book/new", {
      name: name,
      info: info
    });
  }

  sblogclient.updateBook = (id, name, info) => {
    return sblogclient.post('/api/user/book/update', {
      id: id,
      name: name,
      info,
      info
    });
  }

  sblogclient.getbookInfo = (id) => {
    return sblogclient.get('/api/user/book/info/' + id);
  }

  sblogclient.deleteBook = (id) => {
    return sblogclient.delete('/api/user/book/delete/' + id);
  }
  sblogclient.createSub = (id,name) =>{
    return sblogclient.post('/api/user/subsection/new',{
      bookId:id,
      name:name
    });
  }
  sblogclient.getSubList = (id)=>{
    return sblogclient.get('/api/user/subsection/list/'+id);
  }
  sblogclient.getArticleList = (id)=>{
    return sblogclient.get('/api/user/article/list/'+id);
  }
  sblogclient.getArticleInfo = (id)=>{
    return sblogclient.get('/api/user/article/info/'+id);
  }

  /**
   * {
      title:title,
      summary:summary,
      content:content,
      subsection:subsection,
      tags:tags,
      canComment:canComment,
      canCopy:canCopy,
      canView:canView,
      isTaskPublish:isTaskPublish,
      publishTime:publishTime,
      state:state
    }
   */
  sblogclient.createArticle = (data)=>{
    return sblogclient.post('/api/user/article/new',data)
  }
  sblogclient.updateArticle = (data) =>{
    return sblogclient.post('/api/user/article/update',data)
  }
  sblogclient.deleteArticle = (id) =>{
    return sblogclient.delete('/api/user/article/delete/'+id)
  }
  sblogclient.viewArticle = (id) =>{
    return sblogclient.get('/api/article/view/'+id)
  }
  sblogclient.publicPage = (username)=>{
    return sblogclient.get('/api/user/public/'+username)
  }
  sblogclient.recentlyArticle = (username)=>{
    return sblogclient.get('/api/user/public/'+username+'/recently/articles');
  }
  sblogclient.publicBooks = (username)=>{
    return sblogclient.get('/api/user/public/'+username+'/recently/books');
  }
  sblogclient.publicTags = (username) =>{
    return sblogclient.get('/api/user/public/'+username+'/tags');
  }
  sblogclient.publicInfo = (username)=>{
    return sblogclient.get('/api/user/public/'+username+'/public-info');
  }

  /**
   {
     long articleId;
     String content;
     long replyCommentId;
   } 
   */
  sblogclient.comment = (articleId,content,replyCommentId)=>{
    return sblogclient.post('/api/comment', {
      articleId:articleId,content:content,replyCommentId:replyCommentId
    });
  }

  sblogclient.getComments=(artcileId,page)=>{
    return sblogclient.get('/api/comment/artcile/'+artcileId+'/page/'+page);
  }
  sblogclient.getReplys=(commentId,page)=>{
    return sblogclient.get('/api/comment/artcile/'+commentId+'/replys/'+page);
  }
  function getCookie(cname) {
    let ca = cookie.split(';');
    let name = cname + "=";
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  // 添加响应拦截器
  sblogclient.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    if (error.response.status == 401) {
      context.redirect(loginPageUrl);
    }
    return Promise.reject(error.response);
  })
  // Inject to context as $sblogclient
  inject('sblogclient', sblogclient)
}