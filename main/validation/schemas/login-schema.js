
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class LoginSchema extends BaseSchema {
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.username = { type: 'String', required: true };
    this.fields.password = { type: 'String', required: true };
  }
}

exports = module.exports = LoginSchema;