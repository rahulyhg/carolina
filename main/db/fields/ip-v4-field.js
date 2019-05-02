
const StringField = require('carolina/main/db/fields/string-field');

class IPv4Field extends StringField {
  constructor(obj) {
    obj.regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i;
    super(obj);
  }
}

exports = module.exports = IPv4Field;