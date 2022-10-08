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
            <el-button type="primary" size="mini" @click="frontend_convert('utf7_encode')">UTF7编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('utf7_all_encode')">UTF7全编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('utf7_decode')">UTF7解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('url_encode')">URL编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('url_all_encode')">URL全编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('url_decode')">URL解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('url_encode_gb2312')">URL GBK编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('url_decode_gb2312')">URL GBK解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base100')">B100编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base100')">B100解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base92')">B92编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base92')">B92解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base91')">B91编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base91')">B91解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base85')">B85编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base85')">B85解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base58')">B58编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base58')">B58解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-tooltip class="item" effect="dark" content="Ascii85编码" placement="top-start">
              <el-button type="primary" size="mini" @click="backend_convert('to_ascii85')">A85编码</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Ascii85解码" placement="top-start">
              <el-button type="primary" size="mini" @click="backend_convert('from_ascii85')">A85解码</el-button>
            </el-tooltip>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base62')">B62编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base62')">B62解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base36')">B36编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base36')">B36解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_any_base32')">AnyB32编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_any_base32')">AnyB32解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base64')">B64编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base64')">B64解码</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_base32')">B32编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_base32')">B32解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('url_safe_b64encode')">UrlSafe B64编码
            </el-button>
            <el-button type="primary" size="mini" @click="backend_convert('url_safe_b64decode')">UrlSafe B64解码
            </el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('b642hex')">B642Hex</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('hex2b64')">Hex2B64</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('json_format', false)">JSON格式化</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('xml_escape', false)">Xml转义</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('xml_un_escape', false)">Xml反转义</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('js16_encode')">JS16编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('js16_decode')">JS16解码</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('html_escape', false)">Html转义</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('html_un_escape', false)">Html反转义</el-button>
          </el-button-group>

                   <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('js8_encode')">JS8编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('js8_decode')">JS8解码</el-button>
          </el-button-group>



          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('html10_encode')">Html10编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('html10_decode')">Html10解码</el-button>
          </el-button-group>


          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('html16_encode')">Html16编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('html16_decode')">Html16解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('html_special_chars')">Html Special Chars
            </el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('string_char_code')">String Char Code
            </el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="backend_convert('to_uu')">UUEncode编码</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('from_uu')">UUEncode解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('unicode_encode')">Unicode编码</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('unicode_decode')">Unicode解码</el-button>
          </el-button-group>

          <el-button-group>
            <el-tooltip class="item" effect="dark" content="Quoted Printable编码" placement="top-start">
              <el-button type="primary" size="mini" @click="backend_convert('to_quoted_printable')">QuoPri编码</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Quoted Printable解码" placement="top-start">
              <el-button type="primary" size="mini" @click="backend_convert('from_quoted_printable')">QuoPri解码
              </el-button>
            </el-tooltip>
          </el-button-group>

          <el-button-group>
            <el-button type="success" size="mini" @click="find_flag()">Find Flag</el-button>
          </el-button-group>

        </el-form-item>

        <el-form-item label="变换选项" style="margin-bottom: 10px">
          <el-button-group>
            <el-button type="primary" size="mini" @click="frontend_convert('reverse_text')">反向文本</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('to_lower_case')">转成小写</el-button>
            <el-button type="primary" size="mini" @click="frontend_convert('to_upper_case')">转成大写</el-button>
            <el-button type="primary" size="mini" @click="backend_convert('swap_case')">大小写互换</el-button>
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
            <div style="width: 115px;display: inline-block; color: #606266">将输出作为输入</div>
            <el-switch
              v-model="outputAsInput"
              active-color="#13ce66">
            </el-switch>
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
      outputAsInput: false,
      multipleInput: true
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
    backend_convert (method, multiple = undefined) {
      let self = this
      this.lastAction = this.backend_convert
      if (multiple === undefined) {
        multiple = this.multipleInput
      }
      let data = {
        'method': method,
        'data': this.text.input,
        'multiple_input': multiple
      }

      if (method === 'to_digital' || method === 'from_digital') {
        data['params'] = [this.digitalNum]
      }

      this.$http.post('/api/converter/convert-data/', data).then(function (r) {
        self.output(r['data'])
      }).catch(function (r) {
        self.$eventHub.$emit('show-error-msg', r['msg'])
      })
    },
    b64encode (input) {
      return base64.stringify(utf8.parse(input))
    },
    b64decode (input) {
      input = input.replace(/[\n|\s]/g, '')
      let result
      let bytes = base64.parse(input)
      try {
        result = utf8.stringify(bytes)
      } catch (e) {
        result = latin1.stringify(bytes)
      }
      return result
    },
    b32encode (input) {
      return base32.encode(input)
    },
    b32decode (input) {
      input = input.replace(/[\n|\s]/g, '')
      return base32.decode(input)
    },
    html_escape (input) {
      let s = input
      if (s.length === 0) return ''
      s = s.replace(/&/g, '&amp;')
      s = s.replace(/</g, '&lt;')
      s = s.replace(/>/g, '&gt;')
      s = s.replace(/ /g, '&nbsp;')
      s = s.replace(/'/g, '&#39;')
      s = s.replace(/"/g, '&quot;')
      s = s.replace(/\n/g, '<br>')
      return s
    },
    html_un_escape (input) {
      let s = input
      if (s.length === 0) return ''
      s = s.replace(/&lt;/g, '<')
      s = s.replace(/&gt;/g, '>')
      s = s.replace(/&#60;/g, '<')
      s = s.replace(/&#62;/g, '>')
      s = s.replace(/&nbsp;/g, ' ')
      s = s.replace(/&amp;/g, '&')
      s = s.replace(/&#38;/g, '&')
      s = s.replace(/&#39;/g, '\'')
      s = s.replace(/&#34;/g, '"')
      s = s.replace(/&quot;/g, '"')
      s = s.replace(/<br>/g, '\n')
      return s
    },
    json_format (input) {
      let text = ''
      try {
        text = JSON.parse(input)
        text = JSON.stringify(text, null, 2)
      } catch (e) {
        text = '处理JSON出现异常: ' + e
      }

      return text
    },
    utf7_encode (input) {
      return utf7.encode(input)
    },
    utf7_all_encode (input) {
      return utf7.encodeAllChar(input)
    },
    utf7_decode (input) {
      return utf7.decode(input)
    },
    hex_encode (input) {
      return hex.stringify(utf8.parse(input))
    },
    hex_decode (input) {
      let result
      let enc = input
      if (enc.startsWith('0x') || enc.startsWith('0X')) {
        enc = enc.substr(2)
      }
      let bytes = hex.parse(enc)
      try {
        result = utf8.stringify(bytes)
      } catch (e) {
        result = latin1.stringify(bytes)
      }
      return result
    },
    url_encode (input) {
      return encodeURIComponent(input)
    },
    url_decode (input) {
      return decodeURIComponent(input)
    },
    url_encode_gb2312 (input) {
      return urlencode.encode(input, 'gbk')
    },
    url_decode_gb2312 (input) {
      return urlencode.decode(input, 'gbk')
    },
    url_all_encode (input) {
      return url_encode(input)
    },
    html10_encode (input) {
      return input.split('').map(m => '&#' + m.charCodeAt() + ';').join('')
    },
    html10_decode (input) {
      return input.replace(/&#(\d+);?/g, (match, i) => String.fromCharCode(parseInt(i)))
    },
    html_special_chars (input) {
      return input.replace(/&/g, '&amp;').
        replace(/"/g, '&quot;').
        replace(/'/g, '&#039;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;')
    },
    html16_encode (input) {
      return input.split('').map(m => '&#x' + m.charCodeAt().toString(16) + ';').join('')
    },
    html16_decode (input) {
      return input.replace(/&#x([a-f0-9]+);?/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
    },
    js8_encode (input) {
      return input.split('').map(m => '\\' + m.charCodeAt().toString(8)).join('')
    },
    js8_decode (input) {
      return input.replace(/\\([0-7]+)/g, (match, i) => String.fromCharCode(parseInt(i, 8)))
    },
    js16_encode (input) {
      return input.split('').map(m => '\\x' + m.charCodeAt().toString(16)).join('')
    },
    js16_decode (input) {
      return input.replace(/\\x([a-f0-9]{1,4})/ig, (match, i) => String.fromCharCode(parseInt(i, 16)))
    },
    unicode_encode (input) {
      return input.split('').map(m => {
        let pad = '0000'
        let str = m.charCodeAt().toString(16)
        return '\\u' + pad.substring(0, pad.length - str.length) + str
      }).join('')
    },
    unicode_decode (input) {
      return input.replace(/\\u([a-fA-F0-9]{4})/g, (match, i) => String.fromCharCode(parseInt(i, 16)))
    },
    string_char_code (input) {
      let x = input.split('').map(m => m.charCodeAt()).join(',')
      return `String.fromCharCode(${x})`
    },
    to_lower_case (input) {
      return input.toLowerCase()
    },
    to_upper_case (input) {
      return input.toUpperCase()
    },
    reverse_text (input) {
      let r = ''
      for (let i = input.length; i >= 0; i--) {
        r += input.substring(i, i - 1)
      }
      return r
    },
    multipleInputProcess (func) {
      let result = ''
      let splitList = this.text.input.split('\n')
      splitList.forEach(function (item, index) {
        console.log(item)
        if (item !== '') {
          let r = func(item)
          result += r + '\n'
        }
      })

      return result
    },
    frontend_convert (method, multiple = undefined) {
      console.log(method)
      this.lastAction = method
      let result = ''
      if (multiple === undefined) {
        multiple = this.multipleInput
      }

      if (multiple) {
        result = this.multipleInputProcess(this[method])
      } else {
        result = this[method](this.text.input)
      }

      this.output(result)
    },
    find_flag () {
      let self = this
      let data = {
        'data': [this.text.input, this.text.output]
      }

      if (this.text.input === '' && this.text.output === '') {
        return
      }

      this.$http.post('/api/crypto/find-flag-from-string/', data).then(function (r) {
        self.output(r['data'])
      }).catch(function (r) {
        self.$eventHub.$emit('show-error-msg', r['msg'])
      })
    }
  },
  watch: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.text-area
  margin-left 265px

.button-area
  max-width 262px

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
