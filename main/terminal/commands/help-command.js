
const BaseCommand = require('carolina/main/terminal/commands/base-command');

class HelpCommand extends BaseCommand {

  constructor() {

    super();

    this.commandName = 'help';
    this.description = "Displays a list of all registered commands.";
  }

  async handle(args) {

    let TerminalSvc = Carolina.$('Terminal');

    for (let key in TerminalSvc.commandClasses) {

      let command = TerminalSvc._command(key);
      this.success(command.commandName);
      this.info(`\t${command.description}`);

      console.log();
    }

    console.log();
    this.info("For more information on any command, run: node . <command> -h");
  }
}

exports = module.exports = HelpCommand;