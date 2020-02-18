

import * as path from 'path';
const findIndex  = require('lodash/findIndex');
import { runGulpTask } from '../gulp-task/run';
import GMToolCliLineUtil from '../utils/cli-line-tool';

const cwd = process.cwd();

const program = require('commander');
program
.on('--help', () => {
  console.log('  Usage:');
  console.log();
})
.option('-t, --target', 'add target')
.parse(process.argv);


const task = program.args[0];
let args: any = {};
let argv = process.argv.slice(3);

if (!task) {
  program.help();
} else {
  console.log('gm-tool run', task);
  // 暂时用 gulp 流工具
  // GMToolTaskManager.runSyncByService([ task ]);
  switch (task) {
    case 'watch-ts-dev':
    case 'watch-js-dev': {
      let targetPath = '';
      if (argv) {
        if (argv.length >= 2) {
          const ti = findIndex(argv, (ar: string) => ar === '--target');
          if (ti !== undefined) {
            if (argv[ti + 1]) {
              targetPath = path.join(cwd, argv[ti + 1]);
            }
          }
        }
      }
      if (!targetPath) {
        GMToolCliLineUtil.printWarning(`请指定 gm-tool run ${task} --target ...`)
        process.exit(0);
      }
      args[task] = { targetPath }; 
      break;
    }
  }

  runGulpTask(task)
}


export const RUN_ARGV_CONTEXT: any = { args };