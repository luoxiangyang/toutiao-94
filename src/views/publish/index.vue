<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">发表文章</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin:50px 0 50px 0" label-width="100px">
          <!-- 标题 -->
          <el-form-item label="标题" prop="title">
              <el-input v-model="publishForm.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item  label="内容" prop="content">
              <quill-editor
              style="height:300px" v-model="publishForm.content" placeholder="请输入内容" type="textarea" :rows="4"></quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:120px"  label="封面" prop="cover">
              <el-radio-group  v-model="publishForm.cover.type" @change="changeType">
                <el-radio :label="0">无图</el-radio>
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>

                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 封面组件 props父传子 -->
          <cover-image @selectTwoImg="receiveImg" :list="publishForm.cover.images"></cover-image>
          <el-form-item label="频道" prop="channel_id">
              <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                  <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publish(false)" type="primary">发表</el-button>
              <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // 0 无图 -1自动 2有图 3三途
          images: []
        },
        channel_id: null
      },
      //   校验规则
      publishRules: {
        //   trigger: 'blur'  鼠标离开才会校验
        // min 校验字符串的最低长度 max 校验最大长度
        // 如果min max  娇艳的是数字 就是最小值与最大值
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }

    }
  },
  watch: {
    $route: function (to, from) {
      // 根据articleId来编辑数据 点击修改再点击发布文章的情况
      if (to.params.articleId) {
        this.getArticleById(to.params.articleId) // 获取文章数据
      } else {
        this.publishForm = {
          title: '',
          content: '',
          cover: {
            type: 0, // 0 无图 -1自动 2有图 3三途
            images: []
          }
        }
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      // splice()删除替换元素 参数：索引；要删除的个数；替换的个数

      this.publishForm.cover.images.splice(index, 1, url)
    },
    changeType () {
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = []
      }
    },
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.publishForm = result.data
      })
    },
    //  频道数据接口
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publish (draft) {
      // 校验成功会调用then方法
      this.$refs.myForm.validate().then(result => {
        const { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : 'articles',
          method: articleId ? 'put' : 'post',
          params: { draft },
          data: this.publishForm
        }).then(result => {
          this.$message.success('发布成功')
          this.$router.push('/home/articles')
        }).catch(result => {
          this.$message.error('发布失败')
        })
      })
    }
  },
  created () {
    this.getChannels()
    const { articleId } = this.$route.params
    // &&运算符如果前面为true 才会执行后面的逻辑
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
