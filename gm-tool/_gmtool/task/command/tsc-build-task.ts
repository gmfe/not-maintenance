import { CommandList } from './list-interface';
import { GMToolTaskManager } from '../gm-tool-task-manager';
import GMToolTask from '../gm-tool-task';

export class TsBuildTask extends GMToolTask {
  constructor(_: any) {
    super();
  }
  public static uniqueType(): string {
    return CommandList.tsBuild;
  }

  public run() {
    return Promise.resolve();
  }

  public runSync() {
    console.log('TsBuildTask runSyncrunSync')
  }
}

GMToolTask.registerTaskFactory(TsBuildTask.uniqueType(), {
  createTask(config: any) {
    return new TsBuildTask(config);
  }
});

GMToolTaskManager.createServiceTask(TsBuildTask.uniqueType(), {})