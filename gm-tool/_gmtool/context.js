


const path = require('path');
const projectDir = process.cwd();
const packageJsonPath = path.join(projectDir, 'package.json');
const packageJson = require(packageJsonPath);


const GMTOOL_CONTEXT = {
  projectDir,
  packageJson,
  packageJsonPath
}

module.exports = GMTOOL_CONTEXT;