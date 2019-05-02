
const BaseService = require('carolina/services/base-service');

class AdminService extends BaseService {

  constructor() {

    super("Carolina/Admin");

    this._initializeLibrary('actionClasses', 'actions',
      'carolina_admin/actions', {}, "action");
  }

  _action(name) {
    return this._lazyLoadObject(name, 'actionClasses', 'actions', "action");
  }

  executeAction(actionName, args, Model=null, instance=null) {
    
  }
}

exports = module.exports = AdminService;