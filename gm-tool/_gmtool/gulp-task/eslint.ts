

import { src, task } from 'gulp';
const eslint = require('gulp-eslint');

task('eslint', () => {
  return src(['js/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    // https://github.com/adametry/gulp-eslint
    .pipe(eslint({
      rules: {
        "quotes": 0,
        "camelcase": 1,
        "comma-dangle": 2,
        "no-console": 2
      },
      // configFile: ''
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});