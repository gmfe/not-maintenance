
import { LibraryId } from "./service";
import ServiceInstaller from "./service-installer";
import GMToolCliLineUtil from "../utils/cli-line-tool";



type LibraryUrl = string;

export default class GMToolLibraryServiceManager {

  private static _librariesIdMap: Map<string, LibraryUrl> = new Map();
  // latestPath
  private static _librariesNameMap: Map<string, LibraryUrl> = new Map();
  private static _librariesNameVersionsMap: Map<string, string[]> = new Map();

  public static registerLibrary(name: string, version: string, url: string) {
    const id = LibraryId({ name, version });
    this._librariesIdMap.set(id, url);
    this._librariesNameMap.set(name, url);
    let versions = this._librariesNameVersionsMap.get(name) || [];
    versions = versions.concat([ version ]);
    this._librariesNameVersionsMap.set(name, versions);
  }

  public static librariesList(): string[] {
    let list: string[] = [];
    this._librariesNameMap.forEach((_, key) => list.push(key));
    return list;
  }

  public static hasThisNameLibrary(name: string) {
    return this._librariesNameMap.has(name);
  }

  /**
   * 检查是否存在某个版本
   *
   * @static
   * @param {string} name
   * @param {string} version
   * @returns {boolean}
   * @memberof GMToolLibraryManager
   */
  public static hasThisVersionLibrary(name: string, version: string): boolean {
    const versions = this._librariesNameVersionsMap.get(name);
    if (versions && versions.length) {
      return !!versions.find(ver => ver === version);
    }
    return false;
  }

  public static hasLibrary(name: string) {
    return this._librariesIdMap.has(name);
  }

  public static install(inputString: string, options: any) {

    let libName = '';
    let libversion = '';

    if (inputString.indexOf('@') <= 0) {
      libName = inputString;
      const versions = this._librariesNameVersionsMap.get(inputString) || [];
      libversion = versions[versions.length - 1];
    } else {
      const splited = inputString.split('@');
      if (splited.length !== 2) {
        GMToolCliLineUtil.printWarning('输入不合法');
        return;
      }
      libName = splited[0];
      libversion = splited[1];
    }

    // console.log(libName, libName, this._librariesNameMap, this._librariesNameVersionsMap, this._librariesIdMap, options, 'libName libName')
    if (!this.hasThisNameLibrary(libName)) {
      GMToolCliLineUtil.printWarning('不存在该依赖服务');
      return;
    }

    if (!this.hasThisVersionLibrary(libName, libversion)) {
      GMToolCliLineUtil.printWarning('不存在该版本依赖服务');
      return;
    }

    const id = LibraryId({ name: libName, version: libversion });
    const url = this._librariesIdMap.get(id);
    if (!url) {
      // 系统出错
    } else {
      ServiceInstaller.install(url, options);
    }

  }

}