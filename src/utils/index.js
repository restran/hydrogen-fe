/**
 * created by restran on 2016/07/10.
 */

import Vue from 'vue'
import axios from 'axios'

let exports = {}

exports.validator = {
  numberValidator: function (rule, value, callback) {
    if (isNaN(value)) {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  }
}

// https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换
// $emit 无法跨多层父子组件通信, 事件只能传给直接的父组件
// 因此需要一个单独的事件中心管理组件间的通信
exports.eventHub = new Vue()

exports.getCookie = function (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return undefined
}

exports.getUrlParam = function (inputUrl, name, default_value) {
  //构造一个含有目标参数的正则表达式对象
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = inputUrl.match(reg)  //匹配目标参数
  console.log(r)
  if (r !== null) return unescape(r[2])
  if (default_value === undefined) {
    default_value = null
  }
  return default_value //返回参数值
}

exports.extendDict = function (old_dict, add_dict) {
  for (let key in add_dict) {
    if (add_dict.hasOwnProperty(key)) {
      old_dict[key] = add_dict[key]
    }
  }

  return old_dict
}

exports.copy = function (objects) {
  return JSON.parse(JSON.stringify(objects))
}

exports.formatNumber = function (num, nAfterDot) {
  let srcStr
  let resultStr, nTen
  srcStr = '' + num + ''
  let strLen = srcStr.length
  let dotPos = srcStr.indexOf('.', 0)
  let i, j
  if (dotPos === -1) {
    resultStr = srcStr + '.'
    for (i = 0; i < nAfterDot; i++) {
      resultStr = resultStr + '0'
    }
  } else {
    if ((strLen - dotPos - 1) >= nAfterDot) {
      let nAfter = dotPos + nAfterDot + 1
      nTen = 1
      for (j = 0; j < nAfterDot; j++) {
        nTen = nTen * 10
      }
      resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen
    } else {
      resultStr = srcStr
      for (i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
        resultStr = resultStr + '0'
      }
    }
  }
  return resultStr
}

exports.dateFormat = function (date, formatStr) {
  let str = formatStr
  let week = ['日', '一', '二', '三', '四', '五', '六']
  let month = date.getMonth() + 1

  str = str.replace(/yyyy|YYYY/, date.getFullYear())
  str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ?
    (date.getYear() % 100).toString() :
    '0' + (date.getYear() % 100))

  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month)
  str = str.replace(/M/g, month)

  str = str.replace(/w|W/g, week[date.getDay()])

  str = str.replace(/dd|DD/,
    date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
  str = str.replace(/d|D/g, date.getDate())

  str = str.replace(/hh|HH/,
    date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
  str = str.replace(/h|H/g, date.getHours())
  str = str.replace(/mm/, date.getMinutes() > 9 ?
    date.getMinutes().toString() :
    '0' + date.getMinutes())
  str = str.replace(/m/g, date.getMinutes())

  str = str.replace(/ss|SS/, date.getSeconds() > 9 ?
    date.getSeconds().toString() :
    '0' + date.getSeconds())
  str = str.replace(/s|S/g, date.getSeconds())

  return str
}

exports.hex2Dec = function (value) {
  try {
    value = parseInt(value, 16)
  } catch (e) {
  }

  return value
}

exports.dec2hex = function (value) {
  return value.toString(16).toUpperCase()
}

exports.formatStrLength = function (
  value, length, padding = '0', paddingDirection = 'prefix') {
  value = value + ''

  if (value.length < length) {
    let diffLength = length - value.length
    for (let i = 0; i < (diffLength); i++) {
      if (paddingDirection === 'prefix') {
        value = padding + value
      } else {
        value = value + padding
      }
    }
  }
  return value
}

import http from './src/http'
import utf7 from './src/utf7'

exports.http = http
exports.utf7 = utf7

export default exports
