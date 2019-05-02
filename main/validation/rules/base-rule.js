
/**
 * Defines a schema validation rule to apply against entire object.
 */
class BaseRule {
  
  constructor() {
    
  }
  
  validate(config, obj) {
    return {
      success: true
    };
  }
}

exports = module.exports = BaseRule;