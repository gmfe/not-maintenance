import chalk from 'chalk'
import { GMTOOL_CLI_PREFFIX } from '../constants/gm-tool';

const readlineSync = require('readline-sync')

export default class GMToolCliLineUtil {

  public static durationMap: Map<string, [number, number]> = new Map();

  public static printStartProcessLog(serverName: string) {
    console.log(chalk.magenta(`${GMTOOL_CLI_PREFFIX} ${serverName} [启动] `));
    const start = process.hrtime();
    this.durationMap.set(serverName, start);
  }

  public static printEndProcessLog(serverName: string) {
    const start = this.durationMap.get(serverName);
    let duration = 'unknown'
    if (start) {
      const hrDuration = process.hrtime(start);
      duration = `${hrDuration[1] / 1000000}ms`;
      this.durationMap.delete(serverName);
    }
    console.log(chalk.magentaBright(`${GMTOOL_CLI_PREFFIX} ${serverName} [结束] -- ${duration}\n`));

  }

  public static printQuestion(question: string, answers: string[]) {
    console.log(chalk.magenta(`\n|----- ${GMTOOL_CLI_PREFFIX}${question}:  -----|`));
    answers
      .forEach((a, index) => { console.log(chalk.white(`${index + 1}. ${a}`)) })
  }

  public static printWarning(text: string) {
    console.log(chalk.bgRed(`\n|----- ${GMTOOL_CLI_PREFFIX} [warning] ${text}  -----|`));
  }

  public static log(text: string) {
    console.log(chalk.green(`\n|----- ${GMTOOL_CLI_PREFFIX} [log] ${text}:  -----|`));
  }

  public static loopInput(question: string, condition: (i: string) => undefined | { valid: boolean, result: any }): any {
    let result: any;
    loop()
    function loop() {
      const input = readlineSync.question(chalk.yellow(`${question} `))
      const returnback = condition(input)
      if (!(returnback && returnback.valid)) {
        console.log('输入错误，请重新输入');
        loop();
      } else {
        result = returnback.result;
      }
    }
    return result;
  }
}
