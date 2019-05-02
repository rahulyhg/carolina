
class BaseAction {
  
  constructor() {
    
    this.schemaName = null;
    this.name = "Action Command";
    this.description = "This command does a thing.";
  }
  
  async handle(args, Model=null, instance=null) {
    
  }
  
}

exports = module.exports = BaseAction;