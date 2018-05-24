<template>
  <div id="misc" style="max-width: 750px; margin: 0 auto">
    <el-card class="box-card row-bg">
      <el-form label-width="60px">
        <el-form-item label="UA">
          <el-row type="flex" class="clearfix" :gutter="20">
            <el-col :span="20">
              <el-input v-model="userAgent" size="medium" :readonly="true" class="ua"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button @click="generateUA" size="medium" type="primary">随机</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="时间戳">
          <el-row type="flex" class="clearfix" :gutter="20">
            <el-col :span="8">
              <el-input v-model="time.now" size="medium" :readonly="true"></el-input>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button @click="pause" size="medium" type="primary">{{ time.action }}</el-button>
                <el-button size="medium" v-clipboard:copy="copyData()">复制</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="转换">
          <el-row type="flex" class="clearfix" :gutter="20">
            <el-col :span="8">
              <el-input v-model="transformation.input" size="medium" placeholder="日期或时间戳"></el-input>
            </el-col>
            <el-col :span="16">
              <el-form-item>
                <el-button type="primary" size="medium" @click="toTimestamp">转成时间戳</el-button>
                <el-button type="primary" size="medium" @click="toDate">转成日期</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-input size="medium" v-model="transformation.output"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="随机数">
          <el-row type="flex" class="clearfix" :gutter="20">
            <el-col :span="8">
              <el-input size="medium" v-model="random.range[0]" placeholder="最小值"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input size="medium" v-model="random.range[1]" placeholder="最大值"></el-input>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button @click="generateRandomNumber" type="primary">生成</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-input size="medium" v-model="random.number"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="随机串">
          <el-row type="flex" class="clearfix" :gutter="20">
            <el-col :span="8">
              <el-select size="medium" v-model="random.length" filterable placeholder="长度" @change="generateRandom">
                <el-option
                  v-for="item in 100"
                  :key="item"
                  :label="'长度 '+ item"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button size="medium" @click="generateRandom" type="primary">生成</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="20">
              <el-input size="medium" v-model="random.value"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import RandomUserAgent from 'random-useragent'
  import moment from 'moment'

  let randomBytes = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: ',.;:][{}`~-_)(*^$@!',
    danger_symbol: '\'"\\<>?/=+%&#'
  }

  export default {
    created () {
      this.clock()
      this.t = setInterval(this.clock, 1000)
    },
    data () {
      return {
        t: null,
        time: {
          now: '',
          action: '暂停'
        },
        transformation: {
          input: '',
          output: ''
        },
        userAgent: navigator.userAgent,
        random: {
          value: '',
          length: 12,
          range: [0, 100],
          number: 0
        }
      }
    },
    computed: {},
    methods: {
      copyData () {
        return this.time.now
      },
      pause () {
        if (this.time.action === '开始') {
          this.clock()
          this.t = setInterval(this.clock, 1000)
          this.time.action = '暂停'
        } else {
          clearInterval(this.t)
          this.time.action = '开始'
        }
      },
      clock () {
        this.time.now = moment().unix()
      },
      toTimestamp () {
        this.transformation.output = moment(this.transformation.input).unix()
      },
      toDate () {
        this.transformation.output = moment(parseFloat(`${this.transformation.input}000`)).format()
      },
      generateUA () {
        this.userAgent = RandomUserAgent.getRandom()
      },
      generateRandom () {
        console.log('generateRandom')
//                Math.seedrandom()
        let range = ''
        let result = []
//                for (let sort of this.random.length) {
//                    range += randomBytes[sort]
//                }
        range = randomBytes['upper'] + randomBytes['lower'] + randomBytes['number']
        for (let i = 0; i < this.random.length; i++) {
          result.push(range[Math.round(Math.random() * range.length)])
        }
        this.random.value = result.join('')
      },
      generateRandomNumber () {
//                Math.seedrandom()
        let min = Math.min(parseInt(this.random.range[1]), parseInt(this.random.range[0]))
        let max = Math.max(parseInt(this.random.range[1]), parseInt(this.random.range[0]))
        this.random.number = Math.round(Math.random() * (max - min)) + min
      }
    }
  }
</script>

<style scoped>
  .row-bg {
    margin-bottom: 30px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }
</style>
