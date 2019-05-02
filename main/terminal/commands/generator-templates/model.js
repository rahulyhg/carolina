
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

/**
 * class {{ name }}Schema
 * Represents the schema for any {{ name }} object.
 */
class {{ name }}Schema extends BaseSchema {
  
  constructor() {
    
    super();
    
    this.table = "{{ slug }}";
    this.fields.name = { type: "String", required: true };
    // add more fields here
    
    // list fields to be shown in admin panel here
    this.adminFields = []
  }
}

const {{ name }}SchemaInstance = new {{ name }}Schema();

/**
 * class {{ name }}
 * Represents the {{ name }} object.
 */
class {{ name }} extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

{{ name }}.prototype.schema = {{ name }}SchemaInstance;

exports = module.exports = {{ name }};