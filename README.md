# SBlogWebClient

> S&#39;Blog博客系统的Web客户端


## 开发指南
---
> 推荐使用`Visual Studio Code`进行项目开发，建议安装 `Vue Dev Tool` Chrome插件
1. 安装 `NodeJs`
    > 使用`npm install`安装依赖
2. 运行 `S'Blog` Server端
3. 使用 `Nginx` 反向代理
    - 在[nginx]/conf/nginx.conf中写入如下配置(仅为简单示意)
    ```
    ……
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
    ……
    ```
- 国际化
    1. 在`locales`文件夹下新增国际化语言文件
        ```
        - locales
            |- zh.json
            |- en.json
        ```
        ```json
        {
            "test":{
                "test":"test"
            }
        }
        ```
    2. 在`plugins/i18n.js`中配置
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
    3. 在`store/sessionStorage.js`中配置
        ```js
        export const state = () => ({
            locales: ['zh','en'],
            locale: 'zh'
        })
        ```
    4. 在模板中使用
        ```html
        <div>{{$(test.test)}}<div>
        ```
- 运行与打包
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

### 依赖
- `Nuxt.js` [官方文档](https://nuxtjs.org/guide)
- `Vue.js` [官方文档](https://cn.vuejs.org/)
- `Ant Design Vue` [文档](https://www.antdv.com/docs/vue/introduce/)
- `axios`
- `vue-i18n`
- `nuxt-vuex-localstorage`