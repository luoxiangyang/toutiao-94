<template>
<!--  -->
  <div class="cover-image">
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 弹层 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收父传过来的list
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1 // 用来记录当前点击的索引
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin: 20px 100px;
    .cover-image-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img {
            width: 100%;
        }
    }
}
</style>
