

const fs = require('fs');
const path = require('path')
var shell = require('shelljs')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
const files = fs.readdirSync(path.join(process.cwd(), './bin'));
console.log(chalk.magenta(`测试哪一个脚本?:`))
files
  .forEach((a, index) => { console.log(chalk.white(`${index + 1}. ${a}`)) });
const input = readlineSync.question(chalk.yellow(`请输入序号: `));
const indexNumber = input && parseInt(input);
shell.exec(`node bin/${files[indexNumber - 1]}`);