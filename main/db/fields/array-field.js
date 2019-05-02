
const BaseField = require('carolina/main/db/fields/base-field');

class ArrayField extends BaseField {
  
  constructor(obj) {
    obj.baseDataType = "Array";
    if (!obj.hasOwnProperty('defaultValue')) {
      obj.defaultValue = [];
    }
    super(obj);
  }
  
  validate(value) {
    if (value !== null) {
      if (value.constructor.name !== 'Array') {
        return {
          success: false,
          message: "Must be an array."
        };
      }
      if (this.min != null && value.length < this.min) {
        return {
          success: false,
          message: `Must have at least ${this.min} items.`
        };
      }
      if (this.max != null && value.length > this.max) {
        return {
          success: false,
          message: `Must have at most ${this.max} items.`
        };
      }
    }
    return super.validate(value);
  }
}

exports = module.exports = ArrayField;