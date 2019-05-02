
const StringField = require('carolina/main/db/fields/string-field');

class TextField extends StringField {
  constructor(obj) {
    super(obj);
  }
}

exports = module.exports = TextField;