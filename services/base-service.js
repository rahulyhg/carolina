
/* global Carolina */

const path = require('path');

const moment = require('moment');

const LOG_LEVELS = {
  error: 0,
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
};

class BaseService {
  
  constructor(serviceName) {
    this.serviceName = serviceName;
  }
  
  _initializeLibrary(classRepo, objectRepo, localPath, initial={}, type="object") {
    
    /* global Carolina */
    
    let allObjects = initial;
    let userObjects = {};
    let pluginObjects = {};
    
    this[classRepo] = {};
    this[objectRepo] = {};
    
    try {
      userObjects = require(path.resolve(Carolina.getPath(), "site", localPath));
    }
    catch(e) {
  
    }
    
    allObjects = Object.assign(allObjects, userObjects);
    
    // load from plugin

    let installedPlugins = Carolina.config("app.plugins", []);
    for (let i = 0; i < installedPlugins.length; ++i) {
      try {
        let tempObjects = require(path.resolve(
          require(installedPlugins[i]).pluginPath, "plugin",
          localPath));
        pluginObjects = Object.assign(pluginObjects, tempObjects);
      }
      catch(e) {
        // console.log(e);
      }
    }

    allObjects = Object.assign(allObjects, pluginObjects);
    
    for (let objName in allObjects) {
      this[classRepo][objName] = allObjects[objName];
    }
  }
  
  log(level, message) {
    Carolina.$("Logger").log({
      source: this.serviceName,
      level: LOG_LEVELS[level] || 2,
      time: moment(),
      message: message
    });
  }
  
  async onShutdown() {
    
  }
  
  _lazyLoadObject(name, classRepo, objectRepo, type="object") {
    if (this[objectRepo].hasOwnProperty(name)) {
      return this[objectRepo][name];
    }
    else if (this[classRepo].hasOwnProperty(name)) {
      this[objectRepo][name] = new (this[classRepo][name]) ();
      return this[objectRepo][name];
    }
    else {
      let NoSuchThingError = Carolina.$("Errors")._errorClass('NoSuchThingError');
      throw new NoSuchThingError(this.serviceName, type, name);
    }
  }
  _loadClass(name, classRepo, type="class") {
    if (this[classRepo].hasOwnProperty(name)) {
      return this[classRepo][name];
    }
    else {
      let NoSuchThingError = Carolina.$("Errors")._errorClass('NoSuchThingError');
      throw new NoSuchThingError(this.serviceName, type, name);
    }
  }
}

exports = module.exports = BaseService;