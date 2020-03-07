<template>
  <el-card class="articles">
      <bread-crumb slot="header">
      <template slot="title"></template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态：">
              <!-- 单选框组 -->
              <el-radio-group v-model="searchForm.status">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道类别：">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期范围：">
              <!-- 时间选择 属性daterange 表示日期范围 -->
              <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
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
          <span><i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
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
    getArtivles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results // 获取文章
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
