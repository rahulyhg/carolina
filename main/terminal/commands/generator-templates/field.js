
const BaseField = require('carolina/main/db/fields/base-field');

/**
 * field {{ name }}
 * Represents some data.
 */
class {{ name }} extends BaseField {
  
  constructor(obj) {
    super(obj);
  }
  
  /**
   * Validate the value in object form.
   */
  validate(value) {
    if (value != null) {
      // validate here
    }
    return { success: true };
  }
  
  /**
   * Translates value from database form to object form.
   */
  fromDb(value) {
    return value;
  }
  /**
   * Translates value from object form to database form.
   */
  toDb(value) {
    return value;
  }
  /**
   * Translates value from JSON form to object form.
   */
  fromJSON(value) {
    return value;
  }
  /**
   * Translates value from object form to JSON form.
   */
  toJSON(value) {
    return value;
  }
  
  /**
   * Operate on value in object form and return it prior to saving.
   */
  preSave(value) {
    return value;
  }
}

exports = module.exports = {{ name }};