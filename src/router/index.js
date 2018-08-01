import Vue from 'vue'
import Router from 'vue-router'

import Converter from '@/pages/converter/CommonConverter'
import DigitConverter from '@/pages/converter/DigitConverter'
import WhatEncode from '@/pages/converter/WhatEncode'
import FileConverter from '@/pages/converter/FileConverter'

import MorseCode from '@/pages/crypto/MorseCode'
import CommonCrypto from '@/pages/crypto/CommonCrypto'
import RSA from '@/pages/crypto/RSA'
import AES from '@/pages/crypto/AES'

import Hashed from '@/pages/misc/Hashed'
import Develop from '@/pages/misc/Develop'
import Reverse from '@/pages/misc/Reverse'
import Utility from '@/pages/misc/Utility'

import Repeater from '@/pages/http/Repeater'
import Proxy from '@/pages/http/Proxy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/converter/common', component: Converter
    },
    {
      path: '/converter/digit', component: DigitConverter
    },
    {
      path: '/converter/what-encode', component: WhatEncode
    },
    {
      path: '/converter/file-converter', component: FileConverter
    },
    {
      path: '/http/repeater', component: Repeater
    },
    {
      path: '/http/proxy', component: Proxy
    },
    {
      path: '/misc/hashed', component: Hashed
    },
    {
      path: '/misc/develop', component: Develop
    },
    {
      path: '/misc/utility', component: Utility
    },
    {
      path: '/misc/reverse', component: Reverse
    },
    {
      path: '/crypto/morse', component: MorseCode
    },
    {
      path: '/crypto/common', component: CommonCrypto
    },
    {
      path: '/crypto/rsa', component: RSA
    },
    {
      path: '/crypto/aes', component: AES
    },
    {
      path: '*', redirect: '/converter/common'
    }
  ]
})
