

import '../service/market';
import GMToolLibraryServiceManager from '../service/service-manager'
import GMToolCliLineUtil from '../utils/cli-line-tool';
const { shellExec } = require('../utils/project-util');

const libList = GMToolLibraryServiceManager.librariesList();
GMToolCliLineUtil.printQuestion('可安装的依赖服务', libList)

GMToolCliLineUtil.loopInput('可输入序号执行: ', (input: string) => {
  if (input) {
    const indexNumber = input && parseInt(input);
    if (indexNumber && indexNumber >= 0 && indexNumber <= libList.length) {
      shellExec(`gmtool i ${libList[indexNumber - 1]}`);
      return { valid: true, result: indexNumber - 1 }
    }
  }
});


