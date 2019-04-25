<template>
  <div class="card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>解析DS_Store</span>
      </div>
      <div>

        <el-form :model="form" label-position="top">
          <el-form-item label="">
            <el-upload
              :data="{}"
              name="file"
              :on-success="fileUploadSuccess"
              action="/api/converter/parse-ds-store/">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件内容">
            <el-input type="textarea" :rows="8" v-model="form.content"></el-input>
          </el-form-item>
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
          content: ''
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
      fileUploadSuccess (response, file) {
        console.log(response)
        if (typeof response === 'string') {
          response = JSON.parse(response)
        }
        this.form.content = response['data']['content']
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
