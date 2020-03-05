export default function (context, inject) {
    let protocol = process.server ? context.req.protocol : window.location.protocol; //协议
    let host = process.server ? context.req.protocol : window.location.host; //主机

    // Create a custom axios instance
    const sblogclient = context.$axios.create();
    sblogclient.defaults.baseURL = protocol + "//" + host;

    sblogclient.interceptors.request.use(res => {
        let userinfo = context.store.state.localStorage.userinfo;
        if (userinfo.token != null || userinfo.token != undefined)
            res.headers.common['Access-Token'] = userinfo.token || undefined
        return res;
    });

    let loginPageUrl = '/' + context.store.state.locale + '/login';
    let indexPageUrl = '/' + context.store.state.locale + '/';

    sblogclient.login = (username, password) => {
        return sblogclient.post('api/login', {
            username: username,
            password: password
        }).then(response => {
            if (response.data.code == 20) {
                context.store.commit('localStorage/setUserInfo', response.data.data);
                context.redirect(indexPageUrl + response.data.data.uname);
            }
        })
    }
    sblogclient.register = (username, nickname, password, email, captcha) => {
        return sblogclient.put('api/register?captcha=' + captcha, {
            username: username,
            nick: nickname,
            password: password,
            email: email
        }).then(res => {
            if (res.data.code == 10) {
                context.redirect(loginPageUrl);
            }
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
    // 添加响应拦截器
    sblogclient.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        if (error.data.code == 31) {
            context.redirect(loginPageUrl);
        }
        return Promise.reject(error.response);
    })
    // Inject to context as $sblogclient
    inject('sblogclient', sblogclient)
}