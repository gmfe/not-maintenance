import { TaskContext } from '../task/gm-tool-task';
import { TaskContextInstance } from '../task/task-context';
const fs = require('fs');

import '../gulp-task';
const gulp = require('gulp');

addConfigHooks(TaskContextInstance)

function addConfigHooks(context: TaskContext) {
  const cfg = context.packageJson;
  if (!cfg.scripts) {
    cfg.scripts = {};
  }

  let gulpTasks: any = {};
  Object.keys(gulp._registry._tasks).forEach(key => {
    gulpTasks[key] = `gm-tool run ${key}`;
  });
  // 写入一些 scripts
  cfg.scripts = Object.assign(cfg.scripts, {
    'tsc-build': 'gm-tool run tsc-build',
    ...gulpTasks,
  });
  
  // if (cfg.scripts.prepublish) {
  //   cfg.scripts['pre-publish'] = cfg.scripts.prepublish;
  // }
  // cfg.scripts.prepublish = 'gm-tool run guard';

  fs.writeFile(context.packageJsonPath, JSON.stringify(cfg, null, 2));
  return true;
}