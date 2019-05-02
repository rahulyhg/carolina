
const path = require('path');

const BaseService = require('carolina/services/base-service');

class {{ name }} extends BaseService {
  
  constructor() {
    
    super("{{ name }}");
    
    // don't access other services here
  }
  
  /**
   * Called when the application is shutting down.
   */
  async onShutdown() {
    // do stuff
  }
}

exports = module.exports = {{ name }};
