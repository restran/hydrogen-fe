<template>
  <div class="clearfix">
    <div class="button-area float-left">
      <el-form ref="form" label-position="top" label-width="100px">
        <el-form-item label="转换选项" style="margin-bottom: 10px">
          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('hex2bin')">Hex2Bin</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('bin2hex')">Bin2Hex</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('hex2dec')">Hex2Dec</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('dec2hex')">Dec2Hex</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('bin2dec')">Bin2Dec</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('dec2bin')">Dec2Bin</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('dec2str')">Dec2Str</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('str2dec')">Str2Dec</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('bin2str')">Bin2Str</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('str2bin')">Str2Bin</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('str2hex')">Hex编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('hex2str')">Hex解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="utf7_encode">UTF7编码</el-button>
            <el-button type="primary" size="mini" @click="utf7_encode">UTF7全编码</el-button>
            <el-button type="primary" size="mini" @click="utf7_decode">UTF7解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="url_encode">URL编码</el-button>
            <el-button type="primary" size="mini" @click="url_all_encode">URL全编码</el-button>
            <el-button type="primary" size="mini" @click="url_decode">URL解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="url_encode_gb2312">URL GBK编码</el-button>
            <el-button type="primary" size="mini" @click="url_decode_gb2312">URL GBK解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="b64encode">Base64编码</el-button>
            <el-button type="primary" size="mini" @click="b64decode">Base64解码</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="b32encode">Base32编码</el-button>
            <el-button type="primary" size="mini" @click="b32decode">Base32解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="html10_encode">Html10编码</el-button>
            <el-button type="primary" size="mini" @click="html10_decode">Html10解码</el-button>
          </el-button-group>

          <div>
            <el-button type="primary" size="mini" @click="html_special_chars">Html Special Chars编码</el-button>
          </div>

          <div>
            <el-button type="primary" size="mini" @click="string_char_code">String Char Code</el-button>
          </div>

          <el-button-group>
            <el-button type="primary" size="mini" @click="html16_encode">Html16编码</el-button>
            <el-button type="primary" size="mini" @click="html16_decode">Html16解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="js8_encode">JS8编码</el-button>
            <el-button type="primary" size="mini" @click="js8_decode">JS8解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="js16_encode">JS16编码</el-button>
            <el-button type="primary" size="mini" @click="js16_decode">JS16解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="unicode_encode">Unicode编码</el-button>
            <el-button type="primary" size="mini" @click="unicode_decode">Unicode解码</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="html_escape">Html转义</el-button>
            <el-button type="primary" size="mini" @click="html_un_escape">Html反转义</el-button>
          </el-button-group>

          <el-button type="primary" size="mini" @click="json_format">JSON格式化</el-button>
          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_uu')">UUEncode编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_uu')">UUEncode解码</el-button>
          </el-button-group>
        </el-form-item>

        <el-form-item label="变换选项" style="margin-bottom: 10px">
          <el-button-group>
            <el-button type="primary" size="mini" @click="reverse_text">反向文本</el-button>
            <el-button type="primary" size="mini" @click="to_lower_case">转成小写</el-button>
            <el-button type="primary" size="mini" @click="to_upper_case">转成大写</el-button>
          </el-button-group>
          <div style="margin-top: 5px">
            <el-input-number size="small" :min="2" :max="9" :controls="true"
                             style="width: 100px"
                             v-model="digitalNum"></el-input-number>
            <el-button-group>
              <el-button type="primary" size="mini"
                         @click="backend_convert('to_digital')">转换进制
              </el-button>
              <el-button type="primary" size="mini"
                         @click="backend_convert('from_digital')">反转进制
              </el-button>
            </el-button-group>
          </div>

          <div>
            将输出作为输入
            <el-switch
              v-model="outputAsInput"
              on-color="#13ce66">
            </el-switch>
          </div>
        </el-form-item>
      </el-form>

    </div>
    <div class="text-area">
      <el-form ref="form" :model="text" label-position="top" label-width="80px">
        <el-form-item label="输入(原始值)" style="margin-bottom: 10px">
          <el-input type="textarea" :rows="12" v-model="text.input"></el-input>
        </el-form-item>
        <el-form-item label="输出(转换值)">
          <el-input type="textarea" :rows="12" v-model="text.output"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import base64 from 'crypto-js/enc-base64'
  import utf7 from '@/utils/src/utf7'
  import base32 from 'hi-base32'
  import utf8 from 'crypto-js/enc-utf8'
  import latin1 from 'crypto-js/enc-latin1'
  import hex from 'crypto-js/enc-hex'
  import urlencode from 'urlencode'

  function url_encode (a, b) {
    return ++b ?
      '%' + ([10] + a.charCodeAt().toString(16)).slice(-2) :
      unescape(encodeURIComponent(a)).replace(/[^]/g, url_encode)
  }

  function magic (value) {
//    for (let shape of this.$store.state.shape) {
//      if (shape === 'lower') {
//        value = value.toLowerCase()
//      } else if (shape === 'upper') {
//        value = value.toUpperCase()
//      } else if (shape === 'urlencode') {
//        value = encodeURIComponent(value)
//      }
//    }
    return value
  }

  export default {
    components: {},
    data () {
      return {
        text: {
          input: '',
          output: ''
        },
        digitalNum: 8,
        lastAction: undefined,
        outputAsInput: false
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
      copyData () {
        return this.text.output
      },
      output (value) {
        if (this.outputAsInput) {
          this.text.input = magic(value)
        } else {
          this.text.output = magic(value)
        }
      },
      convert () {
        if (this.lastAction && this.lastAction instanceof Function) {
          this.lastAction()
        }
      },
      hex2bin () {
        let self = this
        this.lastAction = this.hex2bin
        this.$http.post('/api/convert-data')
          .then(function (r) {
            self.output(r['data'])
          })
          .catch(function (r) {
            self.$emit('show-error-message', r['msg'])
          })
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

        this.$http.post('/api/converter/convert-data/', data)
          .then(function (r) {
            self.output(r['data'])
          })
          .catch(function (r) {
            self.$emit('show-error-message', r['msg'])
          })
      },
      b64encode () {
        this.lastAction = this.b64encode
        this.output(base64.stringify(utf8.parse(this.text.input)))
      },
      b64decode () {
        let result
        this.lastAction = this.b64decode
        let bytes = base64.parse(this.text.input)
        try {
          result = utf8.stringify(bytes)
        } catch (e) {
          result = latin1.stringify(bytes)
        }
        this.output(result)
      },
      b32encode () {
        this.lastAction = this.b32encode
        this.output(base32.encode(this.text.input))
      },
      b32decode () {
        this.lastAction = this.b32decode
        this.output(base32.decode(this.text.input))
      },
      html_escape () {
        this.lastAction = this.html_escape
        let str = this.text.input
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&/g, '&gt;')
        s = s.replace(/</g, '&lt;')
        s = s.replace(/>/g, '&gt;')
        s = s.replace(/ /g, '&nbsp;')
        s = s.replace(/'/g, '&#39;')
        s = s.replace(/"/g, '&quot;')
        s = s.replace(/\n/g, '<br>')

        this.output(s)
      },
      html_un_escape () {
        this.lastAction = this.html_un_escape
        let str = this.text.input
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&gt;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, '\'')
        s = s.replace(/&quot;/g, '"')
        s = s.replace(/<br>/g, '\n')

        this.output(s)
      },
      json_format () {
        this.lastAction = this.json_format
        let text = ''
        try {
          text = JSON.parse(this.text.input)
          text = JSON.stringify(text, null, 2)
        } catch (e) {
          text = '处理JSON出现异常: ' + e
        }

        this.output(text)
      },
      utf7_encode () {
        this.lastAction = this.utf7_encode
        this.output(utf7.encode(this.text.input))
      },
      utf7_all_encode () {
        this.lastAction = this.utf7_encode
        this.output(utf7.encodeAllChar(this.text.input))
      },
      utf7_decode () {
        this.lastAction = this.utf7_decode
        this.output(utf7.decode(this.text.input))
      },
      hex_encode () {
        this.lastAction = this.hex_encode
        let result = hex.stringify(utf8.parse(this.text.input))
        this.output(result)
      },
      hex_decode () {
        let result
        this.lastAction = this.hex_decode
        let enc = this.text.input
        if (enc.startsWith('0x') || enc.startsWith('0X')) {
          enc = enc.substr(2)
        }
        let bytes = hex.parse(enc)
        try {
          result = utf8.stringify(bytes)
        } catch (e) {
          result = latin1.stringify(bytes)
        }
        this.output(result)
      },
      url_encode () {
        this.lastAction = this.url_encode
        this.output(encodeURIComponent(this.text.input))
      },
      url_decode () {
        this.lastAction = this.url_decode
        this.output(decodeURIComponent(this.text.input))
      },
      url_encode_gb2312 () {
        this.lastAction = this.url_encode_gb2312
        this.output(urlencode.encode(this.text.input, 'gbk'))
      },
      url_decode_gb2312 () {
        this.lastAction = this.url_decode_gb2312
        this.output(urlencode.decode(this.text.input, 'gbk'))
      },
      url_all_encode () {
        this.lastAction = this.url_all_encode
        this.output(url_encode(this.text.input))
      },
      html10_encode () {
        this.lastAction = this.html10_encode
        let result = this.text.input.split('').map(m => '&#' + m.charCodeAt() + ';').join('')
        this.output(result)
      },
      html10_decode () {
        this.lastAction = this.html10_decode
        let result = this.text.input.replace(/&#(\d+);?/g, (match, i) => String.fromCharCode(parseInt(i)))
        this.output(result)
      },
      html_special_chars () {
        this.lastAction = this.html_special_chars
        let result = this.text.input
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
        this.output(result)
      },
      html16_encode () {
        this.lastAction = this.html16_encode
        let result = this.text.input.split('').map(m => '&#x' + m.charCodeAt().toString(16) + ';').join('')
        this.output(result)
      },
      html16_decode () {
        this.lastAction = this.html16_decode
        let result = this.text.input.replace(/&#x([a-f0-9]+);?/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
      },
      js8_encode () {
        this.lastAction = this.js8_encode
        let result = this.text.input.split('').map(m => '\\' + m.charCodeAt().toString(8)).join('')
        this.output(result)
      },
      js8_decode () {
        this.lastAction = this.js8_decode
        let result = this.text.input.replace(/\\([0-7]+)/g, (match, i) => String.fromCharCode(parseInt(i, 8)))
        this.output(result)
      },
      js16_encode () {
        this.lastAction = this.js16_encode
        let result = this.text.input.split('').map(m => '\\x' + m.charCodeAt().toString(16)).join('')
        this.output(result)
      },
      js16_decode () {
        this.lastAction = this.js16_decode
        let result = this.text.input.replace(/\\x([a-f0-9]{1,4})/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
      },
      unicode_encode () {
        this.lastAction = this.unicode_encode
        let result = this.text.input.split('').map(m => {
          let pad = '0000'
          let str = m.charCodeAt().toString(16)
          return '\\u' + pad.substring(0, pad.length - str.length) + str
        }).join('')
        this.output(result)
      },
      unicode_decode () {
        this.lastAction = this.unicode_decode
        let result = this.text.input.replace(/\\u([a-fA-F0-9]{4})/g, (match, i) => String.fromCharCode(parseInt(i, 16)))
        this.output(result)
      },
      string_char_code () {
        this.lastAction = this.string_char_code
        let result = this.text.input.split('').map(m => m.charCodeAt()).join(',')
        this.output(result)
      },
      to_lower_case () {
        this.lastAction = this.to_lower_case
        let result = this.text.input.toLowerCase()
        this.output(result)
      },
      to_upper_case () {
        this.lastAction = this.to_lower_case
        let result = this.multipleInputProcess(function (input) {
          return input.toUpperCase()
        })

        this.output(result)
      },
      reverse_text () {
        this.lastAction = this.reverse_text
        let result = this.multipleInputProcess(function (input) {
          let r = ''
          for (let i = input.length; i >= 0; i--) {
            r += input.substring(i, i - 1)
          }
          return r
        })
        this.output(result)
      },
      multipleInputProcess (func) {
        let result = ''
        let splitList = this.text.input.split('\n')
        splitList.forEach(function (item, index) {
          if (item !== '') {
            let r = func(item)
            result += r + '\n\n'
          }
        })
      },
      frontendConvert (method, multiple = true) {
        this.lastAction = method
        let result = ''
        if (multiple) {
          result = this.multipleInputProcess(this[method])
        } else {
          result = this[method]
        }

        this.output(result)
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .text-area
    margin-left 260px

  .button-area
    max-width 245px

</style>

<style lang="stylus" rel="stylesheet/stylus">
  .button-area
    .el-form-item__content
      line-height 28px !important

  .text-area
    .el-form-item:after, .el-form-item:before, .el-form-item__content:after, .el-form-item__content:before
      display none !important
    .el-form-item:after
      clear inherit !important
</style>
