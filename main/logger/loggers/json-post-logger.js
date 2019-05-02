
const axios = require('axios');

const BaseLogger = require('carolina/main/logger/loggers/base-logger');

/**
 * JsonPostLogger
 * POSTS log entries in JSON form to some URL
 */
class JsonPostLogger extends BaseLogger {

  constructor(obj) {
    super(obj);
    this.headers = obj.headers || { 'Content-Type': 'application/json' };
    this.url = obj.url;
  }

  async log(source, time, level, message) {
    
    let levelString = this.getLevelString(level);

    try {
      await axios.post(this.url, {
        source: source,
        time: time.format(),
        levelString: levelString,
        level: level,
        message: message
      })
    }
    catch(e) {

    }
  }
}

exports = module.exports = JsonPostLogger;