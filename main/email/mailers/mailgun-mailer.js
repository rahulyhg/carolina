
const mailgun = require('mailgun-js');

const BaseMailer = require('carolina/main/email/mailers/base-mailer');

class MailgunMailer extends BaseMailer {
  
  constructor(obj) {
    
    super(obj);
    this.mailgunDomain = obj.mailgunDomain;
    this.mailgunApiKey = obj.mailgunApiKey;
    
    this.mailgun = mailgun({
      apiKey: this.mailgunApiKey,
      domain: this.mailgunDomain
    });
  }
  
  async sendEmail(obj) {
    return new Promise((resolve, reject) => {
      
      let data = {
        from: obj.from,
        to: obj.to.join(", "),
        subject: obj.subject,
        text: obj.message
      };
      
      if (obj.cc) {
        data.cc = obj.cc.join(", ");
      }
      if (obj.bcc) {
        data.bcc = obj.bcc.join(", ");
      }
      if (obj.isHtml) {
        data.html = obj.message;
      }
      
      this.mailgun.messages().send(data, (err, body) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

exports = module.exports = MailgunMailer;