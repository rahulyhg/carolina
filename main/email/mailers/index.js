
/**
 * Carolina mailers.
 */
exports = module.exports = {
  FileMailer: require('./file-mailer'),
  MailgunMailer: require('./mailgun-mailer'),
  TerminalMailer: require('./terminal-mailer')
};