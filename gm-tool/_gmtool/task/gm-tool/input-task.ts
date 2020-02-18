import GMToolShowInLineTask from './show-inline-task';
import { PROJECT_TYPES } from '../../constants/gm-tool';
import GMToolCliLineUtil from '../../utils/cli-line-tool';
import { PROJECT_CONFIGABLE_SERVICES, ProjectTypes, ProjectConfigableServices } from '../../constants/gm-tool';



export default class GMToolInputTask {

  // ask for project type
  public static chooseProjectType() {
    const projectTypes = PROJECT_TYPES;
    GMToolCliLineUtil.printQuestion('请选择项目类型', projectTypes)
    const choose = GMToolCliLineUtil.loopInput('输入序号选择: ', (input: string) => {
      const choose = input && parseInt(input)
      if (choose && choose > 0 && choose <= projectTypes.length) {
        return { valid: true, result: choose - 1 };
      }
    });
    return projectTypes[choose] as ProjectTypes;
  }

  public static chooseConfigableServices(projectType: ProjectTypes) {

    let services: string[] = [
      `${ProjectConfigableServices.default} [使用默认配置]`,
    ];
    switch(projectType) {
      // 根据项目类型差异化配置
      case ProjectTypes.webApp: {
        services = services.concat(PROJECT_CONFIGABLE_SERVICES);
        break;
      }
      case ProjectTypes.webApp: {
        services = services.concat(PROJECT_CONFIGABLE_SERVICES);
        break;
      }
    }
    GMToolShowInLineTask.configableServices(services);
    const chooseArray = GMToolCliLineUtil.loopInput('输入全部选择的序号: ', (input: string) => {
      if (input) {
        if (input === '1') {
          // 使用全部默认
          const result = new Array(services.length - 1).fill(null).map((_, i) => services[i + 1])
          return { valid: true, result: result  };
        } 
        const numbers = input.split('').map(s => parseInt(s));
        let valid = false;
        numbers.every((input2Num) => {
          valid = input2Num > 0 && input2Num <= services.length;
          return valid;
        });
        if (valid) {
          return { valid: true, result: numbers.map(i => services[i]) };
        }
      }
    });
    return chooseArray;
  }
}