import Vue from 'vue'
import Router from 'vue-router'

import Converter from '@/pages/converter/CommonConverter'
import DigitConverter from '@/pages/converter/DigitConverter'
import WhatEncode from '@/pages/converter/WhatEncode'

import MorseCode from '@/pages/crypto/MorseCode'
import CommonCrypto from '@/pages/crypto/CommonCrypto'
import RSA from '@/pages/crypto/RSA'
import AES from '@/pages/crypto/AES'

import Hashed from '@/pages/misc/Hashed'
import Develop from '@/pages/misc/Develop'
import Reverse from '@/pages/misc/Reverse'

import Repeater from '@/pages/http/Repeater'

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
      path: '/http/repeater', component: Repeater
    },
    {
      path: '/misc/hashed', component: Hashed
    },
    {
      path: '/misc/develop', component: Develop
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
