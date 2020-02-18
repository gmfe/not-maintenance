


import { task } from 'gulp';
const { shellExec } = require('../../utils/project-util');


const runDllStr = 'node ./node_modules/gm-tool/lib/static/dll.js';
const runDll = (env: string) =>  shellExec(`NODE_ENV=${env} ${runDllStr}`)
// 移除 build 目录 dll 除外的其他文件
const removeBuildExcludeDll = () => shellExec('cd ./build; rm -rf `ls | egrep -v dll`; cd ..');

// gmtool run gm-npmv
// this is for test
task('gm-npmv', () => {
  shellExec('npm -v')
});

// gmtool run gm-depoly
task('gm-deploy', () => {
  runDll('production')
  removeBuildExcludeDll()
  shellExec('NODE_ENV=production webpack -p --color')
});


// gmtool run gm-monitor
task('gm-monitor', () => {
  runDll('development')
  removeBuildExcludeDll()
  shellExec('NODE_ENV=development webpack-dev-server --config webpack.config.monitor.js')
});

// gmtool run gm-testing
task('gm-testing', () => {
  runDll('production')
  removeBuildExcludeDll()
  shellExec('NODE_ENV=production webpack -p --color')
});


// gmtool run gm-start
task('gm-start', () => {
  runDll('development')
  removeBuildExcludeDll()
  shellExec('NODE_ENV=development webpack-dev-server --color')
});

// gmtool run gm-start
task('gm-start', () => {
  runDll('development')
  removeBuildExcludeDll()
  shellExec('NODE_ENV=development webpack-dev-server --color')
});
