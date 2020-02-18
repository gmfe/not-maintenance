



var chalk = require('chalk')

import * as coreConfig from '../constants'


console.log(chalk.yellow('>>> 【 GM-TOOL INFO】\n'))
Object.entries(coreConfig).forEach(([key, value]) => {
  console.log(chalk.white(`${key} : ${value}\n`))
})

