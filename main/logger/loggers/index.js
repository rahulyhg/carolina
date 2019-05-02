/**
 * Included Carolina logger classes.
 */
exports = module.exports = {
  DbLogger: require('./db-logger'),
  EmailLogger: require('./email-logger'),
  FileLogger: require('./file-logger'),
  JsonPostLogger: require('./json-post-logger'),
  TerminalLogger: require('./terminal-logger')
};