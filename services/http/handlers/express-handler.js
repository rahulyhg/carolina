
const File = require('carolina/main/files/file');
const HttpRequest = require('carolina/main/http/http-request');

function expressHandler(route, groupMiddleware=[]) {
  return async function (req, res, next) {
    
    /* global Carolina */
   
   // console.log(req.body);
    
    let request = new HttpRequest({
      data: req.body || null,
      headers: req.headers,
      ipAddress: req.ip,
      method: req.method,
      params: req.params || {},
      query: req.query,
      req: req,
      url: req.originalUrl
    });
    let response = null;
    
    if (req.files) {
      for (let fileKey in req.files) {
        
        let splitPath = req.files[fileKey].path.split("/");
        let fileName = splitPath.pop();
        
        let f = new File({
          drive: 'temp',
          path: fileName
        });
        
        request.files[fileKey] = f;
      }
    }
    
    // console.log(request);
    
    let controller = null;
    let controllerMethod = "handle";
    
    if (!route.data) route.data = {};
    
    if (route.hasOwnProperty("redirectTo")) {
      
      let data = { data: route.data };
      data.redirectTo = route.redirectTo;
      data.status = route.status || 302;
      route.data = data;
      
      controller = Carolina.$("Http")._controller("RedirectController");
    }
    else if (route.hasOwnProperty('template')) {
      
      let data = { data: route.data };
      data.template = route.template;
      route.data = data;
      
      controller = Carolina.$("Http")._controller("TemplateController");
    }
    else if (route.hasOwnProperty('func')) {
      
      controller = Carolina.$("Http")._controller("FunctionController");
      
      let data = { data: route.data };
      data.func = route.func;
      route.data = data;
    }
    else if (route.hasOwnProperty('controller')) {
      controller = Carolina.$("Http")._controller(route.controller);
      if (route.hasOwnProperty("method")) {
        controllerMethod = route.method;
      }
    }
    
    let middleware = [];
    let sitewideMiddleware = Carolina.config("http.sitewide_middleware", []);
    
    for (let i = 0; i < sitewideMiddleware.length; ++i) {
      middleware.push(Carolina.$("Http")._middleware(sitewideMiddleware[i]));
    }
    for (let i = 0; i < groupMiddleware.length; ++i) {
      middleware.push(Carolina.$("Http")._middleware(groupMiddleware[i]));
    }
    if (route.middleware) {
      for (let i = 0; i < route.middleware.length; ++i) {
        middleware.push(Carolina.$("Http")._middleware(route.middleware[i]));
      }
    }
    
    let controllerMiddleware = controller.getMiddleware();
    // console.log(controllerMiddleware);
    for (let i = 0; i < controllerMiddleware.length; ++i) {
      middleware.push(Carolina.$("Http")
        ._middleware(controllerMiddleware[i]));
      // console.log(controllerMiddleware[i]);
    }
    
    try {
      for (let i = 0; i < middleware.length; ++i) {
        // console.log(route.data);
        request = await middleware[i].before(request, route.data);
        request.middlewareCompleted.push(middleware[i].constructor.name);
        if (!request.shouldContinue) {
          
          response = request.response;
          
          for (let j = i; j >= 0; --j) {
            response = await middleware[j].after(request, response, route.data);
            response.middlewareCompleted.push(middleware[j].constructor.name);
          }
          
          break;
        }
      }
      
      // console.log("Making response...");
      
      if (request.shouldContinue) {
        
        response = await controller[controllerMethod](request, route.data);
        request.middlewareCompleted.push(`${controller.constructor.name}.${controllerMethod}`);
        response.middlewareCompleted.push(`${controller.constructor.name}.${controllerMethod}`);
        
        for (let i = middleware.length - 1; i >= 0; --i) {
          response = await middleware[i].after(request, response, route.data);
          response.middlewareCompleted.push(middleware[i].constructor.name);
        }
      }
    }
    catch(err) {
      Carolina.$("Errors").reportError(err, request, response);
      response = await Carolina.$("Errors").getResponse(err, request, response,
        middleware);
    }
    
    if (response.shouldDownload) {
      return res.download(response.downloadFilePath, response.downloadFileName);
    }
    if (response.shouldRedirect) {
      return res.redirect(response.status, response.redirectTo);
    }
    if (response.shouldSetCookies) {
      for (var cookieKey in response.cookies) {
        res.cookie(cookieKey, response.cookies[cookieKey]);
      }
    }
    for (let headerKey in response.headers) {
      res.set(headerKey, response.headers[headerKey]);
    }
    return res.status(response.status).send(response.body);
  }
}

exports = module.exports = expressHandler;