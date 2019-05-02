
/* global Carolina */

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class LoadDataCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = 'load-data';
    this.description = "Loads a fixture into the database.";
    this.args = [
      {
        arg: 'fixture',
        options: {
          help: "The fixture to load."
        }
      },
      {
        arg: ['-u', '--unload'],
        options: {
          action: 'storeTrue',
          help: "Use this option to UNLOAD the fixture instead of loading it."
        }
      }
    ];
  }
  
  async handle(args) {
    
    let DBSvc = Carolina.$('DB');
    
    if (args.unload) {
      await DBSvc.removeFixture(args.fixture);
    }
    else {
      await DBSvc.applyFixture(args.fixture);
    }
    
    return 0;
  }
}

exports = module.exports = LoadDataCommand;