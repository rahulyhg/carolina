
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class RoleSchema extends BaseSchema {
  
  constructor() {

    super();

    this.table = 'role';
    this.fields.name = { type: 'String', name: "Name", required: true };
    this.fields.permissions =  { type: 'Json', defaultValue: [] };
  }
  
  getLabel(obj) {
    return obj.name;
  }
}

const RoleSchemaInstance = new RoleSchema();

class Role extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

Role.prototype.schema = RoleSchemaInstance;

exports = module.exports = Role;