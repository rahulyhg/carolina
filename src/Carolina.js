
class Carolina {
  
  constructor() {
    this.services = {};
    this.serviceFunctions = {};
  }
  
  registerService(name, importFunction) {
    this.serviceFunctions[name] = importFunction;
  }
  
  async $(serviceName) {
    
    let self  = this;
    
    return new Promise(function(resolve, reject) {
      if (self.services.hasOwnProperty(serviceName)) {
        resolve(self.services[serviceName]);
      }
      else if (self.serviceFunctions.hasOwnProperty(serviceName)) {
        self.serviceFunctions[serviceName]().then(result => {
          self.services[serviceName] = new result.default();
          resolve(self.services[serviceName]);
        });
      }
      else {
        reject(`No such service ${serviceName}`);
      }
    });
  }
}

window.Carolina = new Carolina();