'use strict'

var cwd = '"' + process.cwd() + '"';
var fs = require('fs');
var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim();
var ref = gitHEAD.split(': ')[1];
var develop = gitHEAD.split('/')[2];
try {
  var getVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim();
} catch (err) {
  var getVersion = "new";
}
var gitCommitVersion = '"' + develop + ': ' + getVersion + '"';

module.exports = {
  CURRENT_WORK_DIR: cwd,
  GIT_COMMIT_VERSION: gitCommitVersion,
  NODE_ENV: '"production"'
}
