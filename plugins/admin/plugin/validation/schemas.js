
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class AreYouSureSchema extends BaseSchema {
  
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.sure = { type: 'Boolean', name: "Are you sure?", requireTrue: true };
  }
}

class CreateTestUsersSchema extends BaseSchema {
  
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.usernamePrefix = { type: 'String', name: 'Username Prefix', required: true };
    this.fields.password = { type: 'String', required: true };
    this.fields.count = { type: 'Integer', min: 1, max: 100, defaultValue: 10, required: true };
  }
}

class EmailUserSchema extends BaseSchema {
  constructor() {
    
    super(false);
    
    this.fields.from = { type: 'Email', name: "From E-mail (optional)" };
    this.fields.subject = { type: 'String', defaultValue: "" };
    this.fields.message = { type: 'Text', defaultValue: "Hello!" };
  }
}

class PasswordSchema extends BaseSchema {
  constructor() {
    
    super(false);
    
    this.fields.password = { type: 'String', name: "New Password", required: true };
  }
}

exports = module.exports = {
  'Carolina/Admin/AreYouSureSchema': AreYouSureSchema,
  'Carolina/Admin/CreateTestUsersSchema': CreateTestUsersSchema,
  'Carolina/Admin/EmailUserSchema': EmailUserSchema,
  'Carolina/Admin/PasswordSchema': PasswordSchema
};