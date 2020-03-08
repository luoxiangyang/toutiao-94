<template>
  <el-card class="articles">
      <bread-crumb slot="header">
      <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态：">
              <!-- 单选框组 -->
              <el-radio-group v-model="searchForm.status" >
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道类别：">
              <el-select  placeholder="请选择频道" v-model="searchForm.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期范围：">
              <!-- 时间选择 属性daterange 表示日期范围 -->
              <el-date-picker  value-format="yyyy-MM-dd" type="daterange" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
      <!-- 文章主体 -->
      <el-row type="flex" align="middle" class="total">
        <span>共找到条符合条件得内容</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
          <!-- 判断当前封面的值是否有图片 没有就用默认值 -->
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
          <div class="info">
            <span>{{item.title}}</span>
            <!-- 过滤器能在插值表达式 跟v-bind中使用 -->
            <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus }}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <!-- <span @click="toPublish"><i class="el-icon-edit"></i>修改</span> -->
          <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i>修改</span>
          <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
      <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination
        :current-page="page.currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="changePage"
         background layout='prev,pager,next'>

        </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页多少数据
        total: 0 //
      },
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        status: 5, // 默认位全部状态
        channel_id: null, // 频道
        dateRange: [] // 日期
      },
      channels: [], // 用来接收频道数据
      list: [], // 接收文章列表
      defaultImg: require('../../assets/img/timg.gif') // 当图片需要做判断的时候要在data定义变量
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  },
  filters: {
    // 别人传的值 value
    filterStatus (value) {
      // 过滤器
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }

  },
  methods: {
    toPublish () {
      // 跳转到发布页面
      this.$router.push('/home/publish')
    },
    // 删除
    delMaterial (id) {
      this.$confirm('确定永久删除吗', '提示').then(result => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          this.changeCondition()
        })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.changeCondition()
    },
    // 调用下方方法的接口
    changeCondition () {
      // 组合条件
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        // 根据文档 等于5就不传值
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        // 判断是否有时间
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 调用下方方法的接口
      this.getArtivles(params)
    },
    getArtivles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章
        this.page.total = result.data.total.total_count
      })
    },
    getChannels () {
      // 获取频道数据
      this.$axios({
        url: '/channels'

      }).then(result => {
        this.channels = result.data.channels
      })
    }

  },
  // change () {
  //   this.page.currentPage = 1,
  //   this.changeCondition()
  // },
  // 发表状态 方法

  created () {
    this.getChannels()
    this.getArtivles()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .total {
    height: 60px;
    border-bottom: 1px dashed #ccc;}
    .article-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .left {
      display: flex;
      img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      display: flex;
      flex-direction: column;
      height: 100px;
      justify-content: space-around;
      margin-left: 10px;
      .date {
        color: #999;
        font-size: 12px;
      }
      .tag{
        width: 60px;
        text-align: center;
      }
    }
  }
  .right  {
    span {
      font-size: 12px;
      margin-right: 8px;
      cursor: pointer;
      user-select: none;
    }

    }
    }
}
</style>
