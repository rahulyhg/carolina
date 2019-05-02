
const cookie = require('cookie');

const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * CookieMiddleware
 * Extracts the cookies as a JSON object.
 */
class CookieMiddleware extends BaseMiddleware {
  async before(request, data) {
    
    // console.log(request.headers);
    
    if (request.headers.hasOwnProperty('cookie')) {
      request.cookies = cookie.parse(request.headers.cookie); 
    }
    
    // console.log(request.cookies);
    
    return request;
  }
}

exports = module.exports = CookieMiddleware;