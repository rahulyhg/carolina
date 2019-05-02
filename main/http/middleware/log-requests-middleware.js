
/* global Carolina */

const moment = require('moment');

const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * LogRequestsMiddleware
 * Logs incoming requests.
 */
class LogRequestsMiddleware extends BaseMiddleware {
  
  async before(request, data) {
    request.info.startTime = moment();
    return request;
  }
  
  async after(request, response, data) {
    
    // level: verbose
    let msg = `http-request [${request.info.startTime.format()}] ${request.ipAddress} ${request.method} ${request.url} (${request.headers['user-agent']}) :: ${response.status}`;
    let LoggerSvc = Carolina.$("Logger");
    
    LoggerSvc.log({
      source: 'Http',
      level: 3,
      message: msg
    });
    
    return response;
  }
}

exports = module.exports = LogRequestsMiddleware;