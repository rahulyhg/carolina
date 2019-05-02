
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class {{ name }} extends BaseSchema {
  
  constructor() {
    
    super();
    
    // add fields here
    
    // this.fields.name = { type: "String" };
  }
}

exports = module.exports = {{ name }};