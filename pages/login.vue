<template>
  <a-row type="flex" justify="space-around" align="middle" class="form-container">
    <a-form id="normal-login" :form="form" class="login-form" @submit="handleSubmit">
      <p>{{$t('login.title')}}</p>
      <a-form-item>
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your Username!' }] },
        ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >Remember me</a-checkbox>
        <a class="login-form-forgot" href>Forgot password</a>
        <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
        <nuxt-link to="/register">register now!</nuxt-link>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted: function() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$sblogclient.login(values.username,values.password);
        } else {
          // 处理表单验证错误
        }
      });
    }
  }
};
</script>

<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
}
#__nuxt {
  height: 100%;
}
#__layout {
  height: 100%;
}
.form-container {
  height: 100%;
}
#normal-login&.login-form {
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 20px 30px;
  p {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 30px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
}
</style>