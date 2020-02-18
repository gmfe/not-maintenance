

const fs = require('fs');
const path = require('path')

const dirPath = path.join(process.cwd(), './_gmtool/service/market');
const files = fs.readdirSync(dirPath);


let output = `\n`;
files.forEach(file => {

  if (fs.lstatSync(path.join(dirPath, file)).isDirectory()) {
    output += `export * from './${file}'\n`;
    return;
  }

});

fs.writeFileSync(path.join(dirPath, 'index.ts'), output);