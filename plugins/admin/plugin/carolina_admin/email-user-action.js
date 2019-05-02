
/* global Carolina */

const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

class EmailUserAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/EmailUserSchema';
    this.name = "E-Mail User.";
    this.description = "Sends an e-mail to the user's e-mail address via the default mailer.";
  }
  
  async handle(args, User, user) {
    
    let EmailSvc = Carolina.$('Email');
    await EmailSvc.sendEmail({
      from: args.from,
      to: [user.emailAddress],
      subject: args.subject,
      message: args.message
    });
    
    return {
      success: true,
      message: "Email sent."
    };
  }
}

exports = module.exports = EmailUserAction;