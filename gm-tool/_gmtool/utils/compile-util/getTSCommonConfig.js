'use strict';

const fs = require('fs');
const assign = require('object-assign');
const { getProjectPath } = require('../projectHelper');

module.exports = function() {
  let my = {};
  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    my = require(getProjectPath('tsconfig.json'));
  }

  // NOTICE getTSCommonConfig
  my.compilerOptions.allowJs = false;
  return assign(
    {
      target: 'es6',
      jsx: 'preserve',
      declaration: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      noUnusedParameters: true,
      moduleResolution: 'node',
      allowSyntheticDefaultImports: true,
    },
    my.compilerOptions
  );
};
