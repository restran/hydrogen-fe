<template>
  <div>
    <div class="clearfix">
      <div class="crypto button-area float-left">
        <el-form ref="form" label-position="top" label-width="80px">
          <el-form-item label="辅助工具" style="margin-bottom: 10px">

            <div class="button-group">
              <el-button type="" size="mini" @click="backend_convert('char_count')">字符频率统计
              </el-button>
              <el-button type="" size="mini" @click="backend_convert('remove_duplicated')">按行去重
              </el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="mini" @click="backend_convert('ip2int')">IP转10进制数
              </el-button>
              <el-button type="" size="mini" @click="backend_convert('int2ip')">10进制数转IP
              </el-button>
            </div>
            <div class="button-group">
              <el-button type="" size="mini" @click="backend_convert('caidao_decode')">菜刀流量解码
              </el-button>
            </div>
            <div>
              <div style="width: 115px;display: inline-block; color: #606266">换行分割多条输入</div>
              <el-switch
                v-model="multipleInput"
                active-color="#13ce66">
              </el-switch>
            </div>

          </el-form-item>
        </el-form>

      </div>
      <div class="text-area">
        <el-form ref="form" :model="text" label-position="top" label-width="80px">
          <el-form-item label="输入" style="margin-bottom: 10px">
            <el-input type="textarea" :rows="5" v-model="text.input"></el-input>
          </el-form-item>
          <el-form-item label="输出">
            <el-input type="textarea" :rows="18" v-model="text.output"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import base64 from 'crypto-js/enc-base64'
  import utf8 from 'crypto-js/enc-utf8'
  import latin1 from 'crypto-js/enc-latin1'

  export default {
    components: {},
    data () {
      return {
        text: {
          input: '',
          output: ''
        },
        multipleInput: false
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
      output (value) {
        this.text.output = value
      },
      backend_convert (method, multiple = undefined) {
        let self = this
        if (multiple === undefined) {
          multiple = this.multipleInput
        }
        let data = {
          'method': method,
          'data': this.text.input,
          'multiple_input': multiple
        }

        this.$http.post('/api/misc/utility/', data)
          .then(function (r) {
            self.output(r['data'])
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
          })
      },
      handleClick (tab, event) {
        console.log(tab, event)
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .text-area
    margin-left 250px

  .button-area
    max-width 235px

  .button-group
    padding 3px 0

</style>

<style lang="stylus" rel="stylesheet/stylus">
  .crypto.button-area
    .el-form-item__content
      line-height 28px !important
    .el-button + .el-button
      margin-left 5px

  .text-area
    .el-form-item:after, .el-form-item:before, .el-form-item__content:after, .el-form-item__content:before
      display none !important
    .el-form-item:after
      clear inherit !important
</style>
