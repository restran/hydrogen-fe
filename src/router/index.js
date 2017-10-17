import Vue from 'vue'
import Router from 'vue-router'

import Converter from '@/pages/Converter'
import DigitConverter from '@/pages/DigitConverter'
import MorseCode from '@/pages/crypto/MorseCode'
import CommonCrypto from '@/pages/crypto/CommonCrypto'
import Hashed from '@/pages/Hashed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/converter', component: Converter
    },
    {
      path: '/digit-converter', component: DigitConverter
    },
    {
      path: '/hashed', component: Hashed
    },
    {
      path: '/crypto-morse-code', component: MorseCode
    },
    {
      path: '/crypto-common', component: CommonCrypto
    },
    {
      path: '*', redirect: '/converter'
    }
  ]
})
