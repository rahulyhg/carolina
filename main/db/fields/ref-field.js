
const BaseField = require('carolina/main/db/fields/base-field');

class RefField extends BaseField {
  
  constructor(obj) {

    obj.baseDataType = "String";
    super(obj);

    this.model = null;
    if (obj.hasOwnProperty('model')) this.model = obj.model;
  }
  
  validate(value) {
    return super.validate(value);
  }
  
  toJSON(value) {
    // not sure what to do if mongoDb ID is not string
    if (value == null) return null;
    if (value.constructor.name != 'String') {
      if (value._id) return value._id;
    }
    
    return value;
  }
  
  preSave(value) {
    // not sure what to do if mongoDb ID is not string
    if (value == null) return null;
    if (value.constructor.name != 'String') {
      if (value._id) return value._id;
    }
    
    return value;
  }
}

exports = module.exports = RefField;