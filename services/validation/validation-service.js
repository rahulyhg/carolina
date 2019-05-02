
const BaseService = require('carolina/services/base-service');

class BaseValidationService extends BaseService {
  
  constructor() {
    
    super('Validation');
    
    let carolinaRules = require('carolina/main/validation/rules');
    this._initializeLibrary('ruleClasses', 'rules', 'validation/rules',
      carolinaRules, "rule");
    
    let carolinaSchemas = require('carolina/main/validation/schemas');
    this._initializeLibrary("schemaClasses", "schemas", "validation/schemas",
      carolinaSchemas, "validation schema");
  }
  
  _rule(name) {
    return this._lazyLoadObject(name, 'ruleClasses', 'rules', "rule");
  }
  
  _schema(name) {
    return this._lazyLoadObject(name, 'schemaClasses', 'schemas',
      "validation schema");
  }
  
  /**
   * Uses the schema to validate the given object. Throws an error if requested,
   * otherwise returns an object.
   */
  validate(schemaName, obj, throwError=false) {
    let Schema = this._schema(schemaName);
    let objForm = Schema.fromJSON(obj);
    return Schema.validate(objForm, throwError);
  }
}

exports = module.exports = BaseValidationService;