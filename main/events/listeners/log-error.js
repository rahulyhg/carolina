
/* global Carolina */

const LOG_LEVELS = require('carolina/main/logger/log-levels');
const NODE_ERROR_DESC = require('carolina/main/errors/node-error-desc');

const BaseListener = require('carolina/main/events/listeners/base-listener');

/**
 * class LogError
 * Represents the event listener that handles system shutdown.
 */
class LogError extends BaseListener {
  
  constructor() {
    super();
  }

  async handle(event) {
    let message = `${event.err.name}: ${event.err.description || NODE_ERROR_DESC[event.err.name]}`;
    Carolina.$("Logger").log({
      source: "Errors",
      level: LOG_LEVELS.ERROR,
      message: message
    });
  }
}

exports = module.exports = LogError;