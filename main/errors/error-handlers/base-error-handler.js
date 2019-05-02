
/* global Carolina */

const http_status = require('http-status');

const NODE_ERROR_DESC = require('carolina/main/errors/node-error-desc');

/**
 * class BaseErrorHandler
 * Singleton class with methods for handling errors.
 */
class BaseErrorHandler {
  
  constructor() {
    
  }
  
  /**
   * getDetails
   * Return details for the details attribute that will be returned in 
   * JSON error message.
   */
  getDetails(err, request, response, isDebug=false) {
    return {};
  }
  
  /**
   * getHtmlResponse
   * Returns an HttpResponse for the error. This is only called in debug mode.
   */
  async getHtmlResponse(err, request, response, middlewareList, details) {
    
    let PugTemplateView = Carolina.$("Views")._view("PugTemplateView");
    
    let template = 'carolina/errors/base';
    let status = 500;
    let statusText = "Internal Server Error";
    
    if (err.status) {
      status = err.status;
      statusText = http_status[err.status];
    }
    
    if (Carolina.config('app.debug', false) == false) {
      let res = await PugTemplateView.make({
        template: 'carolina/errors/generic_error',
        data: {
          err: err,
          description: err.description || NODE_ERROR_DESC[err.name] || "There was an error.",
          status: status,
          statusText: statusText
        }
      });
      res.status = status;
      return res;
    }
    
    if (err.template) template = err.template;
    
    let res = await PugTemplateView.make({
      template: template,
      data: {
        err: err,
        description: err.description || NODE_ERROR_DESC[err.name] || "There was an error.",
        middlewareList: middlewareList,
        response: response
      }
    }, request);
    res.status = status;
    return res;
  }
}

exports = module.exports = BaseErrorHandler;