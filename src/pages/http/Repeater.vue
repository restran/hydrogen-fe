<template>
  <div class="card-container">
    <el-card class="box-card">
      <!--<div slot="header" class="clearfix">-->
      <!--<span>HTTP Repeater</span>-->
      <!--</div>-->
      <el-tabs v-model="editableTabsValue" type="card" editable @tab-add="addTab" @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <el-form :model="item.form" :label-width="'100'" size="medium">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="请求地址">
                  <el-input v-model="item.form.netloc"
                            placeholder="http://www.example.com:8080"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作">
                  <div style="width: 100%; position: relative; display: inline-block">
                    <el-button type="primary" size="medium" @click="onSubmit(item)">发送</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="请求">
                  <el-input type="textarea" v-model="item.form.request"
                            :autosize="{ minRows: 6, maxRows: 30}"
                            placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="响应">
                  <el-input type="textarea" v-model="item.form.response"
                            :autosize="{ minRows: 6, maxRows: 30}"
                            placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
        editableTabsValue: '1',
        editableTabs: [
          {
            title: '1',
            name: '1',
            form: {
              netloc: '',
              request: '',
              response: ''
            }
          }
        ],
        tabIndex: 1
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
      removeTab (targetName) {
        console.log(targetName)
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      },
      addTab (targetName) {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: newTabName,
          name: newTabName,
          form: {
            netloc: '',
            request: '',
            response: ''
          }
        })
        this.editableTabsValue = newTabName
      },
      onSubmit (item) {
        let self = this
        let data = {
          'netloc': item.form.netloc,
          'request': item.form.request,
          'response': item.form.response
        }

        this.$http.post('/api/http/request/', data)
          .then(function (r) {
            item.form.response = r['data']
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
          })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .card-container
    max-width none
</style>
