

import { task } from 'gulp';

import GMToolCliLineUtil from '../../utils/cli-line-tool';

import * as path from 'path';
const fs = require('fs');
const fse = require('fs-extra');
const cwd = process.cwd();
const watch = require('gulp-watch');
const compileTs = require('../../utils/compile-ts');

const getTargetPath = (task: string) => {
  let targetPath = '';
  const runContext = require('../../cli/run');
  const args = runContext.RUN_ARGV_CONTEXT.args;
  targetPath = args && args[task] && args[task].targetPath;
  if (!targetPath) {
    GMToolCliLineUtil.printWarning(`不存在指定路径`)
    process.exit(0);
  }
  if (!fs.existsSync(targetPath)) {
    GMToolCliLineUtil.printWarning(`指定路径目录不存在: ${targetPath}`)
    process.exit(0);
  }
  return targetPath;
}


task('watch-js-dev', () => {

  watch(['src/**/*.*'], (f: any) => {
    const targetPath = getTargetPath('watch-js-dev');
    if (!targetPath) return;
    if (f.event === 'unlink') {
      const fileToDelete = f.path.replace(/\.jsx$/, '.js');
      if (fs.existsSync(fileToDelete)) {
        fs.unlinkSync(fileToDelete);
      }
      return;
    }
    const myPath = path.relative(cwd, f.path);
    console.log(`[gm-tool-watch]: ${myPath} ${f.event}`);
    fse.ensureFileSync(path.join(targetPath, myPath));
    fs.copyFile(f.path, path.join(targetPath, myPath), () => {
      console.log(`[gm-tool-watch]: 已更新${myPath}至 目标`);
    });
  });
});


task('watch-ts-dev', () => {
  watch(['src/**/*.*'], (f: any) => {

    const targetPath = getTargetPath('watch-ts-dev');
    if (!targetPath) return;

    // this is not oK
    if (f.event === 'unlink') {
      const fileToDelete = f.path.replace(/\.tsx?$/, '.js');
      if (fs.existsSync(fileToDelete)) {
        fs.unlinkSync(fileToDelete);
      }
      return;
    }

    const myPath = path.relative(cwd, f.path);
    const srcObejct: any = {};
    if (myPath.match(/.less$/)) {
      srcObejct.less = [myPath];
    }
    if (myPath.match(/.(ts|tsx)$/)) {
      srcObejct.source = [myPath];
    }
    if (myPath.match(/third-js\/[\s\S].js$/)) {
      srcObejct.thirdjs = [myPath];
    }
    if (myPath.match(/.(png|svg)$/)) {
      srcObejct.asset = [myPath];
    }

    console.log(`[gm-tool-watch]: ${myPath} ${f.event}`);
    console.time('compile total time: ')
    function onFinish() {
      const compiledPath = myPath.replace(/src/, 'lib/src').replace(/.(tsx?|jsx)$/, '.js');
      fse.ensureFileSync(path.join(targetPath, compiledPath));
      setTimeout(() => {
        // 立刻读的并没有写入成功
        fs.copyFile(path.join(cwd, compiledPath), path.join(targetPath, compiledPath), () => {
          console.log(`[gm-tool-watch]: 已更新${compiledPath}至 目标 `);
        });
      }, 300)

    }

    compileTs(
      undefined,
      srcObejct,
      '/components',
      true,
      () => {
        compileTs(undefined, srcObejct, '/story', true, () => {
          onFinish();
          console.timeEnd('compile total time: ');
        })
      }
    );

  
  });
});

