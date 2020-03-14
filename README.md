# SBlogWebClient

S'Blog博客系统的Web客户端


## 开发环境配置

> 建议使用 [Visual Studio Code](https://code.visualstudio.com/) 进行项目开发

> 建议安装 [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) Chrome 扩展程序

安装 Node.js

切换至工程目录并使用 `npm install` 安装依赖

运行 S'Blog Server 端

使用 Nginx 反向代理，在 `*/nginx/conf/nginx.conf` 中写入如下配置（仅为简单示意）
```
upstream restfulserver{
    server 127.0.0.1:8080;
}
upstream webserver{
    server 127.0.0.1:3000;
}
server {
    listen       80;
    server_name  localhost;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;
        proxy_pass http://webserver/;
        location ~ .*\.(js|css|jpg|png)$ {
            proxy_pass http://webserver;
        } 
    }
    location /api/ {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;
        proxy_pass http://restfulserver;
    }
}
```


## 国际化

在 `locales` 文件夹下新增国际化语言文件
```
├─ locales
    ├─ zh.json
    └─ en.json
```

在语言文件内写入如下内容
```json
{
    "test":{
        "test":"test"
    }
}
```

在 `plugins/i18n.js` 中配置
```js
app.i18n = new VueI18n({
    locale: store.state.sessionStorage.locale,
    fallbackLocale: 'zh',
    messages: {
        zh: require('~/locales/zh.json'),
        en: require('~/locales/en.json'),
    }
})
```

在 `store/sessionStorage.js` 中配置
```js
export const state = () => ({
    locales: ['zh','en'],
    locale: 'zh'
})
```

在模板中使用
```html
<div>{{$(test.test)}}<div>
```


## 运行与打包

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


## 依赖

- Nuxt.js [官方文档](https://nuxtjs.org/guide)
- Vue.js [官方文档](https://cn.vuejs.org/)
- Ant Design Vue [文档](https://www.antdv.com/docs/vue/introduce/)
- axios [使用 axios 访问 API](https://cn.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)
- Vue I18n [官方文档](https://kazupon.github.io/vue-i18n/zh/introduction.html)
- nuxt-vuex-localstorage [Github 页面](https://github.com/rubystarashe/nuxt-vuex-localstorage)