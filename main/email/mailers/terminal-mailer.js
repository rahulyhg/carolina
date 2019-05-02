
const BaseMailer = require('carolina/main/email/mailers/base-mailer');

class TerminalMailer extends BaseMailer {

  constructor(obj) {
    super(obj);
  }

  async sendEmail(obj) {
    console.log();
    console.log(`From: ${obj.from}`);
    console.log(`To: ${obj.to.join(", ")}`);
    if (obj.cc) {
      console.log(`CC: ${obj.cc.join(", ")}`);
    }
    if (obj.bcc) {
      console.log(`BCC: ${obj.bcc.join(", ")}`);
    }
    console.log(`Subject: ${obj.subject}`);
    console.log();
    console.log(obj.message);
    console.log();
  }
}

exports = module.exports = TerminalMailer;