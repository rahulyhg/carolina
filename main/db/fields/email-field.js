
const StringField = require('carolina/main/db/fields/string-field');

class EmailField extends StringField {
  constructor(obj) {
    obj.regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    super(obj);
  }
}

exports = module.exports = EmailField;