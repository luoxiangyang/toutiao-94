<template>
  <!-- 顶部 -->
  <el-row align="middle" type="flex" class="layout-header">
      <el-col class="left" :span="12">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客</span>
      </el-col>
      <el-col class="right" :span="12">
          <el-row type="flex" justify="end" align="middle">
            <img :src="userInfo.photo" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click" @command="clickMenu">
                <span>{{userInfo.name}}</span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="git">git地址</el-dropdown-item>
                <el-dropdown-item command="lgout">退出</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
          </el-row>

      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        // 点击个人
      } else if (command === 'git') {
        window.location.href = 'https://github.com/luoxiangyang'
      } else {
        // 退出
        window.localStorage.removeItem('user-token') // 删除token
        this.$router.push('/login')
      }
    }
  },
  created () {
    //  获取个人信息
    this.$axios({
      url: '/user/profile'

    }).then(res => {
      this.userInfo = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
    height: 60px;

    .left {
        i {
            height: 20px;
        }
    }
    .right {
        img {
            border-radius: 50%
        }
    }
}
</style>
