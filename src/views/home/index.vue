<template>
  <el-container>
    <!-- 先左右布局 在上下 -->
    <el-aside width="200px">
      <h1>左侧导航</h1>
    </el-aside>
    <el-container>
      <el-header>
        <h1>顶部</h1>
      </el-header>
      <el-main>
        <h1>主要区域</h1>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>

</style>
