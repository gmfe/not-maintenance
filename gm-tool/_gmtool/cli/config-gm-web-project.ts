import '../service'; // fro pre-resgiter

import { GMToolTaskManager } from '../task/gm-tool-task-manager';
import { ProjectTypes } from '../constants/gm-tool';
import GMToolInputTask from "../task/gm-tool/input-task";


// TODO need to change
export function configGMProject(projectType: ProjectTypes) {
  const services = GMToolInputTask.chooseConfigableServices(projectType);
  GMToolTaskManager.runSyncByService(services);
}

// 这里要亲自获得
const projectType = GMToolInputTask.chooseProjectType();
configGMProject(projectType);