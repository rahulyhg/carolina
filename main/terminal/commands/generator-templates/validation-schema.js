
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class {{ name }} extends BaseSchema {
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.name = { type: 'String', required: true };
  }
}

exports = module.exports = {{ name }};