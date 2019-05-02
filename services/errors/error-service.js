
/* global Carolina */

const assert = require('assert');

const HttpResponse = require('carolina/main/http/http-response');
const BaseService = require('carolina/services/base-service');

class ErrorsService extends BaseService {
  
  constructor() {
    
    super("Errors");
    
    let nodeErrors = {
      "AssertionError": assert.AssertionError,
      "RangeError": RangeError,
      "ReferenceError": ReferenceError,
      "SyntaxError": SyntaxError,
      "TypeError": TypeError
    };
    let carolinaErrors = {
      ...nodeErrors,
      ...(require('carolina/main/errors/errors'))
    };
    
    this._initializeLibrary("errorClasses", "errors", "errors/errors", 
      carolinaErrors, "error");
      
    let carolinaErrorHandlers = {
      "Error": require('carolina/main/errors/error-handlers/base-error-handler')
    }
    this._initializeLibrary("errorHandlerClasses", "errorHandlers",
      "errors/error-handlers", carolinaErrorHandlers, "error handler");
  }
  
  _errorHandler(name) {
    return this._lazyLoadObject(name, "errorHandlerClasses", "errorHandlers",
      "error handler");
  }
  
  _errorClass(name) {
    return this._loadClass(name, "errorClasses", "error class");
  }
  
  getHandler(err) {
    if (this.errorHandlers.hasOwnProperty(err.name) || this.errorHandlerClasses.hasOwnProperty(err.name)) {
      return this._errorHandler(err.name);
    }
    else {
      return this._errorHandler("Error");
    }
  }
  
  reportError(err, request, response) {
    if (Carolina.config('errors.printErrors')) {
      console.log(err.stack);
    }
    if (Carolina.config('errors.emitErrors')) {
      
      let ErrorEvent = Carolina.$("Events")._eventClass("ErrorEvent");
      
      let event = new ErrorEvent(err, request, response);
      event.fire();
    }
  }
  
  async getResponse(err, request, response, middlewareList) {
    
    let isJson = (Carolina.config("errors.respondWithJson"))(err, request,
      response);
    let isDebug = Carolina.config("app.debug", false);
    
    // get details from handler
    let handler = Carolina.$("Errors").getHandler(err);
    let details = err.details;
    
    if (isJson) {
      
      let j = {
        "error": err.name,
        "message": err.message
      };
      
      if (isDebug) {
        
        let splitStack = err.stack.split("\n");
        j.stacktrace = splitStack;
        j.details = details;
        
        // assign details
        j.request = {};
        j.request.src = request.ipAddress;
        j.request.method = request.method;
        j.request.path = request.url;
        j.request.params = request.params;
        j.request.query = request.query;
        j.request.headers = request.headers;
        j.request.data = request.data;
        j.request.session = request.session;
        j.request.middlewareCompleted = request.middlewareCompleted;
        
        if (response) {
          j.response = {};
          j.response.intendedStatus = response.status;
          j.response.intendedStatusText = response.statusText;
          j.response.headers = response.headers;
          j.response.cookies = response.cookies;
          j.response.session = response.session;
          j.response.bodyLength = response.body.length;
          j.response.middlewareCompleted = response.middlewareCompleted;
        }
        else {
          j.response = null;
        }
        
        j.siteConfig = Carolina._conf;
      }
      
      let res = new HttpResponse({
        body: JSON.stringify(j, null, 2),
        status: 500
      });
      res.headers["Content-Type"] = 'application/json';
      return res;
    }
    
    return await handler.getHtmlResponse(err, request, response, middlewareList,
      details);
  }
}

exports = module.exports = ErrorsService;