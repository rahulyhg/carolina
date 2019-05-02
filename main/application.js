
const path = require('path');

const moment = require('moment');

const cRequire = require('carolina/_lib/c-require');

class Application {
  
  constructor(appPath) {
    this.startTime = moment();
    this.appPath = appPath;
    this._conf = require(path.resolve(appPath, 'config'));
    this.services = {};
    this.servicePaths = {};
    this.values = {};
  }
  
  getPath() {
    return this.appPath;
  }
  
  config(configPath, defaultValue=null) {
    if (configPath.indexOf('.') != -1) {
      
      let splitConfig = configPath.split(".");
      let section = splitConfig[0];
      let key = splitConfig[1];
      
      if (this._conf.hasOwnProperty(section) && this._conf[section].hasOwnProperty(key)) {
        return this._conf[section][key];
      }
    }
    else {
      if (this._conf.hasOwnProperty(configPath)) {
        return this._conf[configPath];
      }
    }
    
    return defaultValue;
  }
  
  value(key, defaultValue=null) {
    if (key in this.values) {
      return this.values[key];
    }
    else {
      return defaultValue;
    }
  }
  
  setValue(key, value) {
    this.values[key] = value;
  }
  
  setConfig(configPath, value=null) {
    if (configPath.indexOf('.') != -1) {
      
      let splitConfig = configPath.split(".");
      let section = splitConfig[0];
      let key = splitConfig[1];
      
      if (!this._conf.hasOwnProperty(section)) {
        this._conf[section] = {};
      }
      this._conf[section][key] = value;
    }
    else {
      this._conf[configPath] = value;
    }
  }
  
  setService(serviceName, requirePath) {
    try {
      this.servicePaths[serviceName] = requirePath;
      if (this.services.hasOwnProperty(serviceName)) {
        this.services[serviceName] = new (cRequire(requirePath))();
      }
    }
    catch(e) {
      console.log(e);
    }
  }
  
  $(s) {
    if (this.services.hasOwnProperty(s)) {
      return this.services[s];
    }
    else if (this.servicePaths.hasOwnProperty(s)) {
      try {
        this.services[s] = new (cRequire(this.servicePaths[s]))();
      }
      catch(e) {
        console.error(e);
      }
      if (this.services.hasOwnProperty("Events")) {
        let InitializeServiceEvent = this.$("Events")._eventClass('InitializeServiceEvent');
        new InitializeServiceEvent(s, this.services[s]).fire();
      }
      return this.services[s];
    }
    else {
      throw `Service ${s} not found.`;
    }
  }
}

exports = module.exports = Application;