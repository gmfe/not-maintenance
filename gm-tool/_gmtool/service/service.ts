



export interface ServiceInfo {
  name: string;
  version: string;
}


export function LibraryId(info: ServiceInfo) {
  return `${info.name}@${info.version}`;
}


export default abstract class GMService {

  // name is same with Function.name
  public static _name: string;
  public static version: string;

  public static dependencies: string[] = [];
  public static devDependencies: string[] = [];

  public static beforeInstall: () => void;

  public static afterInstall: () => void;

  public static readme () {
    return `${this._name}@${this.version}`;
  }

}