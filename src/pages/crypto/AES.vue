<template>
  <div class="card-container">
    <el-card class="box-card">
      <!--<div slot="header" class="clearfix">-->
        <!--<span>AES工具</span>-->
      <!--</div>-->

      <el-form :model="form" size="medium" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Key (密钥长度128/196/256位，16/24/32字节)">
              <el-input placeholder="" v-model="form.key" class="input-with-select">
                <el-select v-model="form.key_encoding" slot="prepend" style="width: 95px;">
                  <el-option label="Hex" value="Hex"></el-option>
                  <el-option label="UTF8" value="UTF8"></el-option>
                  <el-option label="Base64" value="Base64"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="IV (128位16字节，与分组大小相同)">
              <el-input placeholder="" v-model="form.iv" class="input-with-select">
                <el-select v-model="form.iv_encoding" slot="prepend" style="width: 95px;">
                  <el-option label="Hex" value="Hex"></el-option>
                  <el-option label="UTF8" value="UTF8"></el-option>
                  <el-option label="Base64" value="Base64"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Mode">
              <el-select v-model="form.mode">
                <el-option label="ECB" value="ECB"></el-option>
                <el-option label="CBC" value="CBC"></el-option>
                <el-option label="CFB" value="CFB"></el-option>
                <el-option label="OFB" value="OFB"></el-option>
                <el-option label="CTR" value="CTR"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Padding">
              <el-select v-model="form.padding">
                <el-option label="PKCS5" value="PKCS5"></el-option>
                <el-option label="PKCS7" value="PKCS7"></el-option>
                <el-option label="X923" value="X923"></el-option>
                <el-option label="ISO7816" value="ISO7816"></el-option>
                <el-option label="ZeroPadding" value="ZeroPadding"></el-option>
                <el-option label="NoPadding" value="NoPadding"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Plain Format">
              <el-select v-model="form.plain_encoding">
                <el-option label="UTF8" value="UTF8"></el-option>
                <el-option label="Hex" value="Hex"></el-option>
                <el-option label="Base64" value="Base64"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Cipher Format">
              <el-select v-model="form.cipher_encoding">
                <el-option label="Hex" value="Hex"></el-option>
                <el-option label="Base64" value="Base64"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form :model="form" size="medium">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="24" style="text-align: center">
            <el-button icon="el-icon-arrow-left" type="primary" size="medium"
                       @click="encryptProcess('decrypt')">解密
            </el-button>
            <el-button icon="el-icon-arrow-right" type="primary" size="medium"
                       @click="encryptProcess('encrypt')">加密
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="明文">
              <el-input type="textarea" v-model="form.plain"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密文">
              <el-input type="textarea" v-model="form.cipher"
                        :autosize="{ minRows: 3, maxRows: 30}"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="font-size: 14px; color: #606266">
        AES 分组大小是 128 位 16字节
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
          key: '',
          key_encoding: 'Hex',
          mode: 'ECB',
          iv: '',
          iv_encoding: 'Hex',
          padding: 'NoPadding',
          plain_encoding: 'UTF8',
          cipher_encoding: 'Hex',
          plain: '',
          cipher: ''
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
      encryptProcess (actionType) {
        let self = this
        let url = '/api/crypto/aes-encrypt-decrypt/'
        let postData = this.$utils.copy(this.form)
        postData['action'] = actionType

        this.$http.post(url, postData).then(function (r) {
          self.form.plain = r['data'].plain
          self.form.cipher = r['data'].cipher
        }).catch(function (r) {
          self.$eventHub.$emit('show-error-msg', r['msg'])
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
