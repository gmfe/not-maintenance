import '../service'; // fro pre-resgiter

// import { GMToolTaskManager } from './../task/gm-tool-task-manager';
import GMToolInputTask from "../task/gm-tool/input-task";
import { configGMProject } from './config-gm-web-project';

// 询问项目类型
// 显示能力列表
// 输入能力列表
// 执行任务队列

const projectType = GMToolInputTask.chooseProjectType();


function createProject() {
  configGMProject(projectType)
}

createProject()


