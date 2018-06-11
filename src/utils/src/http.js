/**
 * created by restran on 2017/05/16.
 */

import axios from 'axios'

function parseHttpResponse (response, resolve, reject, loginRedirect) {
  console.log(response.data)
  let rawData = response.data
  // 在一些Android手机的微信中, 会出现没有解析成JSON, 而是仍然为字符串
  // 需要手动解析
  if (typeof rawData === 'string') {
    try {
      rawData = JSON.parse(rawData)
    } catch (e) {
      console.log('error')
      rawData = {
        'data': null,
        'msg': '服务端返回的数据有误',
        'code': 500
      }
    }
  }
  let result = {
    'msg': '请求出错',
    'code': 400,
    'data': null
  }

  try {
    result['data'] = rawData['data']
    result['msg'] = rawData['msg']
    result['code'] = rawData['code']
  } catch (e) {
  }

  if (result['code'] === 200) {
    try {
      resolve(result)
    } catch (e) {
      result['msg'] = '数据处理出现异常'
      reject(result)
    }
  } else {
    // 如果返回 403，没有权限访问，自动跳转到登录页面
    if (result['code'] === 403 ||
      result['code'] === 401 && loginRedirect !== false) {
      console.log('auto login redirect')
      reject(result)
    } else {
      reject(result)
    }
  }
}

function parseHttpError (error, reject) {
  console.log('连接服务器出现问题, 请求失败')
  console.log(error)
  let result = {
    'msg': '连接服务器出现问题, 请求失败',
    'code': 500,
    'data': null
  }
  reject(result)
}

let http = {
  get: function (url, paramsData, loginRedirect = true) {
    setTimeout(function () {
      if (window.Pace !== undefined) {
        window.Pace.restart()
      }
    }, 50)

    return new Promise(function (resolve, reject) {
      console.log(paramsData)
      axios.get(
        url, {
          params: paramsData
        }
      ).then(function (response) {
        parseHttpResponse(response, resolve, reject, loginRedirect)
      }).catch(function (error) {
        parseHttpError(error, reject)
      })
    })
  },
  post: function (url, postData, loginRedirect = true) {
    setTimeout(function () {
      if (window.Pace !== undefined) {
        window.Pace.restart()
      }
    }, 50)

    console.log(postData)
    return new Promise(function (resolve, reject) {
      axios.post(
        url, postData
      ).then(function (response) {
        parseHttpResponse(response, resolve, reject, loginRedirect)
      }).catch(function (error) {
        parseHttpError(error, reject)
      })
    })
  }
}

import base64 from 'crypto-js/enc-base64'
import utf8 from 'crypto-js/enc-utf8'
import latin1 from 'crypto-js/enc-latin1'

http.backendConvert = function (url, data) {
  // if (data['data'] !== undefined) {
  //   data['data'] = base64.stringify(utf8.parse(data['data']))
  // }

  return new Promise(function (resolve, reject) {
    http.post(url, data)
      .then(function (r) {
        // let result
        // let bytes = base64.parse(r['data'])
        // try {
        //   result = utf8.stringify(bytes)
        // } catch (e) {
        //   result = latin1.stringify(bytes)
        // }
        // r['data'] = result
        resolve(r)
      })
      .catch(function (r) {
        reject(r)
      })
  })
}

export default http
