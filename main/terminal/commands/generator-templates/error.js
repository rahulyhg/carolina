
const BaseError = require('carolina/main/errors/errors/base-error');

/**
 * class {{ name }}
 * Represents an error that can be thrown by the application.
 */
class {{ name }} extends BaseError {
  constructor(msg) {
    super(msg);
    this.name = "{{ name }}";
    this.description = "A general description of this error type.";
  }
}

exports = module.exports = {{ name }};