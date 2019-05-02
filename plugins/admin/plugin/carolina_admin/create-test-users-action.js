
/* global Carolina */

const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

class CreateTestUsersAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/CreateTestUsersSchema';
    this.name = "Create Test Users";
    this.description = "Creates a given number of test user accounts with mailinator e-mail addresses.";
  }
  
  async handle(args, User) {
    
    let AuthSvc = Carolina.$('Carolina/Auth');
    
    for (let i = 0; i < args.count; ++i) {
      
      let res = await AuthSvc.register(
        `${args.usernamePrefix}${i}`,
        `${args.usernamePrefix}${i}@mailinator.com`,
        args.password
      );
      if (!res.success) {
        return res;
      }
    }
    
    return {
      success: true,
      message: "New users created."
    };
  }
}

exports = module.exports = CreateTestUsersAction;