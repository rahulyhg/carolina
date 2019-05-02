
/* global Carolina */

const BaseListener = require('carolina/main/events/listeners/base-listener');

/**
 * class SystemShutdownListener
 * Represents the event listener that handles system shutdown.
 */
class SystemShutdownListener extends BaseListener {
  
  constructor() {
    super();
  }

  async handle(event) {
    
    console.log(`System going down due to ${event.reason}.`);
    
    // call on shutdown for every service
    for (let serviceName in Carolina.servicePaths) {
      let Service = Carolina.$(serviceName);
      Service.onShutdown();
    }
  }
}

exports = module.exports = SystemShutdownListener;