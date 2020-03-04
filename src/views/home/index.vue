<template>
  <el-container>
    <!-- 先左右布局 在上下 -->
    <el-aside style="width:200px;background-color:#00a5e2">
      <!-- <h1>左侧导航</h1> -->
      <layout-aside></layout-aside>

    </el-aside>
    <el-container>
      <el-header>
        <!-- <h1>顶部</h1> -->
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- <h1>主要区域</h1> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

</script>
<style>

</style>
