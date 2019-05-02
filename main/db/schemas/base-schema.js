
/* global Carolina */

class BaseSchema {
  
  constructor(dateFields=true) {
    
    this.loaded = false;
    this.adminFields = [];
    this.fields = {};
    
    if (dateFields) {
      this.fields = {
        createdAt: { type: "Date", useCurrentTimeAsDefault: true, adminEdit: false },
        updatedAt: { type: "Date", updateOnSave: true, adminEdit: false }
      }
    }
    
    this.rules = [];
  }

  getLabel(obj) {
    return (obj._id || 'Unknown Object');
  }

  asJSON() {
    return {
      fields: this.fields,
      adminFields: this.adminFields
    };
  }
  
  load() {
    if (this.loaded) return;
    this.fieldObjects = {};
    for (let fieldName in this.fields) {
      this.fieldObjects[fieldName] = new (Carolina.$("DB")
        ._fieldClass(this.fields[fieldName].type))(this.fields[fieldName]);
    }
    this.loaded = true;
  }
  
  convert(obj, funcName) {
    
    this.load();
    
    let o = {};
    
    for (let fieldName in this.fieldObjects) {
      if (fieldName in obj) {
        o[fieldName] = this.fieldObjects[fieldName][funcName](obj[fieldName]);
      }
      else {
        
        let d = this.fieldObjects[fieldName].getDefault();
        
        if (funcName == 'toDB' || funcName == 'toJSON') {
          d = this.fieldObjects[fieldName][funcName](d);
        }
        
        o[fieldName]= d;
      }
    }
    
    if (obj._id) o._id = obj._id;
    return o;
  }
  
  validate(obj, throwError=false) {
    
    obj = this.preSave(obj);
    
    for (let fieldName in this.fieldObjects) {
      
      let validation = null;
      
      if (fieldName in obj) {
        validation = this.fieldObjects[fieldName].validate(obj[fieldName]);
      }
      else {
        validation = this.fieldObjects[fieldName].validate(null);
      }
      
      if (!validation.success) {
        
        let res = validation;
        res.field = fieldName;
        res.value = obj[fieldName];
        
        if (throwError) {
          let ValidationError = Carolina.$("Errors")._errorClass('ValidationError');
          throw new ValidationError(res.field, res.message,
            res.value);  
        }
        
        return res;
      }
    }

    let ValidationSvc = Carolina.$('Validation');

    for (let i = 0; i < this.rules.length; ++i) {

      let r = ValidationSvc._rule(this.rules[i].rule);
      let res = r.validate(this.rules[i].config, obj);

      // console.log(res);

      if (res.success == false) {
        
        if (throwError) {
          let ValidationError = Carolina.$("Errors")._errorClass('ValidationError');
          throw new ValidationError(this.rules[i].rule, res.message,
            null);  
        }

        return res;
      }
    }
    
    return { success: true };
  }
  
  /**
   * Translates object from database form to object form.
   */
  fromDb(obj) {
    return this.convert(obj, "fromDb");
  }
  /**
   * Translates object from object form to database form.
   */
  toDb(obj) {
    return this.convert(obj, "toDb");
  }
  /**
   * Translates object from JSON form to object form.
   */
  fromJSON(obj) {
    return this.convert(obj, "fromJSON");
  }
  /**
   * Translates object from object form to JSON form.
   */
  toJSON(obj) {
    return this.convert(obj, "toJSON");
  }
  
  preSave(obj) {
    return this.convert(obj, "preSave");
  }
}

exports = module.exports = BaseSchema;