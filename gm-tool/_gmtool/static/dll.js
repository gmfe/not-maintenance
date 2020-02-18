const fs = require('fs')
const webpackDll = require('./webpack.config.dll');
const { shellExec, getDllVersionHash } = require('../utils/project-util');

const env = process.env.NODE_ENV

let dllFileName = null
let dllVersionHash = getDllVersionHash(webpackDll.entry.dll, require('./package.json'))

// 检查 dll 是否构建过
if (fs.existsSync('./build/dll/dll.version.json')) {
  const { hash } = require('./build/dll/dll.version.json')

  if (hash === dllVersionHash) {
    const fileNames = fs.readdirSync('./build/dll/')
    dllFileName = fileNames.find(fileName => fileName.endsWith(`${hash}.dll.bundle.js`))
  }
}

if (dllFileName) {
  console.log(`${dllFileName} exist...`)
} else {
  console.log(`dll file not exist...`)

  shellExec('rm -rf build/dll')

  shellExec('mkdir -p build/dll')

  fs.writeFileSync('./build/dll/dll.version.json', JSON.stringify({ hash: dllVersionHash }))

  shellExec(`NODE_ENV=${env} webpack --config webpack.config.dll.js`)
}
