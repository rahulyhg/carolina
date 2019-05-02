
const BaseValidation = require('carolina/main/validation/base-validation');

/**
 * class {{ name }}
 * Represents a validation rule that can be use for validating input.
 */
class {{ name }} extends BaseValidation {
  
  /**
   * {{ name }}.passes()
   * Determines whether or not the rule passes for a given attribute name and
   * passed value.
   * 
   * @param attribute String The name of the attribute.
   * @param value     any    The value.
   */
   passes(attribute, value) {
     return true;
   }
   
   /**
    * {{ name }}.getFailureMessage()
    * Returns a message string for failed validation.
    * 
    * @param attribute String The name of the attribute.
    * @param value     any    The value.
    */
  getFailureMessage(attribute, value) {
    return "Validation failed.";
  }
}

exports = module.exports = {{ name }};