const fs = require('fs');
const path = require('path');
const cliConfigs = require('../_gmtool/cli.config');



const clis = cliConfigs.reduce((p, c) => p.concat(c.children), [])


let file = `# gm-tool 命令文档\n`;

clis.forEach(cli => {
  file += '\n';
  file += `## ${cli.name} (${cli.abbr})\n`;
  file += `> 说明: ${cli.comment} \n`;
  file += `\n\`\`\`gm-tool ${cli.name} \`\`\`\n`;
  file += `\n\`\`\`gm-tool ${cli.abbr} \`\`\`\n`;
  file += '\n'
});

fs.writeFileSync(path.join(process.cwd(), 'README.md'), file);