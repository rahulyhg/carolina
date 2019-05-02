
/* global Carolina */

const BaseLogger = require('carolina/main/logger/loggers/base-logger');

/**
 * DbLogger
 * Puts log entries in the Database using the LogEntry Model.
 */
class DbLogger extends BaseLogger {

  constructor(obj) {
    super(obj);
  }

  async log(source, time, level, message) {

    if (source == 'DB' || source == 'Db') { return; }
    let LogEntry = Carolina.$('DB')._modelClass('LogEntry');

    let lgEntry = new LogEntry({
      source: source,
      time: time.format(),
      level: level,
      levelString: this.getLevelString(level),
      message: message
    });
    lgEntry._save();
  }
}

exports = module.exports = DbLogger;