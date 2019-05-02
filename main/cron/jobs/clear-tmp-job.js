
/* global Carolina */

const BaseJob = require('carolina/main/cron/jobs/base-job');

class ClearTmpJob extends BaseJob {
  
  constructor() {
    super();
  }
  
  async handle(args) {
    
    let TerminalSvc = Carolina.$('Terminal');
    let ClearTmpCommand = TerminalSvc._command('ClearTmpCommand');
    let r = await ClearTmpCommand.handle({ hours: args.hours });
    
    return {
      success: true,
      message: `Files in .tmp/ that were more than ${args.hours} hours old have been deleted.`
    };
  }
}

exports = module.exports = ClearTmpJob;