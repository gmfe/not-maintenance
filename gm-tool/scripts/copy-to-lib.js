const fs = require('fs-extra');
const path = require('path')

fs.ensureDirSync(path.join(__dirname, '../lib/service/market'));

const marketPath = path.join(__dirname, '../_gmtool/service/market');
let files = fs.readdirSync(marketPath).map(a => path.join(marketPath, a));

let targets = [];
while (files.length) {
  let current = files.pop();
  if (fs.lstatSync(current).isDirectory()) {
    const splited = current.split('/');
    if (splited && splited.length && splited[splited.length - 1] === '_project') {
      targets.push(current);
    } else {
      const childs = fs.readdirSync(current).map(a => path.join(current, a));
      files = files.concat(childs);
    }
  }
}

const normalTarges = [
  path.join(__dirname, '../_gmtool/static'),
]

normalTarges.forEach(tpath => {
  let files = fs.readdirSync(tpath).map(f => path.join(tpath, f));
  files.forEach(f => targets.push(f));
});

// console.log(targets, 'targetstargets')

targets.forEach(from => {
  const pathRelative = path.relative(from, path.join(__dirname, '..'));
  const pathRelative2 = path.relative(path.join(__dirname, '../_gmtool'), from );
  const to = path.join(from, pathRelative, './lib', pathRelative2)
  fs.copySync(from, to)
})