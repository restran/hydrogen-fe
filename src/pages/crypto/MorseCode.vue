<template>
  <div>
    <el-card class="box-card" style="max-width: 750px; margin: 0 auto">
      <el-form ref="form" :model="form" label-position="top" label-width="80px" size="medium">
        <el-form-item label="输入" style="margin-bottom: 10px">
          <el-input type="textarea" :rows="6" v-model="form.input"></el-input>
        </el-form-item>
        <el-form-item label="格式" style="margin-bottom: 10px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-row :gutter="0">
                <el-col :span="10">
                  <span>Space:</span>
                </el-col>
                <el-col :span="14">
                  <el-input v-model="form.space" placeholder="space"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="0">
                <el-col :span="10">
                  <span>Short:</span>
                </el-col>
                <el-col :span="14">
                  <el-input v-model="form.short" placeholder="short"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="0">
                <el-col :span="10">
                  <span>Long:</span>
                </el-col>
                <el-col :span="14">
                  <el-input v-model="form.long" placeholder="long"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin: 0 auto; text-align: center">
          <el-button type="primary" @click="encode">Encode</el-button>
          <el-button type="primary" @click="decode">Decode</el-button>
        </el-form-item>
        <el-form-item label="输出">
          <el-input type="textarea" :rows="6" v-model="form.output"></el-input>
        </el-form-item>
      </el-form>

      <div>可以支持 unicode，例如中文摩斯密码</div>
    </el-card>
  </div>
</template>

<script>
  import xmorse from '@/utils/src/xmorse'

  export default {
    components: {},
    data () {
      return {
        form: {
          input: '',
          output: '',
          space: '/',
          short: '.',
          long: '-'
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
      encode () {
        let option = {
          space: this.form.space,
          short: this.form.short,
          long: this.form.long
        }
        this.form.output = xmorse.encode(this.form.input, option)
      },
      decode () {
        let option = {
          space: this.form.space,
          short: this.form.short,
          long: this.form.long
        }
        this.form.output = xmorse.decode(this.form.input, option)
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
