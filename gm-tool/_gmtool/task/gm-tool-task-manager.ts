
import { TaskContextInstance } from './task-context';
import GMToolTask, { TaskContext } from "./gm-tool-task";
import GMToolCliLineUtil from '../utils/cli-line-tool';
import { ProjectConfigableServices } from "../constants/gm-tool";

export class GMToolTaskManager {

  private _taskQueue: GMToolTask[] = [];

  private static _serviceTaskMap: Map<string, GMToolTask> = new Map();

  constructor() {
    this._taskQueue = [];
    // register also can put here
  }

  public static isAvailableServiceTask(type: string): boolean {
    return this._serviceTaskMap.has(type);
  }


  public static createServiceTask(type: string, context: any) {
    const service = GMToolTask.createTask(type, context);
    if (service) {
      this._serviceTaskMap.set(type, service);
    }
    return service;
  }

  public runAll() {
    return Promise.all(this._taskQueue.map(task => task.run(TaskContextInstance)));
  }

  public runSyncAll() {
    this._taskQueue.forEach(task => {
      task.runSync(TaskContextInstance);
    });
  }

  public static runSyncByService(services: ProjectConfigableServices[]) {
    services.forEach(servName => {
      const task = this._serviceTaskMap.get(servName);
      if (task) {
        const servtaskName = `${servName} 服务`;
        GMToolCliLineUtil.printStartProcessLog(servtaskName);
        task.runSync(TaskContextInstance);
        GMToolCliLineUtil.printEndProcessLog(servtaskName);
      } else {
        GMToolCliLineUtil.printWarning(`${task} 不支持的任务`);
      }
    });
  }

}