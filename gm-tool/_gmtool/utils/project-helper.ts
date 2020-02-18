

import fse from 'fs-extra';
import * as gulp from 'gulp';
const path = require('path');
const install = require('./gulp-install');
import * as GMTOOL_CONTEXT from '../context';

const cwd = process.cwd();


export default class ProjectHelper {

  public static getProjectPath(...filePath: string[]) {
    return path.join(cwd, ...filePath);
  }


  public static getConfig() {
    const configPath = ProjectHelper.getProjectPath('.gm-tool.config.js');
    if (fse.existsSync(configPath)) {
      return require(configPath);
    }

    return {};
  }

  // 懒得引入 isJson 判断了
  public static writeFile(path: string, fileData: string | JSON, isJson: boolean) {
    const file = isJson ? JSON.stringify(fileData, null, 2) : fileData;
    fse.writeFileSync(path, file);
  }


  public static npmInstall(list: string[], isDev?: boolean) {
    // TODO 判断npm类型

    return new Promise((res) => {
      let validList: string[] = [];
      list.forEach((name: string) => {
        // 已经安装过返回
        if (isDev) {
          if (GMTOOL_CONTEXT.packageJson.devDependencies) {
            if (GMTOOL_CONTEXT.packageJson.devDependencies[name]) {
              return;
            }
          }
        } else {
          if (GMTOOL_CONTEXT.packageJson.dependencies) {
            if (GMTOOL_CONTEXT.packageJson.dependencies[name]) {
              return;
            }
          }
        }

        gulp.task(name, (done: Function) => {
          gulp.src(['./package.json'])
            .pipe(
              install({
                args: [name, isDev ? '--save-dev' : '--save']
              }, () => {
                done();
              })
            );
        });
        validList.push(name);
      });

      if (!validList.length) {
        res();
      } else {
        gulp.task('here', gulp.series(gulp.parallel(...validList), (done: Function) => {
          res();
          done();
        }));
        const taskInstance: any = gulp.task('here');
        taskInstance.apply(gulp);
      }
    })
  }

}
