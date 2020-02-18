
export interface ITaskFactory {
  createTask(context: any): GMToolTask;
}

export interface TaskContext{
  projectDir: string;
  packageJson: { [key: string]: any };
  packageJsonPath: string;
}

export default abstract class GMToolTask {

  private static _taskFactories: Map<string, ITaskFactory> = new Map();

  public runSync(_: TaskContext): void {}

  public run(_: TaskContext): Promise<any> {
    return Promise.resolve();
  }

  public static registerTaskFactory(type: string, factory: ITaskFactory) {
    if (this._taskFactories.has(type)) {
      throw new Error(`Cannot register task factory for type: ${type}`);
    }
    this._taskFactories.set(type, factory);
  }

  public static createTask(type: string, context: any): GMToolTask | undefined {
    const factory = this._taskFactories.get(type);
    if (factory) {
      return factory.createTask(context);
    }
    return undefined;
  }

  public static isTaskSupported(type: string) {
    return this._taskFactories.has(type);
  }


}