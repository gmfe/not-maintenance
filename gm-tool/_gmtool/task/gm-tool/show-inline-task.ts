import GMToolCliLineUtil from '../../utils/cli-line-tool';

const chalk = require('chalk');

export default class GMToolShowInLineTask {


  public static configableServices(services: string[]) {
    GMToolCliLineUtil.printQuestion(`可配置的能力`, services);
  }

}