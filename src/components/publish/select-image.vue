<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
          <div class="select-image-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                  <img @click="clickImg(item.url)" :src="item.url" alt="">
              </el-card>
          </div>
          <el-row type="flex" justify="center" style="height:80px" align="middle">
              <el-pagination background
              layout="prev,pager,next"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :total="page.total"
                @current-change="changePage"
              ></el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">
        <el-upload action="" class="upload-img" :http-request="uploadImg">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认激活的变量
      list: [], // 素材数据
      page: {
        currentPage: 1, // 第几页
        pageSize: 4, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // 上传素材
    uploadImg (params) {
      // 调用上传接口
      // debugger
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 点击图片触发的事件
    clickImg (url) {
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
        }
    }
}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border: 2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
