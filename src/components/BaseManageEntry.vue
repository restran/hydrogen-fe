<template>
  <div>
    <div class="clearfix" style="margin-bottom: 20px;">
      <div class="float-left">
        <el-breadcrumb separator="/" v-if="breadcrumbVisible">
          <el-breadcrumb-item :to="{ path: redirectUri }">{{navTitle}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="editEntryVisible">{{currentPageName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="float-right" style="margin-top: -10px;display: inline-flex" v-show="!editEntryVisible">
        <slot name="headerButton" :vm="this"></slot>
        <el-button v-show="queryParams.redirectUri !== undefined"
                   style="margin-left: 10px"
                   @click="goRedirectUri()">返回
        </el-button>
        <el-button type="primary" @click="createEntry"
                   v-show="addButtonVisible">添加
        </el-button>
        <el-button icon="setting" style="color:#8492a6"
                   @click="showTableSetting"></el-button>
      </div>
    </div>

    <slot name="headerSlot" :vm="this"></slot>

    <div v-if="!editEntryVisible">
      <slot name="table" :vm="this" v-if="customTable"></slot>
      <el-table
        v-if="!customTable"
        v-loading="loading"
        element-loading-text="数据加载中"
        :data="tableData"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
        <el-table-column
          sortable
          prop="_index"
          label="序号"
          width="80">
        </el-table-column>
        <!--:prop="field['name']"-->
        <el-table-column v-if="!customTableColumn"
                         v-for="field in displayTableFields"
                         sortable
                         :prop="field['name']"
                         :label="field['label']"
                         :width="field['width']">
          <template scope="scope">
            <a v-if="field['is_img']" v-show="scope.row[field['img_url_field']]!=''"
               :href="scope.row[field['img_link_url_field']] !== undefined ? scope.row[field['img_link_url_field']] : scope.row[field['img_url_field']]"
               target="_blank">
              <img style="max-width: 120px"
                   :src="scope.row[field['img_url_field']]">
            </a>
            <span v-else>{{scope.row[field['name']]}}</span>
          </template>
        </el-table-column>

        <slot name="tableColumnSlot" :vm="this" v-if="customTableColumn"></slot>

        <el-table-column
          inline-template
          fixed="right"
          label="操作"
          :width="tableActionWidth">
          <div class="table-button" v-if="customTableButton">
            <slot name="customTableButtonSlot" :vm="this" :index="$index"></slot>
          </div>
          <div class="table-button" v-else>
            <el-button type="text" v-if="!disableEditForm"
                       @click="editEntry($index, tableData)" size="small">编辑</el-button>
            <slot name="tableButton" :vm="this" :index="$index"></slot>
            <el-button class="danger-button" @click="deleteEntry($index, tableData)" type="text"
                       size="small">删除
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination" v-show="total > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <div v-if="editEntryVisible">
      <div class="box-card"
           v-loading="formLoading">
        <el-form class="box-form"
                 :label-width="formLabelWidth + 'px'"
                 ref="form" :model="formData" :rules="formRules">
          <slot name="form" :vm="this"></slot>

          <el-form-item>
            <el-button type="primary" v-if="action==='create'" :disabled="createUpdateLoading"
                       @click="onFormCreate(false)">创建
            </el-button>
            <el-button type="primary" v-if="action==='create'" :disabled="createUpdateLoading"
                       @click="onFormCreate(true)">创建并继续
            </el-button>
            <el-button type="primary" v-if="action==='update'" :disabled="createUpdateLoading"
                       @click="onFormUpdate">保存
            </el-button>
            <el-button @click="onFormCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <slot name="formExtraBox" :vm="this"></slot>
    </div>

    <el-dialog title="请确认" v-model="deleteDlgVisible" size="tiny">
      <span class="break-word">删除操作不可恢复，请确认是否删除 <span style="color:#FF4949">{{deleteEntryName}}</span> ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="doDeleteEntry" :disabled="deleteLoading">确定</el-button>
        <el-button @click="deleteDlgVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="设置显示的列" v-model="tableSettingVisible" size="tiny">
      <el-checkbox-group v-model="tableFieldsDisplayList">
        <el-checkbox :label="field.label" v-for="field in tableFields"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTableSetting">确定</el-button>
        <el-button @click="tableSettingVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  h2
    font-size 20px
    color #1f2d3d

  .pagination
    margin 0 auto
    margin-top 20px
    text-align center

  .el-breadcrumb
    font-size 14px

  .text-center
    text-align center

  .box-card
    border 1px solid #dce0ed
    border-radius 4px
    transition .2s
    width 100%
    padding 30px
    margin-bottom 30px
    .box-form
      max-width 600px

  .el-checkbox
    width 150px
    margin-left 15px

  .table-button
    width 100%
    text-align center
</style>

<script>
  import Utils from '../utils/index'

  export default {
    components: {},
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      baseComponentUri: {
        type: String,
        required: true
      },
      displayAddButton: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      tableRowClassMap: {
        type: Object,
        default: function () {
          return {}
        }
      },
      customTableButton: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 编辑按钮，需要带上的额外参数，参数的值来自 formData
      extraEditFormParams: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 是否自定义表格的列
      customTableColumn: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      breadcrumbVisible: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      formRedirectUri: {
        type: String,
        default: function () {
          return this.baseComponentUri
        }
      },
      beforeFormPost: {
        type: Function,
        default: function () {
          return undefined
        }
      },
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      formLabelWidth: {
        type: Number,
        default: function () {
          return 120
        }
      },
      pageSize: {
        type: Number,
        default: function () {
          return 10
        }
      },
      customTable: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      disableEditForm: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      nameKey: {
        type: String,
        default: function () {
          return 'name'
        }
      },
      tableActionWidth: {
        type: Number,
        default: function () {
          return 80
        }
      },
      tableFields: {
        type: Array,
        default: function () {
          return []
        }
      },
      extraPostData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      getEntryCallback: {
        type: Function
      },
      onLoadPageListCallback: {
        type: Function
      },
      onInitCallback: {
        type: Function,
        default: function () {
          return undefined
        }
      },
      onFormCreateSuccessCallback: {
        type: Function,
        default: function () {
          return undefined
        }
      },
      formDataBak: {
        type: Object,
        default: function () {
          return {}
        }
      },
      formRequiredFields: {
        type: Array,
        default: function () {
          return []
        }
      },
      formRules: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        hasInit: false,
        currentPageName: '',
//        extraPostDataBak: {},
        searchList: {},
        currentPage: 0,
        tableSettingVisible: false,
        queryParams: {
          title: undefined,
          redirectUri: undefined,
          displayAddButton: undefined
        },
        editEntryVisible: true,
        deleteDlgVisible: false,
        deleteLoading: false,
        createUpdateLoading: false,
        total: 0,
        loading: false,
        formLoading: false,
        tableData: [],
        action: '',
        displayTableFields: [],
        tableFieldsDisplayList: [],
        tableFieldsDict: {},
        editEntryId: null,
        editEntryName: '',
        deleteEntryIndex: null,
        deleteEntryName: '',
        formData: {},
        formErrors: {}
      }
    },
    mounted () {
      this.$eventHub.$emit('change-title', this.title);
      let self = this;
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中
        self.init();
      });
    },
    created () {
      this.$eventHub.$on('update-form-value', this.updateFormValue);
      this.displayTableFields = this.$utils.copy(this.tableFields);
      let self = this;
      this.tableFields.forEach(function (item, index) {
        self.tableFieldsDict[item.label] = item;
      });
    },
    computed: {
      redirectUri () {
        if (this.queryParams.redirectUri !== undefined) {
          return this.queryParams.redirectUri;
        } else {
          return this.formRedirectUri;
        }
      },
      navTitle () {
        if (this.queryParams.title !== undefined) {
          return this.queryParams.title;
        } else {
          return this.title;
        }
      },
      addButtonVisible () {
        if (this.queryParams.displayAddButton !== undefined) {
          return this.queryParams.displayAddButton === '1';
        } else {
          return this.displayAddButton;
        }
      }
    },
    methods: {
      tableRowClassName(row, index) {
        let key = this.tableRowClassMap['key'];
        let map = this.tableRowClassMap['map'];

        if (key !== undefined && map !== undefined) {
          for (let i = 0; i < map.length; i++) {
            let item = map[i];
            if (row[key] === item['value']) {
              return item['class_name'];
            }
          }
        }

        return '';
      },
      serverFormCheck (rule, value, callback) {
        // 表单校验, 根据服务端返回的错误来显示
        let field = rule.field;
        let fieldData = this.formErrors[field];
        if (fieldData !== undefined && fieldData['has_error']) {
          callback(new Error(fieldData['errors']));
        } else {
          callback();
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
//        this.$route.query['page'] = val;
        this.loadPageList(val);
//        let query = this.$route.query;
//        let path = this.$route.path;
//
//        query['page'] = val;
//        let route = {
//          path: path,
//          query: query
//        };
//        console.log(route);
//        this.$router.go(route);
      },
      init () {
        // TODO 组件没有销毁, 又重新载入的情况下, 需要重新初始化数据

        if (!this.hasInit) {
          let rule = {
            required: true, message: '这是必填项', trigger: 'blur'
          };
          let self = this;
          this.formRequiredFields.forEach(function (name, index) {
            if (self.formRules[name] === undefined) {
              self.formRules[name] = [rule];
            } else {
              self.formRules[name].push(rule);
            }
          });

          // 自动添加服务端校验的错误显示
          for (let name in this.formDataBak) {
            if (this.formDataBak.hasOwnProperty(name)) {
              let r = {
                validator: this.serverFormCheck,
                trigger: 'blur'
              };

              if (this.formRules[name] === undefined) {
                this.formRules[name] = [];
              }

              this.formRules[name].push(r)
            }
          }
//          for (let name in this.formRules) {
//            if (this.formRules.hasOwnProperty(name)) {
//              this.formRules[name].push({
//                validator: this.serverFormCheck,
//                trigger: 'blur'
//              })
//            }
//          }
        } else {

        }

        this.queryParams.displayAddButton = this.$route.query['displayAddButton'];

        let page = this.$route.query['page'];
        if (page === undefined) {
          page = 1;
        } else {
          page = parseInt(page);
        }

        try {
          let extraPostData = this.$route.query['extraPostData'];
          if (extraPostData !== undefined) {
            extraPostData = JSON.parse(decodeURIComponent(extraPostData));

            // 从query查询中获取
            for (let name in extraPostData) {
              if (extraPostData.hasOwnProperty(name)) {
                this.extraPostData[name] = extraPostData[name];
              }
            }
          }
        } catch (e) {

        }

        let redirectUri = this.$route.query['redirectUri'];
        if (redirectUri !== undefined) {
          this.queryParams.redirectUri = decodeURIComponent(redirectUri);
        } else {
          this.queryParams.redirectUri = undefined;
        }

        let title = this.$route.query['title'];
        if (title !== undefined) {
          this.queryParams.title = decodeURIComponent(title);
          console.log(this.queryParams.title);
          this.$eventHub.$emit('change-title', title);
        } else {
          this.queryParams.title = undefined;
        }

        // 不显示编辑表单
        if (this.disableEditForm) {
          this.editEntryVisible = false;
          this.tableData = [];
          this.currentPage = page;
          this.total = 0;
          this.loadPageList(this.currentPage);
          this.getTotal();
        } else {
          this.formData = this.$utils.copy(this.formDataBak);
          this.action = this.$route.query['action'];
          if (this.action === 'create') {
            this.editEntryVisible = true;
            this.currentPageName = '新建';
            // url 参数中传一些表单的默认值
            let tmpFormData = this.$route.query['formData'];
            if (tmpFormData !== undefined) {
              try {
                tmpFormData = JSON.parse(decodeURIComponent(tmpFormData));
                for (let name in tmpFormData) {
                  if (tmpFormData.hasOwnProperty(name)) {
                    this.formData[name] = tmpFormData[name];
                  }
                }
              } catch (e) {

              }
            }

            console.log(this.formData);

          } else if (this.action === 'update') {
            this.editEntryId = this.$route.query['entryId'];
            this.editEntryName = decodeURIComponent(this.$route.query['entryName']);
            this.currentPageName = this.editEntryName;
            this.editEntryVisible = true;
            this.getEntry(this.editEntryId);
          } else {
            this.editEntryVisible = false;
            this.tableData = [];
            this.currentPage = page;
            this.total = 0;
            this.loadPageList(this.currentPage);
            this.getTotal();
          }
        }

        this.hasInit = true;
        if (this.onInitCallback) {
          this.onInitCallback();
        }
      },
      createEntry () {
        let extraPostData = JSON.stringify(this.extraPostData);
        let route = {
          path: this.baseComponentUri,
          query: {
            action: 'create',
            extraPostData: extraPostData,
            redirectUri: this.$route.fullPath
          }
        };
        // url 参数中传一些表单的默认值
        let tmpFormData = this.$route.query['formData'];
        if (tmpFormData !== undefined) {
          route.query['formData'] = tmpFormData;
        }

        let title = this.$route.query['title'];
        if (title !== undefined) {
          route.query['title'] = title;
        }

        this.$router.push(route);
      },
      editEntry (index, items) {
        let entryId = items[index]['id'];
        let name = items[index][this.nameKey];
        if (name === undefined) {
          name = items[index]['id'];
        }
        let entryName = name;

//        this.$route.query['page'] = this.currentPage;
//        console.log(this.$route.hash);
//        console.log(this.$route.path);
//        console.log(this.$route.query);
//        let queryStr = '';
//        for (let k in this.$route.query) {
//          if (this.$route.query.hasOwnProperty(k)) {
//            queryStr += k + '=' + this.$route.query[k] + '&'
//          }
//        }
        let fullPath = this.$route.fullPath;
        if (fullPath.indexOf('page=') <= 0) {
          if (fullPath.indexOf('?') > 0) {
            fullPath += `&page=${this.currentPage}`
          } else {
            fullPath += `?page=${this.currentPage}`
          }
        }

//        console.log(redirectUri);
        let route = {
          path: this.baseComponentUri,
          query: {
            action: 'update',
            entryId: entryId,
            entryName: entryName,
            redirectUri: fullPath
          }
        };

        if (this.extraEditFormParams !== undefined) {
          for (let field in this.extraEditFormParams) {
            if (this.extraEditFormParams.hasOwnProperty(field)) {
              route.query[field] = this.formData[this.extraEditFormParams[field]];
            }
          }
        }
        console.log(this.extraEditFormParams);

        this.$router.push(route);
      },
      deleteEntry (index, items) {
        this.deleteEntryName = items[index]['name'];
        this.deleteDlgVisible = true;
        this.deleteEntryIndex = index;
      },
      doDeleteEntry () {
        this.deleteLoading = true;
        let self = this;
        let entry = self.tableData[self.deleteEntryIndex];
        let url = self.apiUrl + 'delete/';
        let postData = {
          'entry_id': entry['id']
        };
        self.$utils.extendDict(postData, self.extraPostData);
        this.$http.post(url, postData, function (data) {
          self.$eventHub.$emit('show-success-msg', '删除成功');
          self.deleteDlgVisible = false;
          self.tableData.splice(self.deleteEntryIndex, 1);
          self.total -= 1;
          if (self.total <= 0) {
            self.total = 0;
          }
          self.deleteLoading = false;
        }, function (data) {
          self.$eventHub.$emit('show-error-msg', data['msg']);
          self.deleteLoading = false;
        }, self);
      },
      onFormCreate(shouldContinue) {
        this.createUpdateLoading = true;
        let self = this;
        this.formErrors = {};
        this.$refs.form.validate(function (valid) {
          console.log(valid);
          if (valid) {
            let url = self.apiUrl + 'create/';
            let postData = self.$utils.copy(self.formData);
            self.$utils.extendDict(postData, self.extraPostData);

            if (self.beforeFormPost !== undefined) {
              self.beforeFormPost(url, postData)
            }

            self.$http.post(url, postData, function (data) {
              self.$utils.extendDict(self.formData, data['data']);
              self.$eventHub.$emit('show-success-msg', '创建成功');
              if (shouldContinue) {
                self.$refs.form.resetFields();
                self.formData = self.$utils.copy(self.formDataBak);
              } else {
                self.action = 'update';
                self.editEntryId = self.formData['id'];
                console.log(self.formData);
                let entryName = self.formData['name'];
                if (entryName === undefined || entryName === '') {
                  entryName = self.formData['id'];
                }
                if (entryName === undefined || entryName === '') {
                  entryName = '更新';
                }
                self.currentPageName = entryName;
              }

              self.createUpdateLoading = false;

              if (self.onFormCreateSuccessCallback !== undefined) {
                self.onFormCreateSuccessCallback(self.formData, data['data']);
              }
            }, function (data) {
              self.formErrors = data['data'];
              self.$refs.form.validate();
              self.$eventHub.$emit('show-error-msg', '提交的数据格式不正确');
              self.createUpdateLoading = false;
            }, self);
          } else {
            self.$eventHub.$emit('show-error-msg', '提交的数据格式不正确');
            self.createUpdateLoading = false;
            return false;
          }
        });
      },
      onFormUpdate() {
        this.createUpdateLoading = true;
        let self = this;
        this.formErrors = {};
        this.$refs.form.validate((valid) => {
          console.log(valid);
          if (valid) {
            let url = self.apiUrl + 'update/';
            let postData = self.$utils.copy(self.formData);
            postData['entry_id'] = self.editEntryId;
            self.$utils.extendDict(postData, self.extraPostData);
            console.log(self.beforeFormPost)
            if (self.beforeFormPost !== undefined) {
              self.beforeFormPost(url, postData)
            }
            this.$http.post(url, postData, function (data) {
              self.$eventHub.$emit('show-success-msg', '保存成功');
              self.createUpdateLoading = false;
            }, function (data) {
              self.formErrors = data['data'];
              self.$refs.form.validate();
              self.$eventHub.$emit('show-error-msg', '提交的数据格式不正确');
              self.createUpdateLoading = false;
            }, self);
          } else {
            self.$eventHub.$emit('show-error-msg', '提交的数据格式不正确');
            self.createUpdateLoading = false;
            return false;
          }
        });
      },
      onFormCancel() {
        this.$router.push(`${this.redirectUri}`);
      },
      getEntry(entryId) {
        let self = this;
        self.formLoading = true;
        let url = self.apiUrl + 'item/' + entryId + '/';
        let postData = self.$utils.copy(self.formData);
        self.$utils.extendDict(postData, self.extraPostData);
        this.$http.post(url, postData, function (data) {
          self.$utils.extendDict(self.formData, data['data']);
          self.formLoading = false;
          if (self.getEntryCallback !== undefined) {
            self.getEntryCallback(self.formData, data['data']);
          }
        }, function (data) {
          self.$eventHub.$emit('show-error-msg', data['msg']);
          self.formLoading = false;
        }, self);
      },
      getTotal() {
        let url = this.apiUrl + 'total/';
        let self = this;
        let postData = {};
        self.$utils.extendDict(postData, this.extraPostData);
        // 搜索关键字
        self.$utils.extendDict(postData, this.searchList);

        this.$http.post(url, postData, function (data) {
          self.total = data['data'];
        }, function (data) {
          console.log(data);
          self.total = 0;
          self.$eventHub.$emit('show-error-msg', data['msg']);
        }, self);
      },
      loadPageList(pageNum) {
        if (this.loading) {
          return;
        }
        this.loading = true;
        this.currentPage = pageNum;
        let postUrl = this.apiUrl + 'list/';
        let postData = {
          'page_num': pageNum, 'page_size': this.pageSize
        };
        let self = this;

        self.$utils.extendDict(postData, this.extraPostData);
        // 搜索关键字
        self.$utils.extendDict(postData, this.searchList);

        this.$http.post(postUrl, postData, function (data) {
          data['data'].forEach(function (item, index) {
            item['_index'] = (self.currentPage - 1) * self.pageSize + index + 1;
          });
          self.tableData = data['data'];
          // 回调
          if (self.onLoadPageListCallback !== undefined) {
            self.onLoadPageListCallback(self.tableData, data['data']);
          }
          self.loading = false;
        }, function (data) {
          console.log(data);
          self.$eventHub.$emit('show-error-msg', data['msg']);
          self.loading = false;
        }, self);
      },
      goRedirectUri () {
        console.log(`${this.redirectUri}`);
        this.$router.push(`${this.redirectUri}`);
      },
      emitEvent (eventName, ...args) {
        this.$eventHub.$emit(eventName, ...args);
      },
      search () {
//        this.tableData = [];
        this.currentPage = 1;
        this.loadPageList(1);
        this.getTotal();
      },
      showTableSetting() {
        let self = this;
        self.tableFieldsDisplayList = [];
        this.displayTableFields.forEach(function (item, index) {
          self.tableFieldsDisplayList.push(item.label);
        });

        this.tableSettingVisible = true;
      },
      saveTableSetting () {
        let self = this;
        self.displayTableFields = [];
        this.tableFieldsDisplayList.forEach(function (item, index) {
          self.displayTableFields.push(self.tableFieldsDict[item]);
        });
        this.tableSettingVisible = false;
      },
      updateFormValue (fieldName, value) {
        // 子组件,例如在表单中,通知父组件更新数据
        console.log('updateFormValue');
        this.formData[fieldName] = value;
      }
    },
    watch: {
      // 路由改变时会调用
      '$route': function () {
        this.init();
        console.log(this.$route.fullPath);
      }
    }
  }
</script>
