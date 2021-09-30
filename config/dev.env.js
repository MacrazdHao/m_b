'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

var cwd = '"' + process.cwd() + '"';
var fs = require('fs');
var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim();
var ref = gitHEAD.split(': ')[1];
var develop = gitHEAD.split('/')[2];
var getVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim();
var gitCommitVersion = '"' + develop + ': ' + getVersion + '"';

module.exports = merge(prodEnv, {
  CURRENT_WORK_DIR: cwd,
  GIT_COMMIT_VERSION: gitCommitVersion,
  NODE_ENV: '"development"'
})
