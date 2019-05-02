
/* global Carolina */

const path = require('path');

const fs = require('fs-extra');
const nunjucks = require('nunjucks');

class BaseMailer {

  constructor(obj) {
    this.name = obj.name;
    this.defaultFrom = obj.defaultFrom;
  }

  /**
   * Actually send the e-mail.
   * param {} obj
   *  obj.from    string   The from e-mail address.
   *  obj.to      []string E-mail addresses on the to line.
   *  obj.subject string   E-mail subject.
   *  obj.message string   E-mail body.
   */
  async sendEmail(obj) {}

  async sendNunjucksTemplate(template, data, obj) {

    obj.message = this.renderNunjucksTemplate(template, data);
    obj.from = obj.from || this.defaultFrom;
    await this.sendEmail(obj);
    
    let LoggerSvc = Carolina.$('Logger');
    LoggerSvc.log({
      source: 'Email',
      level: 5,
      message: `E-mail sent to ${obj.to.join(', ')}.`
    });
  }

  renderNunjucksTemplate(template, data) {

    let templateFile = path.resolve(process.cwd(), 'templates', template);
    let templateString = fs.readFileSync(templateFile).toString();

    let message = nunjucks.renderString(templateString, data);
    return message;
  }
}

exports = module.exports = BaseMailer;