
const BaseField = require('carolina/main/db/fields/base-field');

class BooleanField extends BaseField {
  
  constructor(obj) {
    obj.baseDataType = "Boolean";
    obj.defaultValue = obj.defaultValue || false;
    super(obj);
    this.requireTrue = obj.requireTrue || false;
  }
  
  validate(value) {
    if (value !== null) {
      if (value.constructor.name != 'Boolean') {
        return {
          success: false,
          message: "Must be a boolean."
        };
      }
      if (this.requireTrue) {
        if (value != true) {
          return {
            success: false,
            message: "Must be true."
          };
        }
      }
      return super.validate(value);
    }
    else {
      if (this.requireTrue) {
        return {
          success: false,
          message: "Must exist and be true."
        };
      }
    }

    return super.validate(value);
  }
}

exports = module.exports = BooleanField;