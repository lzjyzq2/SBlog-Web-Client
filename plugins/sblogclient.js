export default function (context, inject) {
    let protocol = process.server ? context.req.protocol : window.location.protocol; //协议
    let host = process.server ? context.req.host : window.location.host; //主机

    // Create a custom axios instance
    const sblogclient = context.$axios.create();
    sblogclient.defaults.baseURL = protocol + "://" + host;

    sblogclient.interceptors.request.use(res => {
        if(process.server){
            
        }else{
            res.headers.common['Access-Token'] = getCookie("token") || undefined;
        }
        return res;
    });

    // let loginPageUrl = '/' + context.store.state.locale + '/login';
    // let indexPageUrl = '/' + context.store.state.locale + '/';
    let loginPageUrl = '/login';
    let indexPageUrl = '/';

    sblogclient.login = function (username, password){
        return sblogclient.post('api/login', {
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
        return sblogclient.put('api/register', {
            username: username,
            nick: nickname,
            password: password,
            conpassword,
            email: email,
            captcha
        }).then((res) => {
            if (res.data.code == 10) {
                context.redirect(loginPageUrl);
            }
            return res;
        })
    }
    sblogclient.getRegCaptcha = (username, email) => {
        return sblogclient.get('api/register/captcha', {
            params: {
                username: username,
                email: email
            }
        })
    }

    sblogclient.getBookList = function() {
        return sblogclient.get('/api/user/book/list');
    }

    sblogclient.createBook = (name, info) => {
        return sblogclient.post("/api/user/book/new", { name: name, info: info });
    }

    sblogclient.updateBook = (id, name, info) => {
        return sblogclient.post('/api/user/book/update', {
            id: id,
            name: name,
            info, info
        });
    }

    sblogclient.getbookInfo = (id) => {
        return sblogclient.get('/api/user/book/info/' + id);
    }

    sblogclient.deleteBook = (id) => {
        return sblogclient.delete('/api/user/book/delete/' + id);
    }


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
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