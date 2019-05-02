
const fs = require('fs-extra');
const path = require('path');

const moment = require('moment');

const walk = require('carolina/_lib/walk');

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class ClearTmpCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = 'clear-tmp';
    this.description = "Deletes files in .tmp/ that were created longer than H (default 24) hours ago.";
    this.args = [
      {
        arg: ['-t', '--hours'],
        options: {
          defaultValue: 24,
          help: "The number of past hours of files to preserve."
        }
      }  
    ];
  }
  
  async handle(args) {
    
    let cutoffTime = moment().subtract({ hours: parseInt(args.hours) });
    let files = walk(path.resolve(process.cwd(), '.tmp'));
    for (let i = 0; i < files.length; ++i) {
      
      let fileStats = fs.statSync(files[i]);
      let modifiedTime = moment(fileStats.mtime);
      
      if (modifiedTime.isBefore(cutoffTime)) {
        fs.removeSync(files[i]);
      }
    }
    
    return 0;
  }
}

exports = module.exports = ClearTmpCommand;