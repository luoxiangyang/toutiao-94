<template>
  <div class="login">
    <span>登录</span>
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <div class="imgs">
        <img src="../../assets/img/logoOW.png" alt />
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" style="margin-top:20px">
        <!-- 表单容器 prop 表示要校验的字段名-->
        <el-form-item prop="mobile">
          <!-- 表单域 双向绑定-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 防止按钮 -->
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <!-- 是否同意 -->
          <el-checkbox v-model="loginForm.checked" style="color:#000">
            我已阅读同意
            <a href="#" style="color:blue">用户协议</a> 和
            <a href="#" style="color:blue">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意
      },
      // 表单的验证规则
      loginRules: {
        // required 如果为true 就为必填
        // message
        mobile: [
          { required: true, message: '您手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' }
        ], // 手机号验证规则
        code: [
          { required: true, message: '您验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码为6位' }
        ], // 验证码验证规则
        checked: [
          {
            validator: function (rule, value, callback) {
              // rule当前校验规则
              // value 是当前的要校验的字段
              // callback是一个回调函数 不论成功失败都执行 callback(new Error)
              value ? callback() : callback(new Error('必须同意阅读'))
            }
          }
        ] // 是否同意验证规则
      }

    }
  },
  methods: {
    login () {
      // ref 可以获取dom对象  还可以获取组件对象实例
      this.$refs.loginForm.validate((isOk) => {
        if (isOk) {
          // 表示校验通过
        } else {
          // 校验未通过
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg2.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    background-color: rgb(241, 66, 174);
    width: 440px;
    height: 340px;
    border: 0px solid #000;
    .imgs {
      text-align: center;
      img {
        width: 250px;
        height: 50px;
      }
    }
  }
}
</style>
