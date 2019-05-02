
const BaseCommand = require('carolina/terminal/command');

/**
 * {{ name }}
 * Representation of a terminal command.
 */
class {{ name }} extends BaseCommand {
  
  constructor() {
    /**
     * {{ name }}.name: String
     * The name by which this command will be invoked.
     * Try not to override existing carolina commands or ones that are used
     * by plugins (if you care about plugin commands).
     */
    this.name = "{{ slug }}";
    this.description = "Describe what this command does.";
    /**
     * {{ name }}.args: Array<Object>
     * List your command's arguments as objects containing the keys
     * "arg" and "options".
     * They will be used with the npm argparse library like so:
     * `subparser.addArgument(obj.arg, obj.options);`
     */
    this.args = [
      // define arguments here
    ];
  }
  
  /**
   * {{ name }}.handle()
   * Called when someone joins the channel. If that someone is an
   * authenticated user, the user object is passed.
   * 
   * @param   args       Object  The parsed argument, which will include "subcommand", the name of your command.
   * 
   * @returns statusCode Integer 0 if the the operation was successful, 1 or more otherwise.
   */
  handle(args) {
    
    /* global Carolina */
    
    // command logic here
    
    return 0;
  }
}

exports = module.exports = {{ name }};