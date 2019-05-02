
/* global Carolina */

const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

class DeleteNonAdminAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/AreYouSureSchema';
    this.name = "Drop Non-Admin Users";
    this.description = "Deletes ALL users who are not admins..";
  }
  
  async handle(args, Model) {
    
    let allInstances = await Model.$query({ isAdmin: false });
    for (let i = 0; i < allInstances.length; ++i) {
      await allInstances[i]._delete();
    }
    
    return {
      success: true,
      message: "Users deleted."
    };
  }
}

exports = module.exports = DeleteNonAdminAction;