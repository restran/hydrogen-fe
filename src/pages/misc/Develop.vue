<template>
<div id="misc">
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
            <el-row type="flex" class="clearfix" justify="center" :gutter="20" align="middle">
                <el-col :span="2">
                    UA
                </el-col>
                <el-col :span="18">
                    <el-input v-model="userAgent" :readonly="true" class="ua"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button @click="generateUA" type="primary" >随机</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="18">
            <el-row type="flex" class="clearfix" justify="start" :gutter="20" align="middle">
                <el-col :span="2">
                    时间戳
                </el-col>
                <el-col :span="22">
                    <el-form label-width="150px" :inline="true">
                        <el-form-item>
                            <el-input v-model="time.now" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="pause" type="primary">{{ time.action }}</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-clipboard:copy="copyData()" >复制</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="18">
            <el-row type="flex" class="clearfix" justify="start" :gutter="20" align="middle">
                <el-col :span="2">
                    转换
                </el-col>
                <el-col :span="22">
                    <el-form ref="form" label-width="150px" :inline="true">
                        <el-form-item>
                            <el-input v-model="transformation.input" placeholder="日期或时间戳"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="toTimestamp">转成时间戳</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="toDate">转成日期</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="transformation.output" style="width:250px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="18">
            <el-row type="flex" class="clearfix" justify="start" :gutter="20" align="middle">
                <el-col :span="2">
                    随机数
                </el-col>
                <el-col :span="22">
                    <el-form ref="form" label-width="150px" :inline="true">
                        <el-form-item>
                            <el-input v-model="random.range[0]" placeholder="最小值"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="random.range[1]" placeholder="最大值"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="generateRandomNumber" type="primary">生成</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="random.number"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="18">
            <el-row type="flex" class="clearfix" justify="start" :gutter="20" align="middle">
                <el-col :span="2">
                    随机串
                </el-col>
                <el-col :span="22">
                    <el-form ref="form" label-width="150px" :inline="true">
                        <el-form-item>
                            <el-select v-model="random.length" placeholder="长度" @change="generateRandom">
                                <el-option
                                        v-for="item in random.choices"
                                        :key="item"
                                        :label="'长度 '+ item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="generateRandom" type="primary">生成</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="random.value" style="width:400px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-col>
    </el-row>


</div>
</template>

<script>
    import RandomUserAgent from "random-useragent"
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
                    action: "暂停"
                },
                transformation: {
                    input: '',
                    output: ''
                },
                userAgent: navigator.userAgent,
                random: {
                    value: '',
                    length: 12,
                    choices: [
                        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
                    ],
                    range: [0,100],
                    number: 0
                },
            }
        },
        computed: {

        },
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
                    this.time.action = "开始"
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
        margin-bottom: 0;
    }
</style>
