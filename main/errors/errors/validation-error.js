
const BaseError = require('carolina/main/errors/errors/base-error');

class ValidationError extends BaseError {
  
  constructor(fieldName, message, value) {
    super(`${fieldName} - ${message}`);
    this.name = 'ValidationError';
    this.description = "An object failed a validation test.";
    this.template = 'carolina/errors/error_types/validation';
    this.details = {
      fieldName: fieldName,
      message: message,
      value: value
    };
  }
}

exports = module.exports = ValidationError;