<template>
  <div class="card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">HTTP Repeater</span>
      </div>

      <div>
        <el-form :model="form" :label-width="'100'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="请求地址">
                <el-input v-model="form.netloc"
                          placeholder="http://www.example.com:8080"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作">
                <div style="width: 100%; position: relative; display: inline-block">
                  <el-button type="primary" @click="onSubmit">发送</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="请求">
                <el-input type="textarea" v-model="form.request"
                          :autosize="{ minRows: 6, maxRows: 30}"
                          placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="响应">
                <el-input type="textarea" v-model="form.response"
                          :autosize="{ minRows: 6, maxRows: 30}"
                          placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        form: {
          netloc: '',
          request: '',
          response: ''
        }
      }
    },
    mounted () {
      let self = this
      this.$nextTick(function () {

      })
    },
    created () {

    },
    computed: {},
    methods: {
      onSubmit () {
       let self = this
        let data = {
          'netloc': self.form.netloc,
          'request': self.form.request,
          'response': self.form.response,
        }

        this.$http.post('/api/http/request/', data)
          .then(function (r) {
            self.form.response = r['data']
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
          })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .card-container
    max-width none
</style>
