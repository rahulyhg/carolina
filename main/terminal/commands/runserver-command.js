
const BaseCommand = require('carolina/main/terminal/commands/base-command');

class RunserverCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = "runserver";
    this.description = "Runs the server.";
    this.args = [
      {
        arg: ['--host'],
        options: {
          defaultValue: "127.0.0.1",
          help: "The host to run on.",
          type: 'int'
        }
      },
      {
        arg: ['-p', '--port'],
        options: {
          defaultValue: 8080,
          help: "The port to run on.",
          type: 'int'
        }
      }
    ];
  }
  
  async handle(args) {
    
    /* global Carolina */
    
    let CronSvc = Carolina.$('Cron');
    CronSvc.startService();

    let Http = Carolina.$("Http");
    Http.loadRoutes();
    console.log(Http.controllers)
    Http.runServer(args.host, args.port);
  }
}

exports = module.exports = RunserverCommand;