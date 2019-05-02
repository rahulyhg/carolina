
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class FixtureRefSchema extends BaseSchema {
  
  constructor() {

    super();

    this.table = 'fixture_ref';
    this.fields.name = { type: 'String', name: 'Name' };
    this.fields.group = { type: 'String', name: 'Subgroup' };
    this.fields.ref = { type: 'String', name: 'Reference Name' };
    this.fields.model = { type: 'String', name: 'Model' };
    this.fields.instanceId = { type: 'String', name: "Instance ID" };
    this.adminFields = ['name', 'group', 'ref', 'model', 'instanceId'];
  }
}

const FixtureRefSchemaInstance = new FixtureRefSchema();

class FixtureRef extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

FixtureRef.prototype.schema = FixtureRefSchemaInstance;

exports = module.exports = FixtureRef;