
// const moment = require('moment');

const LOG_LEVELS = {
  0: "error",
  1: "warn",
  2: "info",
  3: "verbose", 
  4: "debug",
  5: "silly"
};

class BaseLogger {
  
  constructor(obj) {
    this.driverName = obj.driver;
    this.level = obj.level;
    this.sources = obj.sources || null;
  }
  
  getLevelString(level) {
    return LOG_LEVELS[level];
  }
  
  shouldLog(source, level) {
    if (level <= this.level) {
      if (this.sources != null) {
        if (this.sources.indexOf(source) !== -1) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }
  
  requestLog(source, time, level, message) {
    if (this.shouldLog(source, level)) {
      this.log(source, time, level, message);
    }
  }
  
  async log(source, time, level, message) {
    // log the message
    // prefered format time - source - LEVEL_STRING - message
  }
}

exports = module.exports = BaseLogger;