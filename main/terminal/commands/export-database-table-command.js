
/* global Carolina */

const fs = require('fs-extra');
const path = require('path');

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class ExportDatabaseTableCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = 'export-db-table';
    this.description = "Exports data to a file in storage/dumps/.";
    this.args = [
      {
        arg: "model",
        options: {}
      },
      {
        arg: "outputFile"
      }
    ];
  }
  
  async handle(args) {
    
    let DBSvc = Carolina.$('DB');
    let ModelClass = DBSvc._modelClass(args.model);
    let allObjects = await ModelClass.$all();
    let jsonFormObjects = allObjects.map((o) => o._toJSON());
    let jsonDump = JSON.stringify(jsonFormObjects);
    let outputFileDir = path.resolve(path.join(process.cwd(), 'storage',
      'dumps'));
    
    fs.ensureDirSync(outputFileDir);
    fs.writeFileSync(path.join(outputFileDir, args.outputFile), jsonDump);
    
    return 0;
  }
}

exports = module.exports = ExportDatabaseTableCommand;