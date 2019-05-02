
/**
 * BaseField
 * Represents a field of a database schema.
 */
class BaseField {
  
  constructor(obj) {
    this.adminEdit = true;
    this.allowedValues = [];
    this.bannedValues = [];
    this.baseDataType = obj.baseDataType || "String";
    this.defaultValue = ('defaultValue' in obj) ? obj.defaultValue : null;
    this.description = obj.description || "Field description.";
    this.min = null;
    this.max = null;
    this.name = null;
    this.verbose = null;
    this.required = obj.required || false;
    if (obj.hasOwnProperty('adminEdit')) this.adminEdit = obj.adminEdit;
    if (obj.hasOwnProperty('allowedValues')) this.allowedValues = obj.allowedValues;
    if (obj.hasOwnProperty('min')) this.min = obj.min;
    if (obj.hasOwnProperty('max')) this.max = obj.max;
    if (obj.hasOwnProperty('name')) this.name = obj.name;
    if (obj.hasOwnProperty('verbose')) this.verbose = obj.verbose; 
  }
  
  getDefault() {
    return this.defaultValue;
  }
  
  /**
   * Validates the value. Returns an object. Success is a boolean
   * determining whether the value is valid. 
   * If the value is invalid, message should explain why.
   */
  validate(value) {
    if (value == null || value == undefined || value === '') {
      if (this.required) {
        return {
          success: false,
          message: "This field is required."
        }
      }
    }
    if (this.allowedValues.length > 0) {

      let ok = false;

      for (let i = 0; i < this.allowedValues.length; ++i) {
        if (value == this.allowedValues[i]) {
          
          ok = true;

          break;
        }
      }

      if (!ok) {
        return {
          success: false,
          message: "Value not in list of allowed values."
        };
      }
    }
    if (this.bannedValues.length > 0) {
      for (let i = 0; i < this.bannedValues.length; ++i) {
        if (value == this.bannedValues[i]) {
          return {
            success: false,
            message: "Value is in list of banned values."
          };
        }
      }
    }
    return { success: true };
  }
  
  /**
   * Translates value from database form to object form.
   */
  fromDb(value) { return value; }
  /**
   * Translates value from object form to database form.
   */
  toDb(value) { return value; }
  /**
   * Translates value from JSON form to object form.
   */
  fromJSON(value) { return value; }
  /**
   * Translates value from object form to JSON form.
   */
  toJSON(value) { return value; }
  
  /**
   * Operate on value in object form and return it prior to saving.
   */
  preSave(value) { 
    if (value == null) {
      return this.defaultValue;
    }
    else {
      return value;
    }
  }
}

exports = module.exports = BaseField;