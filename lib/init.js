module.exports = main;
function main() {
  var child_process = require('child_process');
  const home = process.cwd();
  child_process.spawn('cp', ['-r', './config/*', home]);
}