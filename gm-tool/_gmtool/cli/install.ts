
import '../service/market'; // for register
import GMToolLibraryServiceManager from '../service/service-manager';

const program = require('commander');

program.on('--help', () => {
  console.log('  Usage:');
  console.log();
});

program
  .option('-f, --force', '强制覆盖安装')
  .parse(process.argv);


const service = program.args[0];

if (!service) {
  program.help();
} else {

  GMToolLibraryServiceManager.install(service, {
    force: !!program.force,
  });
}
