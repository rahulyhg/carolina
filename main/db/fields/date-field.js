
const moment = require('moment');

const BaseField = require('carolina/main/db/fields/base-field');

class DateField extends BaseField {
  
  constructor(obj) {
    obj.baseDataType = "Date";
    super(obj);
    this.updateOnSave = obj.updateOnSave || false;
    this.useCurrentTimeAsDefault = obj.useCurrentTimeAsDefault || false;
  }
  
  getDefault() {
    if (this.useCurrentTimeAsDefault) {
      return moment();
    }
    else {
      return null;
    }
  }
  
  validate(value) {
    if (value !== null) {
      if (value.constructor.name != 'Moment') {
        return {
          success: false,
          message: "Must be a valid date."
        }
      }
      if (this.min != null) {
        let min = moment(this.min);
        if (value.isBefore(min)) {
          return {
            success: false,
            message: `Value must be at or after ${min.format()}.`
          };
        }
      }
      if (this.max != null) {
        let max = moment(this.max);
        if (value.isAfter(max)) {
          return {
            success: false,
            message: `Value must be at or before ${max.format()}.`
          };
        }
      }
    }
    return super.validate(value);
  }
  
  fromDb(value) {
    if (value == null) return null;
    return moment(value);
  }
  toDb(value) {
    if (value == null) return null;
    return value.toDate();
  }
  
  fromJSON(value) {
    if (value == null) return null;
    return moment(value);
  }
  toJSON(value) {
    if (value == null) return null;
    return value.format();
  }
  
  preSave(value) {
    if (this.updateOnSave) {
      return moment();
    }
    else {
      return value;
    }
  }
}

exports = module.exports = DateField;