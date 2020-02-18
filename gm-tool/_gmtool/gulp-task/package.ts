


import { task } from 'gulp';
const { shellExec } = require('../utils/project-util');

// gmtool run gm-npmv
// this is for test
task('fix-package-lock', () => {
  shellExec('npm cache clean --force');
  shellExec('git checkout package-lock.json && rm -rf node_modules && npm i --prefer-online');
});



