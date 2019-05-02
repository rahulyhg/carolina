
/* global Carolina */

class BaseModel {
  
  constructor(obj) {
    
    // this.schema = schema;
    this.schema.load();
    let objectForm = this.schema.fromJSON(obj);
    
    for (let fieldName in objectForm) {
      this[fieldName] = objectForm[fieldName];
    }
    
    this._id = null;
    // ID must be a string
    if (obj.hasOwnProperty('_id')) this._id = obj._id.toString();
    
    this._populatedFields = [];
  }

  _getAdminLabel() {
    return this.schema.getLabel(this);
  }
  
  async _populate(fieldNames) {
    for (let i = 0; i < fieldNames.length; ++i) {
      if (fieldNames[i] in this._populatedFields) {
        continue;
      }

      if (this.schema.fields[fieldNames[i]].type == 'Ref') {
        this[fieldNames[i]] = await Carolina.$('DB')._modelClass(
          this.schema.fields[fieldNames[i]].model).$get({
            _id: this[fieldNames[i]]
          });
        this._populatedFields.push(fieldNames[i]);
      }
      else if (this.schema.fields[fieldNames[i]].type == 'MultiRef') {
        
        let populatedValues = [];
        
        for (let j = 0; j < this[fieldNames[i]].length; ++j) {
          let inst = await Carolina.$('DB')._modelClass(
            this.schema.fields[fieldNames[i]].model).$get({
              _id: this[fieldNames[i]][j]
            });
          populatedValues.push(inst);
        }
        this[fieldNames[i]] = populatedValues;
        this._populatedFields.push(fieldNames[i]);
      }
    }
  }
  
  _validate() {
    
    let objObject = this.schema.preSave(this);
    let validation = this.schema.validate(objObject);
    
    if (!validation.success) {
      let ValidationError = Carolina.$("Errors")._errorClass('ValidationError');
      throw new ValidationError(validation.field, validation.message,
        validation.value);
    }
  }

  static async $all(options={}) {
    
    let schema = this.prototype.schema;
    let dbObjects = await Carolina.$("DB")._all(schema.table, options);
    
    if (dbObjects.length == 0) return [];
    
    let oArray = [];
    
    for (let i = 0; i < dbObjects.length; ++i) {
      
      let objectForm = schema.fromDb(dbObjects[i]);

      let o = new this(schema.toJSON(objectForm));
      oArray.push(o);
    }
    
    return oArray;
  }
  
  static async $query(q, options={}) {
    
    let schema = this.prototype.schema;
    let dbObjects = await Carolina.$("DB")._query(schema.table, q, options);
    
    if (dbObjects.length == 0) return [];
    
    let oArray = [];
    
    for (let i = 0; i < dbObjects.length; ++i) {
      
      let objectForm = schema.fromDb(dbObjects[i]);

      let o = new this(schema.toJSON(objectForm));
      oArray.push(o);
    }
    
    return oArray;
  }
  static async $get(q, options={}) {
    
    let schema = this.prototype.schema;
    let dbObject = await Carolina.$("DB")._get(schema.table, q, options);
    
    if (dbObject == null) return null;
    let objectForm = schema.fromDb(dbObject);

    let o = new this(schema.toJSON(objectForm));
    return o;
  }
  static async $getOrNew(q) {
    let existing = await this.$get(q);
    if (existing != null) {
      return existing;
    }
    else {
      return new this(q);
    }
  }
  static async $lookup(id, options={}) {
    
    let schema = this.prototype.schema;
    let dbObject = await Carolina.$("DB")._lookup(schema.table, id, options);
    
    if (dbObject == null) return null;
    
    let objectForm = schema.fromDb(dbObject);
    return new this(schema.toJSON(objectForm));
  }
  static async $update(q, o, options={}) {
    
    let schema = this.prototype.schema;
    let updateCount = await Carolina.$('DB')._update(schema.table, q, o,
      options);
    
    return updateCount;
  }
  
  async _save() {
    
    this.schema.load();
    let objObject = this.schema.preSave(this);
    let validation = this.schema.validate(objObject);
    if (!validation.success) {
      let ValidationError = Carolina.$("Errors")._errorClass('ValidationError');
      throw new ValidationError(validation.field, validation.message,
        validation.value);
    }
    let dbObject = this.schema.toDb(objObject);
    if (!this._id) {
      let i = await Carolina.$("DB")._create(this.schema.table, dbObject);
      this._id = i;
      return i;
    }
    else {
      let c = await Carolina.$("DB")._update(this.schema.table,
        { _id: this._id},
        dbObject);
      return this._id;
    }
  }
  
  async _delete() {
    this.schema.load();
    await Carolina.$("DB")._delete(this.schema.table, { _id: this._id });
  }
  
  _update(obj, options={}) {
    
    this.schema.load();
    
    for (let fieldName in obj) {
      if (this.schema.fieldObjects.hasOwnProperty(fieldName)) {
        if (options.enforceAdminEdit) {
          if (this.schema.fieldObjects[fieldName].adminEdit == true) {
            // console.log(this.schema.fieldObjects[fieldName]);
            this[fieldName] = this.schema.fieldObjects[fieldName].fromJSON(obj[fieldName]);
          }
        }
        else {
          this[fieldName] = this.schema.fieldObjects[fieldName].fromJSON(obj[fieldName]);
        }
      }
    }
  }
  
  _is(other) {
    return (this._id.toString() == other._id.toString());
  }
  
  _toDb() {
    return this.schema.toDb(this);
  }
  _toJSON() {
    return this.schema.toJSON(this);
  }
}

exports = module.exports = BaseModel;