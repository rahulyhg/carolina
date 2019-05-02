
const BaseField = require('carolina/main/db/fields/base-field');

class StringField extends BaseField {
  
  constructor(obj) {

    obj.baseDataType = "String";
    super(obj);

    this.regex = null;
    if (obj.hasOwnProperty('regex')) this.regex = obj.regex;
  }
  
  validate(value) {
    if (value !== null) {
      if (value.constructor.name !== 'String') {
        return {
          success: false,
          message: "Must be a string."
        };
      }
      if (this.min != null && value.length < this.min) {
        return {
          success: false,
          message: `Must be at least ${this.min} characters.`
        };
      }
      if (this.max != null && value.length > this.max) {
        return {
          success: false,
          message: `Must be at most ${this.max} characters.`
        };
      }
      if (this.regex != null) {
        if (!(this.regex.constructor.name == 'RegExp')) {
          this.regex = new RegExp(this.regex);
        }
        if (!this.regex.test(value)) {
          return {
            success: false,
            message: `Value does not match regex pattern: ${this.regex}`
          };
        }
      }
    }
    return super.validate(value);
  }
}

exports = module.exports = StringField;