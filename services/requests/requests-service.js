
/* global Carolina */

const BaseService = require('carolina/services/base-service');

class RequestsService extends BaseService {
  
  constructor() {
    
    super("Requests");
    
    let carolinaBrowsers = require('carolina/main/requests/browsers');
    this._initializeLibrary("browserClasses", "browsers", "requests/browsers",
      carolinaBrowsers, "browser");
      
    let browsers = Carolina.config('requests.browsers', {});
    for (let browserName in browsers) {
      let BrowserClass = this._browserClass(browsers[browserName].driver);
      browsers[browserName].name = browserName;
      this.browsers[browserName] = new BrowserClass();
      this.browsers[browserName].configure(browsers[browserName], browserName);
    }
  }
  
  _browserClass(name) {
    return this._loadClass(name, "browserClasses", "browser");
  }
  
  async get(obj, browser='default') {
    return await this.browsers[browser].get(obj);
  }
  async post(obj, browser='default') {
    return await this.browsers[browser].post(obj);
  }
  async put(obj, browser='default') {
    return await this.browsers[browser].put(obj);
  }
  async patch(obj, browser='default') {
    return await this.browsers[browser].patch(obj);
  }
  async delete(obj, browser='default') {
    return await this.browsers[browser].delete(obj);
  }
}

exports = module.exports = RequestsService;