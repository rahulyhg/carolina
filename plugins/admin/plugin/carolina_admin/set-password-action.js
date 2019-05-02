
/* global Carolina */

const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

class SetPasswordAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/PasswordSchema';
    this.name = "Set User password.";
    this.description = "Sets the user's password to the given value.";
  }
  
  async handle(args, User, user) {
    
    user.setPassword(args.password);
    await user._save();
    
    return {
      success: true,
      message: "Password reset."
    };
  }
}

exports = module.exports = SetPasswordAction;