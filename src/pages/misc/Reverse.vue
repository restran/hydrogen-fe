<template>
  <div class="card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">OD和IDA地址互转</span>
      </div>

      <div>
        <el-form :model="form" :label-width="'100'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="IDA基地址">
                <el-input v-model="form.idaBaseAddress" @change="computeAddress"
                          placeholder="16进制地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="OD基地址">
                <el-input v-model="form.odBaseAddress" @change="computeAddress"
                          placeholder="16进制地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="IDA地址">
                <el-input v-model="form.idaAddress" @change="computeAddress"
                          placeholder="16进制地址"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="OD地址（转换后）">
                <el-input v-model="form.odConverted"
                          placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="OD地址">
                <el-input v-model="form.odAddress" @change="computeAddress"
                          placeholder="16进制地址"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="IDA地址（转换后）">
                <el-input v-model="form.idaConverted"
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
          odBaseAddress: '00040000',
          idaBaseAddress: '00400000',
          odAddress: '',
          idaAddress: '',
          odConverted: '',
          idaConverted: ''
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

      computeAddress () {
        let odBaseAddress = this.$utils.hex2Dec(this.form.odBaseAddress)
        let idaBaseAddress = this.$utils.hex2Dec(this.form.idaBaseAddress)
        let idaAddress = this.$utils.hex2Dec(this.form.idaAddress)
        let odAddress = this.$utils.hex2Dec(this.form.odAddress)

        if (isNaN(odBaseAddress) || isNaN(idaBaseAddress)) {
          return
        }

        if (isNaN(idaAddress)) {
          this.form.odConverted = ''
        } else {
          this.form.odConverted = this.$utils.dec2hex(idaAddress - idaBaseAddress + odBaseAddress)
          this.form.odConverted = this.$utils.formatStrLength(this.form.odConverted, 8, '0')
        }

        if (isNaN(odAddress)) {
          this.form.idaConverted = ''
        } else {
          this.form.idaConverted = this.$utils.dec2hex(odAddress - odBaseAddress + idaBaseAddress)
          this.form.idaConverted = this.$utils.formatStrLength(this.form.idaConverted, 8, '0')
        }
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
