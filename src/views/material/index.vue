<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 上传   给一个空字符串-->
      <el-row type="flex" justify="end">
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
          <el-button size="small" type="primary">上传素材</el-button>
      </el-upload>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
              <div class="img-list">
                  <el-card class="img-card" v-for="(item, index) in list" :key="item.id">
                      <!-- 放图片 -->
                      <img :src="item.url" @click="selectImg(index)" alt="">
                      <!-- 操作栏 -->
                      <el-row class="operate" type="flex" justify="space-around" align="middle">
                          <i @click="collectOrCancel(item)" :style="{color:item.is_collected ? 'red' : 'black'}"  class="el-icon-star-on"></i>
                          <i @click="delMater(item)" class="el-icon-delete-solid"></i>

                      </el-row>
                  </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane  label="收藏素材" name="collect">
              <div class="img-list">
                  <el-card  class="img-card" v-for="item in list" :key="item.id">
                      <!-- 放图片 -->
                      <img :src="item.url" @click="selectImg(index)" alt="">
                  </el-card>
              </div></el-tab-pane>
      </el-tabs>
      <!-- 公共组件 -->
      <el-row type="flex" justify="center" align="middle">
        <!-- 放置分页组件
              total  总条数
              current-page 当前页码
              page-size 每页多少条
              监听 分页的组件的切换事件
            -->
          <el-pagination :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          ayout="prev, pager, next"
          @current-change="changePage"
           background></el-pagination>
      </el-row>
      <!-- //预览图片 -->
      <el-dialog @opened="openEnd" :visible="dialogVisible" @close='dialogVisible=false'>
        <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
          <el-carousel-item v-for="item in list" :key="item.id">
            <img style="width:100%;height:100%" :src="item.url" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前机会的也=页签 默认选中全部素材
      list: [],
      page: {
        currentPage: 1, // 默认第一页
        total: 0,
        pageSize: 4
      },
      dialogVisible: false, // 弹层得显示隐藏
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 点击图片调用
    selectImg (index) {
      this.clickIndex = index
      this.dialogVisible = true
    },
    // 收藏
    collectOrCancel (row) {
      this.$axios({
        method: 'put',
        url: `/user/images/${row.id}`,
        data: { collect: !row.is_collected }// 因为收藏要取消收藏
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    delMater (row) {
      this.$confirm('确定删除吗?', '提示').then(() => {
        // 确定得时候
        this.$axios({
          url: '/user/images' + row.id,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },
    //   上传组件方法
    uploadImg (params) {
      // debugger
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // coloect参数等于true 表示获取收藏得数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }, // get参数 query参数
        data: {} // data参数 放的body参数
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
        width: 220px;
        height: 240px;
        margin: 20px 40px;
        position: relative;
        img {
            width: 100%;
        }
        .operate {
            position: absolute;
            height: 30px;
            left: 0;
            bottom: 0;
            width: 100%;
            background: #f4f5f6;
            i {
                font-size: 20px;
            }
        }
    }
}
</style>
