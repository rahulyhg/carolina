
const BaseException = require('carolina/main/exceptions/base-exception');

/**
 * class {{ name }}
 * Representation of a throwable exception.
 */
class {{ name }} extends BaseException {
  constructor(message) {
    super("{{ name }}Exception", message)
  }
}

exports = module.exports = {{ name }};