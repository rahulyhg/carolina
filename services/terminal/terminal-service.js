
const argparse = require('argparse');

const BaseService = require('carolina/services/base-service');

class BaseTerminalService extends BaseService {
  
  constructor() {
    
    super();
    
    let carolinaCommands = require('carolina/main/terminal/commands');
    this._initializeLibrary('commandClasses', 'commands', "terminal/commands",
      carolinaCommands, 'command');
  }
  
  _command(name) {
    return this._lazyLoadObject(name, 'commandClasses', 'commands', "command");
  }
  
  async execute(argv) {
    
    const argparse = require('argparse');
    let parser = argparse.ArgumentParser({
      version: '0.0.1',
      addHelp: true,
      description: "Command line for Carolina."
    });
    
    let subs = parser.addSubparsers({
      title: 'subcommand',
      dest: 'subcommand'
    });
    
    let namedCommands = {};
    
    for (let commandName in this.commandClasses) {
      let c = this._command(commandName);
      namedCommands[c.commandName] = c;
      let subCommand = subs.addParser(c.commandName, {
        addHelp: true,
        description: c.description
      });
      for (let i = 0; i < c.args.length; ++i) {
        subCommand.addArgument(c.args[i].arg, c.args[i].options);
      }
    }
    
    let args = parser.parseArgs();
    let subcommandName = args.subcommand;
    let status = 1;
    
    try {
      status = await namedCommands[subcommandName].handle(args);
    }
    catch(err) {
      console.log(err);
    }
    
    return status;
  }
}

exports = module.exports = BaseTerminalService;