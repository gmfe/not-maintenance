import chalk from 'chalk'
import * as commander from 'commander';

import { PACKAGE_VERSION } from '../constants';
import * as GM_COMMANDS from '../cli.config'


commander
  .version(PACKAGE_VERSION);



GM_COMMANDS.forEach(c => {
  const sortName = c.children.sort((a,b) => (a.name.length - b.name.length))
  sortName.forEach(data => {
    commander.command(data.name, data.comment)
    commander.command(data.abbr, `alias for ${data.name}`)
  })
});

commander.on('--help', function(){
  console.log('\n')
  GM_COMMANDS.forEach(c => {
    console.log(chalk.blue(`--| ${c.class} | --`))
    c.children.forEach((data, index) => {
      console.log(`${index + 1}.[${data.name}] abbr: `, chalk.yellow(`[gmtool ${data.abbr}]`), data.comment)
    })
  })
})

commander.parse(process.argv);