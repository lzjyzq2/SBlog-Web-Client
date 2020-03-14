<template>
  <a-row type="flex" justify="space-around" align="middle" class="form-container">
    <a-form :form="form" @submit="handleSubmit" class="register-form">
      <p class="item-label">
        Username&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'username',
          {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          },
        ]"
        />
      </a-form-item>
      <p class="item-label">
        Nickname&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          },
        ]"
        />
      </a-form-item>
      <p class="item-label">
        Password&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
          type="password"
        />
      </a-form-item>
      <p class="item-label">
        Confirm Password&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <p class="item-label">
        E-mail&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <p class="item-label">
        Captcha&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </p>
      <a-form-item v-bind="formItemLayout">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
              'captcha',
              { rules: [{ required: true, message: 'Please input the captcha you got!' }] },
            ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button @click="getCaptcha">Get captcha</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          I have read the
          <a href>agreement</a>
        </a-checkbox>
        <nuxt-link to="/login" class="register-form-login">Login Now!</nuxt-link>
        <a-button type="primary" html-type="submit" class="register-form-button">Register</a-button>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script>
export default {
  data: function() {
    return {
      confirmDirty: false,
      residences: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 0 },
          sm: { span: 0 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 24,
            offset: 0
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$sblogclient.register(
            values.username,
            values.nickname,
            values.password,
            values.email,
            values.captcha
          );
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    // handleWebsiteChange(value) {
    //   let autoCompleteResult;
    //   if (!value) {
    //     autoCompleteResult = [];
    //   } else {
    //     autoCompleteResult = [".com", ".org", ".net"].map(
    //       domain => `${value}${domain}`
    //     );
    //   }
    //   this.autoCompleteResult = autoCompleteResult;
    // },
    getCaptcha: function(e) {
      this.form.validateFields(['username','email'], (err, values) => {
        if (!err) {
          this.$sblogclient.getRegCaptcha(values.username,values.email).then(res=>{
            if(res.data.code==14){
              console.log("邮件发送成功");
            }else{

            }
          });
        }
      });
      //console.log(username + email);
      //this.$sblogclient.getRegCaptcha()
    }
  }
};
</script>

<style lang="less" scoped>
.form-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.register-form {
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 20px 30px;
  p {
    &.title {
      font-weight: 300;
      font-size: 30px;
      color: #35495e;
      letter-spacing: 1px;
    }
    &.item-label {
      font-size: 15px;
      color: #35495e;
      margin-bottom: 0.5em;
    }
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif;
    display: block;
  }
  .register-form-login {
    float: right;
  }
  .register-form-button {
    width: 100%;
  }
}
</style>