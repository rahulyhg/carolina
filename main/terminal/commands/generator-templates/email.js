
const BaseEmail = require('carolina/main/email/base-email');

/**
 * class {{ name }}
 * Represents a sendable e-mail.
 */
class {{ name }} extends BaseEmail {
  
  constructor() {
    
  }
  
  /**
   * {{ name }}.build()
   * Builds the e-mail.
   */
  build(data={}) {
    return this.view("view-name", data);
  }
}

exports = module.exports = {{ name }};