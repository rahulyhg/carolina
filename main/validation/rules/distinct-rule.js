
const BaseRule = require('carolina/main/validation/rules/base-rule');

/**
 * Rule DistinctRule
 * Enforces that the given properties are all different values.
 */
class DistinctRule extends BaseRule {
  
  constructor() {
    super();
  }
  
  validate(config, obj) {
    
    let seenValues = [];
    
    for (let i = 0; i < config.fields.length; ++i) {
      if (obj.hasOwnProperty(config.fields[i])) {
        
        let v = obj[config.fields[i]];
        if (this.seenValues.indexOf(v) != -1) {
          return {
            success: false,
            message: `Non-allowed duplicate value.`,
            field: config.fields[i]
          };
        }
        
        seenValues.push(v);
      }
    }
    
    return { success: true };
  }
}

exports = module.exports = DistinctRule;