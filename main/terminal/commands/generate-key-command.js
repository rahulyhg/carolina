
const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class GenerateKeyCommand extends BaseCommand {
  
  constructor() {
    
    super();
    
    this.commandName = "generate-key";
    this.description = "Adds a CAROLINA_SECRET element to your .env file with a randomized secret if it doesn't exist.";
    this.args = [
      {
        arg: ['-l', '--len'],
        options: {
          defaultValue: 16,
          help: "Number of bytes to generate.",
          type: 'int'
        }
      }
    ];
  }
  
  async handle(args) {
    
    /* global Carolina */
    
    let token = crypto.randomBytes(args.len).toString("hex");
    
    if (fs.existsSync(path.resolve(Carolina.appPath, '.env'))) {
      
      require('dotenv').config();
      
      if (process.env.CAROLINA_SECRET) {
        this.println("Secret token already defined.");
        return 1;
      }
      
      fs.appendFileSync(
        path.resolve(Carolina.appPath, '.env'),
        `\n\nCAROLINA_SECRET=${token}`
      );
      return 0;
    }
    
    fs.writeFileSync(
      path.resolve(Carolina.appPath, '.env'),
      `\n\nCAROLINA_SECRET=${token}`
    );
    
    return 0;
  }
}

exports = module.exports = GenerateKeyCommand;