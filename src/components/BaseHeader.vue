<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-header"
             mode="horizontal" @select="handleSelect">
      <el-submenu :index="item.name" v-for="item in menuList"
                  :key="item.name">
        <template slot="title">{{item.name}}</template>
        <el-menu-item :index="item.name + '-' + x.name"
                      v-for="x in item.children"
                      :key="x.name">{{x.name}}
        </el-menu-item>
      </el-submenu>
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
        menuList: [
          {
            name: '编码转换',
            basePath: '/converter/',
            children: [
              {
                name: '常见编码',
                path: 'common'
              },
              {
                name: '进制转换',
                path: 'digit'
              },
              {
                name: 'WhatEncode',
                path: 'what-encode'
              }
            ]
          },
          {
            name: '密码学',
            basePath: '/crypto/',
            children: [
              {
                name: '常见密码',
                path: 'common'
              },
              {
                name: '摩斯密码',
                path: 'morse'
              },
              {
                name: 'AES工具',
                path: 'aes'
              },
              {
                name: 'RSA工具',
                path: 'rsa'
              }
            ]
          },
                    {
            name: 'HTTP工具',
            basePath: '/http/',
            children: [
              {
                name: 'Repeater',
                path: 'repeater'
              }
            ]
          },
          {
            name: '杂项',
            basePath: '/misc/',
            children: [
              {
                name: '开发工具',
                path: 'develop'
              },
              {
                name: '哈希工具',
                path: 'hashed'
              },
              {
                name: '逆向工具',
                path: 'reverse'
              }
            ]
          }
        ],
        activeIndex: '编码转换-常见编码'
      }
    },
    mounted () {
      let self = this
      this.$nextTick(function () {
        let path = self.$route.path
        this.menuList.forEach(function (item, index) {
          item.children.forEach(function (subItem, i) {
            if (item.basePath + subItem.path === path) {
              self.activeIndex = item.name + '-' + subItem.name
            }
          })
        })
      })
    },
    created () {

    },
    computed: {},
    methods: {
      handleSelect (key, keyPath) {
        console.log(key)
        let self = this
        this.menuList.forEach(function (item, index) {
          item.children.forEach(function (subItem, i) {
            if (item.name + '-' + subItem.name === key) {
              self.$router.push({ path: item.basePath + subItem.path })
            }
          })
        })
      }
    },
    watch: {}
  }
</script>
