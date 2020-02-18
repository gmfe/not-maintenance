import { task, series, parallel } from 'gulp';
const compileTs = require('../utils/compile-ts');

task(
  'compile-ts',
  parallel(
    done => {
      console.log('[Parallel] Compile static to js...');
      compileTs(undefined, undefined, '/static', false).on('finish', done);
    },
    done => {
      console.log('[Parallel] Compile components to js...');
      compileTs(undefined, undefined, '/components', false).on('finish', done);
    },
    done => {
      console.log('[Parallel] Compile story to js...');
      compileTs(undefined, undefined, '/story', false).on('finish', () => {
        done();
      });
    }
  )
);