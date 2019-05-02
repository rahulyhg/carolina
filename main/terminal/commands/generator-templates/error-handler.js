
const BaseErrorHandler = require('carolina/main/errors/error-handlers/base-error-handler');
const HttpResponse = require('carolina/main/http/http-response');

class {{ name }} extends BaseErrorHandler {
  
  constructor() {
    super();
  }
  
  /**
   * getHtmlResponse
   * Returns an HttpResponse for the error. This is only called in debug mode.
   */
  getHtmlResponse(err, request, response, middlewareList) {
    // generate and return an HttpResponse
  }
}

exports = module.exports = {{ name }};