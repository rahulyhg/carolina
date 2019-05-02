
const http = require('http');
const os = require('os');
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const formData = require('express-form-data');

const BaseHttpService = require('carolina/services/http/base-http-service');
const expressHandler = require('carolina/services/http/handlers/express-handler');

/**
 * service ExpressHttpService
 * Extension of BaseHttpService which runs the Http server using the 
 * express framework.
 */
class ExpressHttpService extends BaseHttpService {
  
  constructor() {
    
    super();
    
    this.expressServer = express();
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(formData.parse({ uploadDir: Carolina.config("files.fileDrives").temp.basepath }));
    this.expressServer.use(formData.format());
    this.expressServer.use(formData.union());
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(bodyParser.urlencoded());
    this.expressServer.use(bodyParser.raw());
  }
 
  loadRoutes(routes, group="", prefix="") {
    
    /* global Carolina */
    
    // console.log('prefiex', prefix);
    
    // find all routes if at top of recursion tree
    if (routes == null) {
      
      this.expressServer.use(express.static(path.resolve(Carolina.getPath(), 
      "public")));

      let routeGroups = require(path.resolve(Carolina.getPath(), 'site',
        'http', 'routes'));

      for (let group in routeGroups) {
        this.loadRoutes(routeGroups[group], group);
      }
    }
    
    else {
      for (let i = 0; i < routes.length; ++i) {
        
        let currentRoute = routes[i];
        
        // console.log('start', prefix + currentRoute.route);
        
        let groupMiddleware = [];
        
        if (Carolina.config('http.middleware_groups').hasOwnProperty(group)) {
          groupMiddleware = Carolina.config("http.middleware_groups")[group];
        }
        
        let handler = expressHandler(currentRoute, groupMiddleware);
        if (currentRoute.hasOwnProperty('subs')) {
          
          this.loadRoutes(currentRoute.subs, group, prefix + currentRoute.route);
          
          continue;
        }
        if (!currentRoute.methods) {
          currentRoute.methods = ["all"];
        }
        if (currentRoute.methods.indexOf("all") != -1 || currentRoute.methods.indexOf("ALL") != -1) {
          this.expressServer.all(prefix + currentRoute.route, handler);
          // console.log(prefix + currentRoute.route);
        }
        else {
          for (let j = 0; j < currentRoute.methods.length; ++j) {
            let methodName = currentRoute.methods[j].toLowerCase();
            this.expressServer[methodName](prefix + currentRoute.route, handler);
            // console.log(prefix + currentRoute.route, currentRoute.methods[j]);
          }
        }
      }
    }
  }
  
  runServer(host, port) {

    let WebSocketsSvc = Carolina.$('WebSockets');
    
    let server = http.createServer(this.expressServer);
    WebSocketsSvc.configureServer(server);
    server.listen(port, host, () => {
      console.log(`Server listening on port ${port}.`);
    });
  }
}

exports = module.exports = ExpressHttpService;