<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">评论管理</template>
      </bread-crumb>
      <el-table :data="list">
        <!-- el-table-column表示列
        prop表示字段 label 表示表头-->
        <!-- <el-table-column prop="id" label="1"></el-table-column> -->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <el-table-column :formatter="formatterBool" prop="comment_status"  label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count"  label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count"  label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" type="text">{{obj.row.comment_status ? '打开' : '关闭'}}评论 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="height:80px" type="flex" align="middle" justify="center">
      <el-pagination
       :total="page.total"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
       @current-change="changePage"
        background layout="prev,pager, next" ></el-pagination>

      </el-row>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      page: {
        total: 0, // 默认总数
        currentPage: 1, // 默认页码
        pageSize: 10
      },
      list: [],
      loading: false // 控制遮罩层得显示或隐藏
    }
  },
  methods: {

    changePage (newPage) {
      // newpage是最新的切换页码
      this.page.currentPage = newPage // 赋值最新页码
      this.getComment()
    },

    async getComment () {
      this.loading = true // 打开遮罩层
      const results = await this.$axios({
        url: '/articles',
        // 接口不传入 页码参数 默认第一页
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = results.data.results
      this.page.total = results.data.total_count
      this.loading = false // 请求关闭之后关闭遮罩层
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // 点击确定会进入then  点击取消会进入到 catch
      this.$confirm(`是否确定${mess}评论`).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            // query参数
            article_id: row.id.toString() // 将bigNumber类型转化为字符串
          },
          data: {
            // body参数
            allow_comment: !row.comment_status
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          this.getComment() // 重新拉去数据
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
