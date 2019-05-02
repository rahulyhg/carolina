
const BaseMailer = require('carolina/main/email/mailers/base-mailer');

/**
 * class {{ name }}
 * Send e-mails.
 */
class {{ name }} extends BaseMailer {

  constructor(obj) {
    super(obj);
  }

  async sendEmail(obj) {
    
    /**
     * obj.from will be the from e-mail address
     * obj.to will be a list of e-mail addresses
     * obj.subject will be the subject line
     * obj.message will be the e-mail body
     * obj.cc may exist, a list of e-mail addresses
     * obj.bcc may exist, a list of e-mail addresses
     * obj.isHtml, may exist, if true, e-mail should be sent as HTML
     */
    
    // send the e-mail in here.
  }
}

exports = module.exports = {{ name }};