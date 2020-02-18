
import * as fs from 'fs';
import * as path from 'path';
import * as GMTOOL_CONTEXT from '../context';
import * as deepmerge from 'deepmerge'
import GMToolCliLineUtil from '../utils/cli-line-tool';
import ProjectHelper from '../utils/project-helper';
import * as fse from 'fs-extra';

// 放在此文件夹下的配置文件会被放入 [目标项目] 下的根路径
// install 的时候
// 如果项目不存在对应的配置文件，则会增加
// 若果项目已存在对应的配置文件，将不会覆盖和修改 (install -f)
// package.json 此文件的配置会与目标配置进行合并


export default class ServiceInstaller {


  // 未来可以配置部署在服务器上而非本地
  public static install(url: string, options: any) {

    const lib = require(path.join(url, 'index.js')).default;
    const name = lib._name;
    const version = lib.version;
    // 打印相关信息
    // lib.beforeInstall
    let gmtoolLockJson: any = undefined;
    const lockJsonPath = path.join(GMTOOL_CONTEXT.projectDir, 'gmtool-lock.json');
    if (fs.existsSync(lockJsonPath)) {
      gmtoolLockJson = require(lockJsonPath);
    }

    const _projectPath = path.join(url, '_project');
    const files = fs.readdirSync(_projectPath);
    GMToolCliLineUtil.log(`开始安装: ${lib._name}@${lib.version}`);
    if (options.force) {
      GMToolCliLineUtil.printWarning(`使用的是强制覆盖模式`);
    }
    
    if (lib.beforeInstall) {
      lib.beforeInstall();
    }

    // console.log(files, 'filesfiles')
    // 如果写文件/复制文件产生了性能瓶颈之后放到promise中
    files.forEach((file: string) => {

      // 文件夹递归拷贝
      const isDirectory = fs.lstatSync(path.join(_projectPath, file)).isDirectory();
      if (isDirectory) {
        fse.copySync(path.join(_projectPath, file), GMTOOL_CONTEXT.projectDir);
        return;
      }

      const fileSplited = file.split('.');
      const hasMap = fileSplited && fileSplited[fileSplited.length - 1] === 'map';
      if (
        hasMap ||
        file === 'index.js'
      ) {
        return;
      }

      if (file === 'package.json') {
        const projectPackageJson = require(GMTOOL_CONTEXT.packageJsonPath);
        const packageConfig = require(path.join(_projectPath, 'package.json'));
        const newJson = deepmerge(projectPackageJson, packageConfig);
        fs.writeFileSync(GMTOOL_CONTEXT.packageJsonPath, JSON.stringify(newJson, null, 2));
        GMToolCliLineUtil.log(`更新了package.json`);
        return;
      }


      // 一些.开头特殊文件使用了_进行替代
      const replaceDotFile = file.replace(/^\_/, '.');
      const filePath = path.join(GMTOOL_CONTEXT.projectDir, replaceDotFile);
      let needUpdate = false;
      if (!options.force) {
        const isExist = fs.existsSync(filePath);
        // 非强制情况下，版本变更或者不存在配置目标均复制替换文件
        let installedSameVersion = false;
        if (gmtoolLockJson !== undefined) {
          const installed = gmtoolLockJson[name];
          installedSameVersion = !!(installed && installed.version === version);
        }
        if (!isExist || !installedSameVersion) {
          needUpdate = true;
        }
      } else {
        needUpdate = true;
      }

      if (needUpdate) {
        fs.copyFileSync(path.join(_projectPath, file), replaceDotFile);
        GMToolCliLineUtil.log(`更新了${replaceDotFile}`);
      } else {
        GMToolCliLineUtil.log(`[tips]: gmtool的${replaceDotFile}不覆盖项目中的${replaceDotFile} `);
      }

      const lockJson = Object.assign(gmtoolLockJson || {}, {
        [name]: { version }
      });
      if (gmtoolLockJson === undefined || JSON.stringify(gmtoolLockJson, null, 2) !== JSON.stringify(lockJson, null, 2)) {
        fs.writeFileSync(lockJsonPath, JSON.stringify(lockJson, null, 2));
        GMToolCliLineUtil.log(`更新了gmtool-lock.json`);
      }
    });


    const queue = [];
    if (lib.dependencies && lib.dependencies.length) {
      GMToolCliLineUtil.printQuestion('将安装以下dependencies', lib.dependencies);
      queue.push(
        ProjectHelper.npmInstall(lib.dependencies, false),
      )
    }

    if (lib.devDependencies && lib.devDependencies.length) {
      GMToolCliLineUtil.printQuestion('将安装以下dependencies', lib.devDependencies);
      queue.push(
        ProjectHelper.npmInstall(lib.devDependencies, true),
      )
    }

    function endInstall() {
      GMToolCliLineUtil.log(`结束安装: ${lib._name}@${lib.version}`);
      if (lib.afterInstall) {
        lib.afterInstall();
      }
    }


    if (!queue.length) {
      endInstall();
      process.exit(0);
      return;
    }

    const timeout = new Promise((res) => setTimeout(() => res('timeout'), 3 * 60 * 1000));
    Promise.race([
      Promise.all(queue).then(() => endInstall()),
      timeout,
    ]).then(d => {
      if (d === 'timeout') {
        GMToolCliLineUtil.printWarning('安装超时，请自己重试 npm i');
      } else {
        process.exit(0);
      }
    });
  }


}