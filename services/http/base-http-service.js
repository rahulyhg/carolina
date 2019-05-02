
const path = require('path');

const BaseService = require('carolina/services/base-service');

/**
 * service BaseHttpService
 * The base class for the the service Http, which handles the web server
 * and maps routes to controllers.
 */
class BaseHttpService extends BaseService {
  
  constructor() {
    
    super("Http");
    
    this.controllers = {};
    this.controllerClasses = {};
    this.middleware = {};
    this.middlewareClasses = {};
    
    /* global Carolina */
    
    let carolinaControllers = require('carolina/main/http/controllers');
    this._initializeLibrary("controllerClasses", "controllers",
      "http/controllers", carolinaControllers, "controller");
    
    let carolinaMiddleware = require('carolina/main/http/middleware');
    this._initializeLibrary("middlewareClasses", "middleware",
      "http/middleware", carolinaMiddleware, "middleware");
  }
  
  _controller(name) {
    return this._lazyLoadObject(name, "controllerClasses", "controllers",
      "controller");
  }
  
  _middleware(name) {
    return this._lazyLoadObject(name, "middlewareClasses", "middleware",
      "middleware");
  }
  
  /**
   * BaseHttpService.loadRoutes()
   * Adds the routes. This is called during setup.
   * 
   * @param route  Object<String, Array<carolina/main/routes/base-route>> A map of route middleware categories to lists of routes.
   * @param group  String                                                 The middleware group to apply.
   * @param prefix String                                                 The prefix route for the route.
   */
  loadRoutes(routes, group="", prefix="") {}
  
  /**
   * BaseHttpService.runServer()
   * Starts the server on the host and port specified by the configuration.
   */
  runServer(host, port) {}
}

exports = module.exports = BaseHttpService;