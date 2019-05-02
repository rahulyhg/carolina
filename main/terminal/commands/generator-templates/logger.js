
const BaseLogger = require('carolina/main/logger/loggers/base-logger');

/**
 * class {{ name }}
 * Does logging.
 */
class {{ name }} extends BaseLogger {
  
  constructor(obj) {
    super(obj);
  }
  
  async log(source, time, level, message) {
    // log the message
    // prefered format time - source - LEVEL_STRING - message
    let levelString = this.getLevelString(level);
  }
}

exports = module.exports = {{ name }};