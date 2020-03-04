<template>
  <el-card>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(results => {
        this.list = results.data.results
      })
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
            aricle_id: row.id
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
