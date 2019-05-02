
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class FixtureSchema extends BaseSchema {
  
  constructor() {

    super();

    this.table = 'fixture';
    this.fields.name = { type: 'String', name: 'Name' };
    this.fields.group = { type: 'String', name: 'Subgroup' };
    this.fields.isLoaded = { type: 'Boolean', name: 'Loaded' };
    this.adminFields = ['name', 'group', 'isLoaded'];
  }
}

const FixtureSchemaInstance = new FixtureSchema();

class Fixture extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

Fixture.prototype.schema = FixtureSchemaInstance;

exports = module.exports = Fixture;