<template>
  <div class="card-container">
    <el-card class="box-card">
      <!--<div slot="header" class="clearfix">-->
      <!--<span>RSA工具</span>-->
      <!--</div>-->
      <el-form :model="rsaForm" :label-width="'100'" size="medium">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="n">
              <el-input type="textarea" v-model="rsaForm.n"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder="支持16进制和10进制，16进制请使用0x开头"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="p">
              <el-input type="textarea" v-model="rsaForm.p"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder="支持16进制和10进制，16进制请使用0x开头"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="e">
              <el-input type="textarea" v-model="rsaForm.e"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder="65537"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="q">
              <el-input type="textarea" v-model="rsaForm.q"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder="支持16进制和10进制，16进制请使用0x开头"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="d">
              <el-input type="textarea" v-model="rsaForm.d"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder="支持16进制和10进制，16进制请使用0x开头"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs>
        <el-tab-pane label="PEM格式密钥解析">
          <el-form :model="pemForm" :label-width="'100'" size="medium">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="24" style="text-align: center">
                <el-button icon="el-icon-arrow-up" type="primary" size="medium"
                           @click="pemProcess('from_pem')">识别PEM格式
                </el-button>
                <el-button icon="el-icon-arrow-down" size="medium"
                           @click="pemProcess('to_pem')">转成PEM格式
                </el-button>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Passphrase">
                  <el-input v-model="rsaForm.passphrase" placeholder="使用 UTF8 编码的字符串" size="medium"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="pemKeyType">
                  <el-input type="textarea" v-model="pemForm.key_content"
                            :autosize="{ minRows: 3, maxRows: 30}"
                            :placeholder="pemKeyPlaceholder"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-tab-pane>

        <el-tab-pane label="RSA加解密">
          <el-form :model="encryptForm" :label-width="'100'" label-position="top" size="medium">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="24" style="text-align: center; margin-bottom: 10px">
                <el-button icon="el-icon-arrow-left" size="medium" type="primary"
                           @click="encryptProcess('decrypt')">解密
                </el-button>
                <el-button icon="el-icon-arrow-right" size="medium" type="primary"
                           @click="encryptProcess('encrypt')">加密
                </el-button>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Padding">
                  <el-select v-model="encryptForm.padding" size="medium">
                    <el-option label="NoPadding" value="NoPadding"></el-option>
                    <el-option label="PKCS1_OAEP" value="PKCS1_OAEP"></el-option>
                    <el-option label="PKCS1_v1_5" value="PKCS1_v1_5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="Plain Format">
                  <el-select v-model="encryptForm.plain_encoding">
                    <el-option label="UTF8" value="UTF8"></el-option>
                    <el-option label="Hex" value="Hex"></el-option>
                    <el-option label="Base64" value="Base64"></el-option>
                    <el-option label="Decimal" value="Decimal"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="Cipher Format">
                  <el-select v-model="encryptForm.cipher_encoding">
                    <el-option label="Hex" value="Hex"></el-option>
                    <el-option label="Base64" value="Base64"></el-option>
                    <el-option label="Decimal" value="Decimal"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="明文">
                  <el-input type="textarea" v-model="encryptForm.plain"
                            :autosize="{ minRows: 5, maxRows: 30}"
                            placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密文">
                  <el-input type="textarea" v-model="encryptForm.cipher"
                            :autosize="{ minRows: 5, maxRows: 30}"
                            placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div style="font-size: 14px; color: #606266">
            PKCS1_OAEP 是最安全的填充方法，每次加密后的结果都不一样
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        pemKeyPlaceholder: '-----BEGIN PUBLIC KEY-----\n' +
        'MDowDQYJKoZIhvcNAQEBBQADKQAwJgIhAMJjauXD2OQ/+5erCQKPGqxsC/bNPXDr\n' +
        'yigb/+l/vjDdAgEC\n' +
        '-----END PUBLIC KEY-----\n',
        rsaForm: {
          n: '',
          e: '65537',
          p: '',
          q: '',
          d: ''
        },
        pemForm: {
          key_content: '',
          passphrase: '',
          is_private: null
        },
        encryptForm: {
          plain: '',
          cipher: '',
          plain_encoding: 'UTF8',
          cipher_encoding: 'Decimal',
          padding: 'NoPadding'
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
    computed: {
      pemKeyType () {
        if (this.pemForm.is_private === true) {
          return 'PEM格式密钥 (私钥)'
        } else if (this.pemForm.is_private === false) {
          return 'PEM格式密钥 (公钥)'
        } else {
          return 'PEM格式密钥'
        }
      }
    },
    methods: {
      pemProcess (actionType) {
        let self = this
        let url = ''
        if (actionType === 'from_pem') {
          url = '/api/crypto/rsa-from-pem-key/'
        } else {
          url = '/api/crypto/rsa-to-pem-key/'
        }
        let postData = {
          'action': actionType,
          'n': self.rsaForm.n,
          'e': self.rsaForm.e,
          'p': self.rsaForm.p,
          'q': self.rsaForm.q,
          'd': self.rsaForm.d,
          'passphrase': self.pemForm.passphrase,
          'key_content': self.pemForm.key_content
        }
        this.$http.post(url, postData).then(function (r) {
          if (r['data']['key_content'] !== undefined) {
            self.pemForm.key_content = r['data']['key_content']
          }
          if (r['data']['is_private'] !== undefined) {
            self.pemForm.is_private = r['data']['is_private']
          }
          if (r['data']['n'] !== undefined) {
            self.rsaForm.n = r['data']['n']
          }
          if (r['data']['e'] !== undefined) {
            self.rsaForm.e = r['data']['e']
          }
          if (r['data']['p'] !== undefined) {
            self.rsaForm.p = r['data']['p']
          }
          if (r['data']['q'] !== undefined) {
            self.rsaForm.q = r['data']['q']
          }
          if (r['data']['d'] !== undefined) {
            self.rsaForm.d = r['data']['d']
          }
        }).catch(function (r) {
          self.$eventHub.$emit('show-error-msg', r['msg'])
        })
      },
      encryptProcess (actionType) {
        let self = this
        let url = '/api/crypto/rsa-encrypt-decrypt/'
        let postData = {
          'action': actionType,
          'n': self.rsaForm.n,
          'e': self.rsaForm.e,
          'p': self.rsaForm.p,
          'q': self.rsaForm.q,
          'd': self.rsaForm.d,
          'plain_encoding': self.encryptForm.plain_encoding,
          'cipher_encoding': self.encryptForm.cipher_encoding,
          'padding': self.encryptForm.padding,
          'plain': self.encryptForm.plain,
          'cipher': self.encryptForm.cipher
        }
        this.$http.post(url, postData).then(function (r) {
          self.encryptForm.plain = r['data'].plain
          self.encryptForm.cipher = r['data'].cipher
        }).catch(function (r) {
          self.$eventHub.$emit('show-error-msg', r['msg'])
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*.card-container*/
  /*max-width none*/
</style>
