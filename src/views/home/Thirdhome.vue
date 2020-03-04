<template>
<!-- 三级路由 -->
  <div class="home">
<!-- src="https://overwatch.nosdn.127.net/1/assets/img/pages/home/header-mobile.webm" -->
<!-- <a href="https://ow.blizzard.cn/home" class="imglogo">
        <img src="../../assets/img/logoOW2.jpg" alt="">
      </a> -->
<div class="homepage-hero-module">
  <div class="video-container">
    <el-menu router mode="horizontal" style="background-color:#545c64" active-text-color="#545c64"  class="elMenu">
      <a href="https://ow.blizzard.cn/home" class="imglogo">
        <img src="../../assets/img/logoOW2.jpg" alt="">
      </a>
      <el-submenu index="1" class="submenu">
        <template slot="title">游戏</template>
        <el-menu-item index="1-1">概述</el-menu-item>
        <el-menu-item index="1-2">赞赏系统</el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="submenu">
        <template slot="title">英雄</template>
        <el-menu-item index="2-1">概述</el-menu-item>
        <el-menu-item index="2-2">赞赏系统</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="submenu">
        <template slot="title">活动</template>
        <el-menu-item index="3-1">概述</el-menu-item>
        <el-menu-item index="3-2">赞赏系统</el-menu-item>
      </el-submenu>
      <el-submenu index="4" class="submenu">
        <template slot="title">视频图片</template>
        <el-menu-item index="3-1">概述</el-menu-item>
        <el-menu-item index="3-2">赞赏系统</el-menu-item>
      </el-submenu>
      <el-submenu index="5" class="submenu">
        <template slot="title">新闻</template>
        <el-menu-item index="3-1">概述</el-menu-item>
        <el-menu-item index="3-2">赞赏系统</el-menu-item>
      </el-submenu>
      <el-submenu index="6" class="submenu">
        <template slot="title">下载</template>
        <el-menu-item index="3-1">概述</el-menu-item>
        <el-menu-item index="3-2">赞赏系统</el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- 视频 -->
  <video  :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
    <source src="https://overwatch.nosdn.127.net/1/assets/img/pages/home/header-mobile.mp4" type="video/mp4">
    <source src="https://overwatch.nosdn.127.net/1/assets/img/pages/home/header-mobile.webm" type="video/webm">
  </video>

  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      vedioCanPlay: false,
      fixStyle: ''

    }
  },
  methods: {
    canplay () {
      this.vedioCanPlay = true
    }

  }

}
</script>

<style lang="less" scoped>
.home {
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
.video-container .poster img{
    z-index: 0;
    position: absolute;

  }
 .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }
.fillWidth {
    width: 100%;
    margin-bottom: 100px;
}
.elMenu {
  .imglogo {
    float: left;
    margin-left: 5px;
    img {
      width: 50px;
      margin-top: 7px;
    }
}

}

}
</style>
