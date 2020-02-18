

import '../gulp-task';
const gulp = require('gulp');

import GMToolCliLineUtil from '../utils/cli-line-tool';
import { runGulpTask } from '../gulp-task/run';

let gulpTasks: string[] = [];
Object.keys(gulp._registry._tasks).forEach(key => {
  gulpTasks.push(`${key}`);
});

GMToolCliLineUtil.printQuestion('可执行的命令', gulpTasks);
GMToolCliLineUtil.loopInput('可输入序号执行: ', (input: string) => {
  if (input) {
    const indexNumber = input && parseInt(input);
    if (indexNumber && indexNumber >= 0 && indexNumber <= gulpTasks.length) {
      runGulpTask(gulpTasks[indexNumber - 1])
      return { valid: true, result: indexNumber - 1 }
    }
  }
});

