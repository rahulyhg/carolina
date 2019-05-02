
const colors = require('colors/safe');

const BaseLogger = require('carolina/main/logger/loggers/base-logger');

const LOG_COLORS = {
  0: 'red',
  1: 'yellow',
  2: 'blue',
  3: 'magenta',
  4: 'green',
  5: 'gray'
};

/**
 * class TerminalLogger
 * Does logging.
 */
class TerminalLogger extends BaseLogger {
  
  constructor(obj) {
    super(obj);
    this.useColors = obj.useColors || false;
  }
  
  async log(source, time, level, message) {
    
    // log the message
    // prefered format: time - [source] - LEVEL_STRING - message
    let levelString = this.getLevelString(level);
    let logMessage = `${time.format()} - [${source}] - ${levelString.toUpperCase()} - ${message}`;
    
    if (this.useColors) {
      console.log(colors[LOG_COLORS[level]](logMessage));
    }
    else {
      console.log(logMessage);
    }
  }
}

exports = module.exports = TerminalLogger;