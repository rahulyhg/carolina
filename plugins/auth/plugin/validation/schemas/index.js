
/* global Carolina */

const BaseSchema = require('carolina/main/db/schemas/base-schema');

class ForgotPasswordInputSchema extends BaseSchema {
  constructor() {

    super(false);

    this.fields.email = { type: 'Email', required: true };
  }
}

class LoginInputSchema extends BaseSchema {
  constructor() {

    super(false);

    this.fields.username = { type: 'String', required: true };
    this.fields.password = { type: 'String', required: true };
  }
}

class RegisterInputSchema extends BaseSchema {
  constructor() {

    super(false);

    let usernameRegex = Carolina.config('carolina_auth.usernameRegex', null);
    let passwordRegex = Carolina.config('carolina_auth.passwordRegex', null);
    
    this.fields.username = { type: 'String', required: true, regex: usernameRegex };
    this.fields.email = { type: 'Email', required: true };
    this.fields.password1 = { type: 'String', required: true, regex: passwordRegex };
    this.fields.password2 = { type: 'String', required: true, regex: passwordRegex };

    this.rules = [
      { rule: 'SamenessRule', config: { fields: [ 'password1', 'password2' ] } }
    ];
  }
}

class ResetPasswordInputSchema extends BaseSchema {
  constructor() {

    super(false);

    let passwordRegex = Carolina.config('carolina_auth.passwordRegex', null);

    this.fields.password1 = { type: 'String', required: true, regex: passwordRegex };
    this.fields.password2 = { type: 'String', required: true, regex: passwordRegex };

    this.rules = [
      { rule: 'SamenessRule', config: { fields: [ 'password1', 'password2' ] } }
    ];
  }
}

exports = module.exports = {
  'Carolina/Auth/ForgotPasswordInputSchema': ForgotPasswordInputSchema,
  'Carolina/Auth/LoginInputSchema': LoginInputSchema,
  'Carolina/Auth/RegisterInputSchema': RegisterInputSchema,
  'Carolina/Auth/ResetPasswordInputSchema': ResetPasswordInputSchema
};