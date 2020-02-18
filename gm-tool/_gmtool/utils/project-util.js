
const sh = require('shelljs')
const isWindows = require('is-windows');


function getRunCmdEnv() {
  const env = {};
  Object.keys(process.env).forEach(key => {
    env[key] = process.env[key];
  });
  // make sure `kunsam-tools/node_modules/.bin` in the PATH env
  const nodeModulesBinDir = path.join(__dirname, '../../node_modules/.bin');

  Object.entries(env)
    .filter(
      (v) =>
        v
          .slice(0, 1)
          .pop()
          .toLowerCase() === 'path'
    )
    .forEach(v => {
      const key = v.slice(0, 1).pop();
      if (key) {
        env[key] = env[key] ? `${nodeModulesBinDir}:${env[key]}` : nodeModulesBinDir;
      }
    });
  return env;
}

function runCmd(cmd, _args, fn) {
  const args = _args || [];

  if (isWindows()) {
    args.unshift(cmd);
    args.unshift('/c');
    cmd = process.env.ComSpec;
  }

  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv(),
  });

  runner.on('close', (code) => {
    if (fn) {
      fn(code);
    }
  });
}

function shellExec(com) {
  if (sh.exec(com).code !== 0) {
    sh.exit(1)
  }
}

function getDllVersionHash(dlls, packageJSON) {
  const { devDependencies, dependencies } = packageJSON;
  const dllVersionHash = _.map(dlls, v => {
    if (devDependencies[v]) {
      return `${v}@${devDependencies[v]}`
    } else if (dependencies[v]) {
      return `${v}@${dependencies[v]}`
    }
  }).join('')

  return crypto.createHmac('sha256', '').update(dllVersionHash).digest('hex').slice(0, 8)
}


module.exports = {
  runCmd,
  shellExec,
  getRunCmdEnv,
  getDllVersionHash
}