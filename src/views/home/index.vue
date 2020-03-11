<template>
  <el-container>
    <!-- 先左右布局 在上下 -->
    <el-aside :style="{width:collapse ? '64px' : '200px'}" style="transition:all 0.5s; width:200px;background-color:#00a5e2">
      <!-- <h1>左侧导航</h1> -->
      <layout-aside :collapse="collapse"></layout-aside>

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
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>
<style>

</style>
