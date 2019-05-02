
const BaseService = require('carolina/services/base-service');

class BaseViewsService extends BaseService {
  
  constructor() {
    
    super();
    
    let includedViews = require('carolina/main/views');
    this._initializeLibrary("viewClasses", "views", "views", includedViews, "view");
  }
  
  _view(name) {
    return this._lazyLoadObject(name, "viewClasses", "views", "view");
  }
}

exports = module.exports = BaseViewsService;