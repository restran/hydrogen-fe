<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col style="max-width: 750px">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="24">
            <el-card class="box-card row-bg">
              <el-row slot="header" type="flex" class="clearfix" justify="center" :gutter="20">
                <el-col :span="5">
                  <el-select v-model="selectOption" size="medium" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="15">
                  <el-input
                    size="medium"
                    type="text"
                    placeholder="多个数据使用空格隔开"
                    v-model="value">
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click="convertData" size="medium">转换</el-button>
                </el-col>
              </el-row>
              <div class="text item" v-for="item in result">
                <el-row slot="header" type="flex" class="clearfix" justify="center" :gutter="20">
                  <el-col :span="4">{{ item.label }}</el-col>
                  <el-col :span="20">
                    <code v-clipboard:copy="item.value"
                          v-clipboard:success="onCopy">{{ item.value }}</code>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

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
    name: 'hashed',
    data () {
      return {
        value: '',
        options: [
          {
            value: 'binary',
            label: 'Binary'
          }, {
            value: 'octal',
            label: 'Octal'
          }, {
            value: 'decimal',
            label: 'Decimal'
          }, {
            value: 'hex',
            label: 'Hex'
          }, {
            value: 'ascii',
            label: 'Ascii'
          }
        ],
        selectOption: 'decimal',
        result: [
          {
            label: 'Binary',
            value: ''
          },
          {
            label: 'Octal',
            value: ''
          },
          {
            label: 'Decimal',
            value: ''
          },
          {
            label: 'Hex',
            value: ''
          },
          {
            label: 'Ascii',
            value: ''
          }
        ]
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
      convertData () {
        if (this.value === '') {
          return
        }
        let self = this
        this.lastAction = this.backend_convert
        let data = {
          'method': 'all_digit_convert',
          'data': this.value,
          'params': [this.selectOption]
        }

        this.$http.backendConvert('/api/converter/convert-data/', data)
          .then(function (r) {
            self.result.forEach(function (item, index) {
              let d = r['data'][item['label'].toLowerCase()]
              if (d === undefined) {
                d = ''
              }
              item['value'] = d
            })
          }).catch(function (r) {
          self.$eventHub.$emit('show-error-msg', r['msg'])
        })
      },
      onCopy (e) {
        this.$eventHub.$emit('show-success-msg', '已复制')
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .row-bg {
    margin-bottom: 30px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    word-wrap: break-word;
    word-break: break-all;
  }

  .tag {
    margin: 0 10px 5px 0;
  }

</style>
