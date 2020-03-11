<template>
  <div class="layout-aside" >
      <!-- 图片 -->
      <div class="title">
          <img :src="collapse ? smallImg : bigImg" alt="">
      </div>
      <!-- 菜单 -->
      <!-- 开启路由模式 router 在每一个菜单项配置index属性 -->
      <el-menu :collapse="collapse" router background-color="#ff9c00" text-color="#000">
          <el-menu-item index='/home'>
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
              <template slot="title" >
                <i class="el-icon-s-grid"></i>
                <span>内容管理</span>
              </template>

              <el-menu-item index='/home/publish'>发布文章</el-menu-item>
              <el-menu-item index='/home/articles'>内容列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论列表</el-menu-item>
              <el-menu-item index='/home/material'>素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <template slot="title" >
                <i class="el-icon-view"></i>
                <span>粉丝管理</span>
              </template>

              <el-menu-item index='/home/picture'>图文数据</el-menu-item>
              <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
              <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
              <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index='/home/account'>
              <i class="el-icon-user-solid"></i>
              <span>账户信息</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>
<script>
export default {
  props: ['collapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logoOW.png'),
      smallImg: require('../../assets/img/logoOW2.jpg')
    }
  }
}
</script>
<style lang="less" scoped>
.layout-aside {
    // width: 200px;
    background-color: #00a5e2;
    height: 100vh;
    .title {
        text-align: center;
        padding: 10px 0;
        background-color: #00a5e2;
        // #ff9c00 #00a5e2
        img {
            height: 35px;

        }
    }
    .el-menu {
        border-right: 0px;
    }

}
</style>
