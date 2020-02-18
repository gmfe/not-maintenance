const sh = require('shelljs')

const project = process.argv[2]

sh.exec(`
git clone git@github.com:gmfe/${project}.git; 
rm -rf ${project}/.git; 
git add ${project};
git commit -m '${project}'
git push origin
`)
