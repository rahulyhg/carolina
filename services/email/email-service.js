
/* global Carolina */

const BaseService = require('carolina/services/base-service');

class EmailService extends BaseService {

  constructor() {

    super("Email");

    let carolinaMailers = require('carolina/main/email/mailers');
    this._initializeLibrary("mailerClasses", "mailers", "email/mailers",
      carolinaMailers, "mailer");
    
    let mailers = Carolina.config('email.mailers', {});
    for (let mailerName in mailers) {
      let MailerClass = this._mailerClass(
        mailers[mailerName].driver);
      mailers[mailerName].name = mailerName;
      this.mailers[mailerName] = new MailerClass(mailers[mailerName]);
    }
  }

  _mailerClass(name) {
    return this._loadClass(name, 'mailerClasses', 'mailer');
  }

  async sendEmail(obj, mailer='default') {
    obj.from = obj.from || this.mailers['default'].defaultFrom;
    await this.mailers[mailer].sendEmail(obj);
  }
  async sendNunjucksTemplate(template, data, obj, mailer='default') {
    await this.mailers[mailer].sendNunjucksTemplate(template, data, obj);
  }
}

exports = module.exports = EmailService;