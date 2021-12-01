module.exports = main;
async function main() {
  const path = require('path');
  const fs = require('fs');
  const inquirer = require('inquirer')
  const home = process.cwd();
  const configsPath = path.resolve(__dirname, './configs');
  const files = fs.readdirSync(configsPath);
  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    let question = 'copy ' + filename;
    const dest = path.resolve(home, filename);
    const src = path.resolve(configsPath, filename);
    let isCopy = false;
    if (!fs.existsSync(dest)) {
      isCopy = true;
    } else {
      const answers = await inquirer.prompt({
        name: 'overwrite',
        message: question,
        type: 'confirm'
      });
      const { overwrite } = answers;
      if (overwrite) {
        isCopy = true;
      }
    }
    isCopy && fs.copyFileSync(src, dest)
  }
}