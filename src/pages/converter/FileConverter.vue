<template>
  <div class="card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文件转换</span>
      </div>
      <div>

        <el-form :model="form" label-position="top">
          <el-form-item label="转换类型">
            <el-select v-model="form.encoding">
              <el-option label="Hex" value="Hex"></el-option>
              <el-option label="UTF8" value="UTF8"></el-option>
              <el-option label="Base64" value="Base64"></el-option>
              <el-option label="Decimal" value="Decimal"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-upload
              :data="{'encoding': form.encoding}"
              name="file"
              :on-success="fileUploadSuccess"
              action="/api/converter/file-converter/">
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
          encoding: 'Hex',
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
