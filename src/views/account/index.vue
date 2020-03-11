<template>
  <el-card >
      <bread-crumb slot="header">
      <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
          <el-form-item prop="name" label="用户名">
              <el-input v-model="formData.name" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item  label="简介">
              <el-input v-model="formData.intro" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item prop="email"  label="邮箱">
              <el-input v-model="formData.email" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item  label="手机号">
              <el-input v-model="formData.mobile" disabled style="width:40%"></el-input>
          </el-form-item>
          <el-form-item >
              <el-button type="primary" @click="saveUser">保存</el-button>
          </el-form-item>
      </el-form>
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
            <img class="head-upload" :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 11, message: '用户名的长度为1-11位' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/timguzi.jpg')
    }
  },
  methods: {
    //   上传头像
    uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
        eventBus.$emit('selectinfo')
      })
    },
    getUserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUser () {
      this.$refs.myForm.validate().then(result => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message.success('保存成功')
          eventBus.$emit('selectinfo')
        }).catch(result => {
          this.$message.error('保存失败')
        })
      })
    }
  },
  created () {
    this.getUserinfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload {
    position: absolute;
    right: 350px;
    top: 160px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
}
</style>
