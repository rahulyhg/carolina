
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * BrowserMiddleware
 * Test middleware, should not be included in release
 */
class BrowserMiddleware extends BaseMiddleware {
  async before(request, data) {
    
    console.log("Incoming request to browser route.");
    
    return request;
  }
}

exports = module.exports = BrowserMiddleware;