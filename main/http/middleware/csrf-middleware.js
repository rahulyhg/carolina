
/* global Carolina */

const crypto = require('crypto');

const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

class CsrfMiddleware extends BaseMiddleware {
  
  constructor() {
    
    super();
    
    this.protectedMethods = ["POST", "PUT", "PATCH", "DELETE"];
  }
  
  async before(request, data={}) {
    
    // console.log(data);
    
    if (data.csrfExempt) {
      return request;
    }
    
    if (this.protectedMethods.includes(request.method)) {
      
      let csrfToken = null;
      
      if ('csrf_token' in request.data) {
        csrfToken = request.data['csrf_token'];
      }
      else if (request.headers.hasOwnProperty('x-csrf-token')) {
        csrfToken = request.headers['x-csrf-token'];
      }
      else if (request.headers.hasOwnProperty('x-xsrf-token')) {
        csrfToken = request.headers['x-xsrf-token'];
      }
      
      if (request.session.hasOwnProperty('csrf_token')) {
        if (request.session.csrf_token == csrfToken) {
          return request;
        }
      }

      throw `Missing or bad CSRF token.`;
    }
    else {
      if (!request.session.hasOwnProperty('csrf_token')) {
        
        let newToken = crypto.randomBytes(12).toString('hex');
        
        if (request.sessionId) {
          request.session.csrf_token = newToken;
          await Carolina.$("Session").saveSession(request.sessionId,
            request.session);
        }
      }
    }
    
    return request;
  }
  
  async after(request, response, data) {
    response.setCookieValue('csrf_token', request.session.csrf_token);
    return response;
  }
}

exports = module.exports = CsrfMiddleware;