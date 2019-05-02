
/* global Carolina */

const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

class DropTableAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/AreYouSureSchema';
    this.name = "Drop Table";
    this.description = "Deletes ALL items in this model.";
  }
  
  async handle(args, Model) {
    
    let allInstances = await Model.$all();
    for (let i = 0; i < allInstances.length; ++i) {
      await allInstances[i]._delete();
    }
    
    return {
      success: true,
      message: "Instances deleted."
    };
  }
}

exports = module.exports = DropTableAction;