
const BaseRule = require('carolina/main/validation/rules/base-rule');

/**
 * Rule {{ name }}
 * Defines a schema validation rule to apply against entire object.
 */
class {{ name }} extends BaseRule {
  
  constructor() {
    super();
  }
  
  validate(config, obj) {
    return {
      success: true
    };
  }
}

exports = module.exports = {{ name }};