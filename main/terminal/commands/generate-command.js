
const fs = require('fs-extra');
const path = require('path');

const nunjucks = require('nunjucks');
const toSlugCase = require('to-slug-case');

const BaseCommand = require('carolina/main/terminal/commands/base-command');

const PATH_MAP = {
  channel: 'site/web-sockets/channels/',
  command: 'site/terminal/commands/',
  controller: 'site/http/controllers/',
  email: 'site/email/',
  'error': 'site/errors/errors/',
  'error-handler': 'site/errors/error-handlers',
  event: 'site/events/events/',
  field: 'site/db/fields/',
  'file-driver': 'site/files/file-drivers/',
  job: 'site/cron/jobs/',
  listener: 'site/events/listeners/',
  logger: 'site/logger/loggers/',
  mailer: 'site/email/mailers/',
  middleware: 'site/http/middleware/',
  model: 'site/db/models/',
  rule: 'site/validation/rules/',
  schedule: 'site/cron/schedules',
  schema: 'site/validation/schemas/',
  service: 'site/services/',
  task: 'site/tasks/',
  'validation-schema': 'site/validation/schemas/',
  view: 'site/views/views/'
};

class GenerateCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = "generate";
    this.description = "Scaffolds a new class with the given name.";
    this.args = [
      {
        arg: 'type',
        options: {
          choices: [
            'channel', 'command', 'controller', 'email', 'error',
            'error-handler',
            'event', 'file-driver',
            'field', 'job', 
            'listener', 'logger', 'mailer', 'middleware', 'model',
            'rule', 'schedule', 'schema', 'service',  'task',
            'validation-schema', 'view'
          ],
          help: "The type of class to create."
        }
      },
      {
        arg: 'name',
        options: {
          help: "The name of the new class, such as AwesomeController"
        }
      }
    ];
  }
  
  async handle(args) {
    
    /* global Carolina */
    
    let splitName = args.name.split('/');
    let className = splitName.pop();
    let classPath = splitName.join("/");
    
    let fileSlug = toSlugCase(className);
    let fileName = `${fileSlug}.js`;
    
    let fileDir = path.resolve(Carolina.appPath, PATH_MAP[args.type],
      classPath);
    let filePath = path.resolve(fileDir, fileName);
    
    if (fs.existsSync(filePath)) {
      this.err(`${args.type} ${filePath} exists.`);
      return 1;
    }
    
    let template = fs.readFileSync(path.resolve(__dirname,
      'generator-templates', `${args.type}.js`)).toString();
    let fileString = nunjucks.renderString(template, {
      name: className,
      slug: fileSlug
    });
    
    fs.ensureDirSync(fileDir);
    fs.writeFileSync(filePath, fileString);
    
    
    this.println(`${args.type} ${className} created.`)
    this.info(`You still need to ensure that it is exposed by ${PATH_MAP[args.type]}index.js (ie, ${className}: require('./${path.join(classPath, fileSlug)}'))`);
    
    if (args.type == "command") {
      this.info(`Once exposed, you can then run your new command using: node . ${fileSlug} ...`);
    }
    
    return 0;
  }
}

exports = module.exports = GenerateCommand;
