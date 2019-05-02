
/* global Carolina */

const moment = require('moment');

const BaseService = require('carolina/services/base-service');

class BaseLoggerService extends BaseService {
  
  constructor() {
    
    super("Logger");
    
    let carolinaLoggers = require('carolina/main/logger/loggers');
    this._initializeLibrary("loggerClasses", "loggers", "logger/loggers",
      carolinaLoggers, "logger");
      
    let loggers = Carolina.config("logger.logChannels", {});
    for (let loggerName in loggers) {
      let LoggerClass = this._loggerClass(
        loggers[loggerName].driver);
      this.loggers[loggerName] = new LoggerClass(loggers[loggerName]);
    }
  }
  
  _loggerClass(name) {
    return this._loadClass(name, "loggerClasses", "logger");
  }
  
  log(obj) {
    
    let logDefaults = {
      time: moment(),
      source: null,
      level: 3,
      message: "Empty log statement."
    };
    let combined = {
      ...logDefaults,
      ...obj
    };
    let { time, source, level, message } = combined;
    
    if (level < 0) level = 0;
    if (level > 5) level = 5;
    
    for (let loggerName in this.loggers) {
      let logger = this.loggers[loggerName];
      logger.requestLog(source, time, level, message);
    }
  }

  error(msg, src=null) {
    this.log({ source: src, level: 0, message: msg });
  }
  warn(msg, src=null) {
    this.log({ source: src, level: 1, message: msg });
  }
  info(msg, src=null) {
    this.log({ source: src, level: 2, message: msg });
  }
  verbose(msg, src=null) {
    this.log({ source: src, level: 3, message: msg });
  }
  debug(msg, src=null) {
    this.log({ source: src, level: 4, message: msg });
  }
  silly(msg, src=null) {
    this.log({ source: src, level: 5, message: msg });
  }
}

exports = module.exports = BaseLoggerService;
