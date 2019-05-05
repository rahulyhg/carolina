
/* global Carolina */

const HttpResponse = require('carolina/main/http/http-response');

/**
 * class BaseController
 * Represents an Http handler.
 */
class BaseController {
  
  constructor() {
    
  }
  
  _validate(schemaName, obj, throwError=false) {
    let Validation = Carolina.$('Validation');
    return Validation.validate(schemaName, obj, throwError);
  }
  
  sendText(text, status=200) {
    let res = new HttpResponse({
      body: text,
      status: status
    });
    res.setHeader("Content-Type", "text/plain");
    return res;
  }
  
  sendJSON(o, status=200) {
    let res = new HttpResponse({
      body: JSON.stringify(o),
      status: status
    });
    res.setHeader("Content-Type", "application/json");
    return res;
  }
  
  async pugTemplate(template, data, request=null) {
    return await Carolina.$("Views")._view("PugTemplateView").make({
      template: template,
      data: data
    }, request);
  }
  
  redirect(location, status=302) {
    let res = new HttpResponse({});
    res.redirect(location, status);
    return res;
  }
  
  getMiddleware() {
    return [];
  }
  
  /**
   * Gets a request and returns a response.
   *
   * @param  request  carolina/main/http/http-request  The incoming HttpRequest.
   * @param  next     function                         Event signalling to handle the next controller (for middleware)
   * 
   * @return response carolina/main/http/http-response The response to return.
   */
   async handle(request, next, data={}) {
     
   }
}

exports = module.exports = BaseController;