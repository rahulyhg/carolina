
const path = require('path');

const fs = require('fs-extra');
const moment = require('moment');

const BaseLogger = require('carolina/main/logger/loggers/base-logger');

/**
 * FileLogger
 * Logs events to a file.
 */
class FileLogger extends BaseLogger {

  constructor(obj) {
    super(obj);
    this.filePattern = obj.filePattern;
    this.subDir = obj.subDir;
    this.baseDir = obj.baseDir || path.resolve(process.cwd(), 'storage', 'logs');
  }

  async log(source, time, level, message) {

    // console.log("in file logger");
    
    let levelString = this.getLevelString(level);
    let logMessage = `${time.format()} - [${source}] - ${levelString.toUpperCase()} - ${message}\n`;

    let fileName = this.filePattern.replace("[]", moment().format('YYYYMMDD'));
    let filePath = path.resolve(this.baseDir, fileName);
    if (this.subDir) {
      filePath = path.resolve(this.baseDir,
        this.subDir, fileName);
    }

    await fs.ensureFile(filePath);
    await fs.appendFile(filePath, logMessage);
  }
}

exports = module.exports = FileLogger;