
const BaseField = require('carolina/main/db/fields/base-field');

class JsonField extends BaseField {
  
  constructor(obj) {
    obj.baseDataType = "Object";
    super(obj);
    this.format = true;
    if (obj.hasOwnProperty('format')) this.format = obj.format;
  }
  
  validate(value) {
    if (value !== null) {
      if (value.constructor.name !== 'Array' && value.constructor.name !== 'Object') {
        return {
          success: false,
          message: "Value must be an array or an object."
        };
      }
    }
    return super.validate(value);
  }
  
  fromDb(value) {
    if (typeof value == 'string') {
      return JSON.parse(value);
    }
    else {
      return value;
    }
  }
  toDb(value) {
    return value;
  }
  
  fromJSON(value) {
    if (typeof value == 'string') {
      return JSON.parse(value);
    }
    else {
      return value;
    }
  }
  toJSON(value) {
    if (this.format) {
      return JSON.stringify(value, null, 2);
    }
    else {
      return JSON.stringify(value);
    }
  }
}

exports = module.exports = JsonField;