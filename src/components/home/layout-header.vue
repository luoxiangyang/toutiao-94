<template>
  <!-- 顶部 -->
  <el-row align="middle" type="flex" class="layout-header">
      <el-col class="left" :span="12">
       <i  @click="collapse=!collapse" :class="{'el-icon-s-fold': !collapse, 'el-icon-s-unfold': collapse }"></i>
          <span>暴雪嘉年华</span>
      </el-col>
      <el-col class="right" :span="12">
          <el-row type="flex" justify="end" align="middle">
            <img class="ImgSize" :src="userInfo.photo" alt="">
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
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      collapse: false // 菜单折叠
    }
  },
  watch: {
    collapse () {
      eventBus.$emit('changeCollapse')
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
    },
    getUserinfo () {
      //  获取个人信息
      this.$axios({
        url: '/user/profile'

      }).then(res => {
        this.userInfo = res.data
      })
    }
  },
  created () {
    this.getUserinfo()
    eventBus.$on('selectinfo', () => {
      this.getUserinfo()
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
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 4px;
        }
    }
}
</style>
