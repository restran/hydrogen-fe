<template>
  <div>
    <div class="clearfix">
      <div class="crypto button-area float-left">
        <el-form ref="form" label-position="top" label-width="80px">
          <el-form-item label="解密方式" style="margin-bottom: 10px">
            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('caesar')">凯撒密码</el-button>
              <el-button type="" size="small" @click="backend_convert('rot13')">ROT13</el-button>
              <el-button type="" size="small" @click="backend_convert('atbash_cipher')">埃特巴什码</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('caesar_printable')">可见字符凯撒</el-button>
              <el-button type="" size="small" @click="backend_convert('caesar_odd_even')">奇偶不同凯撒</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('rail_fence')">栅栏密码</el-button>
              <el-button type="" size="small" @click="backend_convert('caesar_rail_fence')">栅栏凯撒</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('polybius_square')">波利比奥斯棋盘</el-button>
              <el-button type="" size="small" @click="backend_convert('xxencode')">XXEncode</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('bacon_cipher')">培根密码</el-button>
              <el-button type="" size="small" @click="backend_convert('bacon_case_cipher')">大小写变形培根密码</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('mobile_keyboard')">手机9宫格</el-button>
              <el-button type="" size="small" @click="backend_convert('qwerty_cipher')">PC键盘QWERTY</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('shadow_code')">影子密码</el-button>
              <el-button type="" size="small" @click="backend_convert('manchester')">曼彻斯特编码</el-button>
            </div>

            <div class="button-group">
              <el-button type="" size="small" @click="backend_convert('quoted_printable')">Quoted-printable编码
              </el-button>
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
      output (value) {
        this.text.output = value
      },
      backend_convert (method) {
        let self = this
        this.lastAction = this.backend_convert
        let data = {
          'method': method,
          'data': this.text.input
        }

        if (method === 'to_digital' || method === 'from_digital') {
          data['params'] = [this.digitalNum]
        }

        this.$http.post('/api/crypto/decode-data/', data)
          .then(function (r) {
            self.output(r['data'])
          })
          .catch(function (r) {
            self.$emit('show-error-message', r['msg'])
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
