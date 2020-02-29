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
      <el-form style="margin-top:20px">
        <!-- 表单容器 -->
        <el-form-item>
          <!-- 表单域 -->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 防止按钮 -->
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 是否同意 -->
          <el-checkbox style="color:#000">
            我已阅读同意
            <a href="#" style="color:blue">用户协议</a> 和
            <a href="#" style="color:blue">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

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
