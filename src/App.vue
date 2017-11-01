<template>
  <div id="app">
    <base-header></base-header>
    <div class="main-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-content
    margin 60px 15px 0
</style>

<script>
  import Utils from './utils'
  import BaseHeader from '@/components/BaseHeader'

  export default {
    name: 'app',
    components: {
      BaseHeader
    },
    created: function () {
      this.$eventHub.$on('change-title', this.changeTitle)
      this.$eventHub.$on('show-message', this.showMessage)
      this.$eventHub.$on('show-success-msg', this.showSuccessMsg)
      this.$eventHub.$on('show-error-msg', this.showErrorMsg)
      this.$eventHub.$on('show-warning-msg', this.showWarningMsg)
      this.$eventHub.$on('show-info-msg', this.showInfoMsg)
      this.$eventHub.$on('show-confirm-dlg', this.showConfirmDlg)
    },
    methods: {
      showMessage (type, msg) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        // type 可以使用 success, info, error
        this.$message({
          showClose: true,
          message: msg,
          type: type
        })
      },
      showConfirmDlg (type, msg, confirmCallback, cancelCallback, cancelButton) {
        if (cancelButton === true) {
          let options = {
            confirmButtonText: '确定',
            type: type,
            cancelButtonText: '取消'
          }
          options['cancelButtonText'] = '取消'
          this.$confirm(msg, '提示', options).then(() => {
            if (confirmCallback !== undefined) {
              confirmCallback()
            }
          }).catch(() => {
            if (cancelCallback !== undefined) {
              cancelCallback()
            }
          })
        } else {
          this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if (confirmCallback !== undefined) {
                confirmCallback()
              }
            }
          })
        }
      },
      showSuccessMsg (msg) {
        console.log(msg)
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        // type 可以使用 success, info, error
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
      },
      showErrorMsg (msg) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        // type 可以使用 success, info, error
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      },
      showWarningMsg (msg) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        // type 可以使用 success, info, error
        this.$message({
          showClose: true,
          message: msg,
          type: 'warning'
        })
      },
      showInfoMsg (msg) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        // type 可以使用 success, info, error
        this.$message({
          showClose: true,
          message: msg,
          type: 'info'
        })
      },
      changeTitle (title) {
        if (title !== undefined && title !== '') {
          document.title = title + ' | ' + this.$store.siteName
        }
      }
    },
    watch: {
      // 路由改变时会调用
      '$route': function () {
        // 滚动到最顶部,否则会记住上次的滚动位置
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*z-index 不能超过header，不然加载数据的时候，会有白色罩住 header */
  .el-loading-mask
    z-index 888 !important

  @import 'assets/css/main.styl'
</style>

