
const cliProgress = require('cli-progress');
const colors = require('colors/safe');
const TableLayout = require('table-layout')

class BaseCommand {
  
  constructor() {
    this.commandName = "app:command";
    this.description = "This is a basic command.";
    this.args = [];
  }
  
  println(line) {
    console.log(line);
  }
  
  dim(line) {
    console.log(colors.gray(line));
  }
  
  success(line) {
    console.log(colors.green(line));
  }
  
  blue(line) {
    console.log(colors.blue(line));
  }
  
  info(line) {
    console.log(colors.magenta(line));
  }
  
  warn(line) {
    console.log(colors.yellow(line));
  }
  
  err(line) {
    console.log(colors.red(line));
  }

  table(data) {
    console.log(new TableLayout(data).toString());
  }

  getProgressBar(total, start) {
    let bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
    bar.start(total, start);
    return bar;
  }
  
  async handle(args) {
    console.log("This is a great command.");
    return 0;
  }
}

exports = module.exports = BaseCommand;