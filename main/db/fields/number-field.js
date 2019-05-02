
const BaseField = require('carolina/main/db/fields/base-field');

class NumberField extends BaseField {
  
  constructor(obj) {
    obj.baseDataType = "Float";
    super(obj);
  }
  
  validate(value) {
    if (value !== null) {
      if (isNaN(parseFloat(value))) {
        return {
          success: false,
          message: "Must be a number."
        };
      }
      if (this.min != null) {
        if (value < this.min) {
          return {
            success: false,
            message: `Value must be at least ${this.min}.`
          };
        }
      }
      if (this.max != null) {
        if (value > this.max) {
          return {
            success: false,
            message: `Value must be at most ${this.max}.`
          };
        }
      }
    }
    return super.validate(value);
  }
}

exports = module.exports = NumberField;