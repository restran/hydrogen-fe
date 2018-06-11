<template>
  <div class="card-container">
    <el-card class="box-card">
      <el-form :model="configForm" :label-width="'100'" size="medium">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Listen">
              <el-input v-model="configForm.listen"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="Upstream">
              <el-input v-model="configForm.upstream"
                        placeholder="127.0.0.1:9920"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="Interceptor">
              <el-select v-model="configForm.interceptor" style="width: 100%" size="medium" clearable
                         placeholder="">
                <el-option
                  v-for="item in interceptorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Action">
              <div style="width: 100%; position: relative; display: inline-block">
                <el-button :type="action === 'start' ? 'primary' : 'danger'"
                           :loading="actionLoading"
                           size="medium" @click="onSubmit">{{action === 'start' ? 'Start' : 'Stop'}}
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs v-model="editableTabsValue" type="card" addable @tab-add="addTab" @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <el-row :gutter="20" style="margin-bottom: 15px">
            <el-col :span="10">
              <el-input v-model="item.form.name" placeholder="请输入名称"></el-input>
            </el-col>
            <el-col :span="14">
              <el-button type="primary"
                         size="medium" @click="saveInterceptor(item)">Save
              </el-button>
              <el-button type="danger" v-if="item.form.uuid !== null"
                         size="medium" @click="deleteInterceptor(item)">Delete
              </el-button>
            </el-col>
          </el-row>
          <codemirror v-model="item.form.code" :options="editorOption"></codemirror>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror-lite'
  import 'codemirror/mode/python/python'

  let codeExample =
    `class Interceptor(object):
    """
    类名固定是 Interceptor
    """
    def __init__(self, handler):
        self.handler = handler

    def on_request(self):
        # self.handler.request
        pass

    def on_response(self):
        # self.handler.response
        pass

    def on_finished(self):
        pass
`
  export default {
    components: { codemirror },
    data () {
      return {
        interceptorOptions: [],
        editorOption: {
          lineNumbers: true,
          mode: 'python',
          extraKeys: { 'Ctrl-Space': 'autocomplete' }
        },
        activeName: 'interceptor',
        tableData: [],
        actionLoading: false,
        action: 'start',
        configForm: {
          listen: '127.0.0.1:8888',
          upstream: '',
          interceptor: ''
        },
        editableTabsValue: '新拦截器',
        editableTabs: [],
        tabIndex: 0
      }
    },
    mounted () {
      let self = this
      this.$nextTick(function () {

      })
    },
    created () {
      this.getAllInterceptors()
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
        let newTabName = '新拦截器' + (++this.tabIndex)
        this.editableTabs.push({
          title: newTabName,
          name: newTabName,
          form: {
            name: newTabName,
            code: codeExample,
            uuid: null
          }
        })
        this.editableTabsValue = newTabName
      },
      onSubmit () {
        let self = this
        let data = this.$utils.copy(this.configForm)
        data['action'] = this.action
        self.actionLoading = true
        this.$http.post('/api/http/proxy/', data)
          .then(function (r) {
            // self.form.response = r['data']
            if (self.action === 'start') {
              self.action = 'stop'
            } else {
              self.action = 'start'
            }

            self.actionLoading = false
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
            self.actionLoading = false
          })
      },
      saveInterceptor (item) {
        let self = this
        let data = this.$utils.copy(item.form)
        data['action'] = 'insert-update'
        console.log(data)
        this.$http.post('/api/http/proxy-interceptor/', data)
          .then(function (r) {
            item.form['uuid'] = r['data']['uuid']
            if (data['uuid'] === null) {
              self.interceptorOptions.push({
                value: item.form['uuid'],
                label: item.form['name']
              })
            } else {
              self.editableTabs.forEach(function (item, index) {
                if (data['uuid'] === item.form['uuid']) {
                  item['title'] = data['name']
                }
              })

              self.interceptorOptions.forEach(function (item, index) {
                if (data['uuid'] === item['value']) {
                  item['label'] = data['name']
                }
              })
            }

            self.$eventHub.$emit('show-success-msg', '保存成功')
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
            self.actionLoading = false
          })
      },
      deleteInterceptor (item) {
        let self = this
        let data = this.$utils.copy(item.form)
        data['action'] = 'delete'
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post('/api/http/proxy-interceptor/', data)
            .then(function (r) {
              self.$eventHub.$emit('show-success-msg', '删除成功')
              for (let i = 0; i < self.editableTabs.length; i++) {
                console.log(self.editableTabs[i].form['uuid'])
                console.log(data['uuid'])
                if (data['uuid'] === self.editableTabs[i].form['uuid']) {
                  self.editableTabs.splice(i, 1)
                  break
                }
              }

              for (let i = 0; i < self.interceptorOptions.length; i++) {
                if (data['uuid'] === self.interceptorOptions[i]['value']) {
                  self.interceptorOptions.splice(i, 1)
                  break
                }
              }
            })
            .catch(function (r) {
              self.$eventHub.$emit('show-error-msg', r['msg'])
              self.actionLoading = false
            })
        }).catch(() => {
        })
      },
      getAllInterceptors () {
        let self = this
        let postData = {
          'action': 'get-all'
        }
        this.$http.post('/api/http/proxy-interceptor/', postData)
          .then(function (r) {
            if (r['data'].length <= 0) {
              self.addTab()
              self.editableTabsValue = '新拦截器' + self.tabIndex
            } else {
              self.editableTabsValue = r['data'][0]['uuid']
            }

            r['data'].forEach(function (item, index) {
              self.editableTabs.push({
                title: item['name'],
                name: item['uuid'],
                form: {
                  name: item['name'],
                  code: item['code'],
                  uuid: item['uuid']
                }
              })

              self.interceptorOptions.push({
                value: item['uuid'],
                label: item['name']
              })
            })
          })
          .catch(function (r) {
            self.$eventHub.$emit('show-error-msg', r['msg'])
            self.actionLoading = false
          })
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .card-container
    max-width none

  .el-tabs__item
    font-weight normal !important

  .CodeMirror
    height auto !important
    min-height 300px
</style>
