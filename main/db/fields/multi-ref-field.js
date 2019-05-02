
const BaseField = require('carolina/main/db/fields/base-field');

class MultiRefField extends BaseField {
  
  constructor(obj) {

    obj.baseDataType = "Array";
    super(obj);

    this.model = null;
    this.defaultValue = [];
    if (obj.hasOwnProperty('model')) this.model = obj.model;
  }
  
  validate(value) {
    return super.validate(value);
  }
  
  toJSONIndividual(value) {
    // not sure what to do if mongoDb ID is not string
    if (value == null) return null;
    if (value.constructor.name != 'String') {
      if (value._id) return value._id;
    }
    
    return value;
  }
  
  preSaveIndividual(value) {
    // not sure what to do if mongoDb ID is not string
    if (value == null) return null;
    if (value.constructor.name != 'String') {
      if (value._id) return value._id;
    }
    
    return value;
  }
  
  toJSON(value) {
    
    let results = [];
    for (let i = 0; i < value.length; ++i) {
      results.push(this.toJSONIndividual(value[i]));
    }
    
    return results;
  }
  
  preSave(value) {
    
    let results = [];
    for (let i = 0; i < value.length; ++i) {
      results.push(this.preSaveIndividual(value[i]));
    }
    
    return results;
  }
}

exports = module.exports = MultiRefField;