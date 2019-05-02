
const BaseRule = require('carolina/main/validation/rules/base-rule');

/**
 * Rule SamenessRule
 * Enforces that the given properties have the same value.
 */
class SamenessRule extends BaseRule {
  
  constructor() {
    super();
  }
  
  validate(config, obj) {

    // console.log("SamenessRule.validate");
    
    // set val to the first field's value
    let val = obj[config.fields[0]];

    for (let i = 1; i < config.fields.length; ++i) {
      // if a value is not the same, fail validation
      if (obj[config.fields[i]] != val) {
        return {
          success: false,
          message: `${config.fields[i]} does not have the same value as ${config.fields[0]}.`
        };
      }
    }

    return { success: true };
  }
}

exports = module.exports = SamenessRule;