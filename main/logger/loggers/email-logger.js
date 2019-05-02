
const BaseLogger = require('carolina/main/logger/loggers/base-logger');

/**
 * EmailLogger
 * Sends log events via e-mail.
 */
class EmailLogger extends BaseLogger {

  constructor(obj) {
    super(obj);
    this.mailer = obj.mailer || 'default';
    this.mailfrom = obj.mailfrom;
    this.mailto = obj.mailto;
    this.subject = obj.subject || "New Log Entry";
  }

  async log(source, time, level, message) {

    // don't log e-mail logs (to avoid infinite sequence)
    if (source == 'Email') { return; }
    let EmailSvc = Carolina.$('Email');

    EmailSvc.sendNunjucksTemplate(
      'carolina/email/log.txt',
      {
        time: time.format(),
        source: source,
        levelString: this.getLevelString(level),
        message: message
      }, {
        from: this.mailfrom,
        to: this.mailto,
        subject: this.subject
      },
      this.mailer
    );
  }
}

exports = module.exports = EmailLogger;