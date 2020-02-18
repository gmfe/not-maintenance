const fs = require('fs');
const path = require('path');
const cliConfigs = require('../_gmtool/cli.config');

// 是否覆盖
let ISCOVER = false;

const clis = cliConfigs.reduce((p, c) => p.concat(c.children), [])

const cliDir = path.join(__dirname, '../_gmtool/cli');
const binDir = path.join(__dirname, '../bin');

const historyBinFilesMap = new Map();
fs.readdirSync(binDir).filter(a => {
  // ------------------------------------
  return a !== 'gmtool.js';
  // ------------------------------------
}).forEach(a => historyBinFilesMap.set(a, false));
const historyCliFilesMap = new Map();
fs.readdirSync(cliDir).filter(a => {
  // 豁免的文件
  return (
    // ------------------------------------
    a !== 'gmtool.ts' &&
    a !== 'postinstall.ts' &&
    a !== 'run.ts'
    // ------------------------------------
  );
}).forEach(a => historyCliFilesMap.set(a, false));
const historyPackageBinMap = new Map();
const pkgPath = path.join(process.cwd(), 'package.json');
const pkgJson = require(pkgPath);
Object.keys(pkgJson.bin).forEach(key => historyPackageBinMap.set(key, false));
clis.forEach(cli => {

  const binFileName = `gmtool-${cli.name}.js`
  const cliFileName = `${cli.name}.ts`

  createBin(cli.name, binFileName);
  createCli(cli.name, cliFileName);
  historyBinFilesMap.set(binFileName, true);
  historyCliFilesMap.set(cliFileName, true);

  // create pkg bin
  if (!pkgJson.bin) {
    pkgJson.bin = {};
  }
  pkgJson.bin[`GMTOOL-${cli.name}`] = `bin/${binFileName}`;
  pkgJson.bin[`GMTOOL-${cli.abbr}`] = `bin/${binFileName}`;
  historyPackageBinMap.set(`GMTOOL-${cli.name}`, true);
  historyPackageBinMap.set(`GMTOOL-${cli.abbr}`, true);
});

// 移除删除掉的命令
historyBinFilesMap.forEach((value, key) => {
  if (!value) {
    if (fs.existsSync(path.join(binDir, key))) {
      fs.unlinkSync(path.join(binDir, key))
    }
  }
});
historyCliFilesMap.forEach((value, key) => {
  if (!value) {
    if (fs.existsSync(path.join(cliDir, key))) {
      fs.unlinkSync(path.join(cliDir, key))
    }
  }
});
let newBin = {
  'GMTOOL': 'bin/gmtool.js'
}
historyPackageBinMap.forEach((value, key) => {
  if (value) newBin[key] = pkgJson.bin[key];
});
pkgJson.bin = newBin;
fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));


function createBin(name, fileName) {
  const file = `#!/usr/bin/env node\nrequire('../lib/cli/${name}');`
  const filePath = path.join(__dirname, '../bin', fileName);
  const isExist = fs.existsSync(filePath);
  if (ISCOVER || !isExist) {
    fs.writeFileSync(filePath, file);
  }
}

function createCli(name, fileName) {
  const file = `\n\n`;
  const filePath = path.join(__dirname, '../_gmtool/cli', fileName);
  const isExist = fs.existsSync(filePath);
  if (ISCOVER || !isExist) {
    fs.writeFileSync(filePath, file);
  }
}
