
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * ApiMiddleware
 * Test middleware, should not be included in release
 */
class ApiMiddleware extends BaseMiddleware {
  async before(request, data) {
    
    console.log("Incoming request to API route.");
    
    return request;
  }
}

exports = module.exports = ApiMiddleware;