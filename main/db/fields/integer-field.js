
const NumberField = require('carolina/main/db/fields/number-field');

class IntegerField extends NumberField {
  
  constructor(obj) {
    obj.baseDataType = "String";
    super(obj);
  }
  
  validate(value) {
    if (value !== null) {
      if (parseInt(value) != parseFloat(value)) {
        return {
          success: false,
          message: "Must be an integer."
        };
      }
    }
    return super.validate(value);
  }
}

exports = module.exports = IntegerField;