<template>
  <div>
    <el-card class="box-card row-bg" style="max-width: 800px; margin: 0 auto">
      <el-row slot="header" type="flex" class="clearfix" justify="center" :gutter="20">
        <el-form ref="form" :model="form" :label-position="'top'" size="medium"
                 label-width="80px" style="width: 100%; padding: 0 10px">
          <el-form-item label="最大深度">
            <el-input-number style="width: 150px" v-model="form.maxDepth" :min="1" :max="100"></el-input-number>
            <el-button type="primary" style="margin-left: 10px" @click="onSubmit">测试</el-button>
          </el-form-item>

          <el-form-item label="输入内容">
            <el-input type="textarea" :rows="4" v-model="form.input"></el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row slot="header">
        <div v-if="schemeList.length > 0">
          <div style="font-size: 16px; margin-bottom: 5px">可能的编码类型</div>
          <div class="text item" style="padding: 1px 0" v-for="item in schemeList">
            <p>{{ item }}</p>
          </div>
        </div>
      </el-row>

      <div class="text item" v-for="item in resultList">
        <div style="margin-bottom: 5px">
          <p v-clipboard:copy="item.methods"
             v-clipboard:success="onCopy" style="color: #1c8de0">{{ item.methods }}</p>
          <p v-clipboard:copy="item.data"
             v-clipboard:success="onCopy">{{ item.data }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  function magic (value) {
    return value
  }

  export default {
    components: {},
    name: 'hashed',
    data () {
      return {
        form: {
          input: '',
          maxDepth: 5
        },
        resultList: [],
        schemeList: []
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
      hashed () {
        return []
      }
    },
    methods: {
      backendRequest () {
        if (this.form.input === '') {
          return
        }
        let self = this
        let data = {
          'max_depth': this.form.maxDepth,
          'data': this.form.input
        }

        this.$http.backendConvert('/api/converter/what-encode/', data)
          .then(function (r) {
            r['data']['result'].forEach(function (item, index) {
              item['_index'] = index
            })

            self.schemeList = r['data']['scheme_list']
            self.resultList = r['data']['result']
          }).catch(function (r) {
          self.$eventHub.$emit('show-error-msg', r['msg'])
        })
      },
      onSubmit () {
        return this.backendRequest()
      },
      onCopy (e) {
        this.$eventHub.$emit('show-success-msg', '已复制')
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">.row-bg {
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
