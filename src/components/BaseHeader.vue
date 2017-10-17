<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">编码转换</el-menu-item>
      <el-menu-item index="2">进制转换</el-menu-item>
      <el-submenu index="3">
        <template slot="title">密码学</template>
        <el-menu-item index="3-1">常见密码</el-menu-item>
        <el-menu-item index="3-2">摩斯密码</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">哈希工具</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .header {
    height: 60px;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 999;
    position: fixed;
  }

  .header .container {
    height: 100%;
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
  }

  .el-menu--horizontal .el-menu-item, .el-menu--horizontal .el-submenu .el-submenu__title
    border-bottom 3px !important

  .el-menu--horizontal > .el-menu-item:hover,
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
  .el-menu--horizontal > .el-submenu:hover .el-submenu__title
    border-bottom 3px solid #20a0ff !important

  .el-menu--horizontal .el-menu-item, .el-menu--horizontal .el-submenu .el-submenu__title
    height 45px !important
    line-height 45px !important

  .el-menu--horizontal .el-submenu > .el-menu
    top 45px !important
</style>

<script>
  import Utils from '../utils/index'

  export default {
    components: {},
    data () {
      return {
        activeIndex: 'converter'
      }
    },
    mounted () {
      let self = this
      this.$nextTick(function () {
        let path = self.$route.path
        if (path === '/converter') {
          this.activeIndex = '1'
        } else if (path === '/digit-converter') {
          this.activeIndex = '2'
        } else if (path === '/crypto-common') {
          this.activeIndex = '3-1'
        }
        else if (path === '/crypto-morse-code') {
          this.activeIndex = '3-2'
        }
        else if (path === '/hashed') {
          this.activeIndex = '4'
        }
      })
    },
    created () {

    },
    computed: {},
    methods: {
      handleSelect (key, keyPath) {
        if (key === '1') {
          this.$router.push({ path: '/converter' })
        } else if (key === '2') {
          this.$router.push({ path: '/digit-converter' })
        } else if (key === '3-1') {
          this.$router.push({ path: '/crypto-common' })
        } else if (key === '3-2') {
          this.$router.push({ path: '/crypto-morse-code' })
        } else if (key === '4') {
          this.$router.push({ path: '/hashed' })
        }
      }
    },
    watch: {}
  }
</script>
