
/* global Carolina */

const BaseCommand = require('carolina/main/terminal/commands/base-command');

class CreateAdminUserCommand extends BaseCommand {

  constructor() {

    super();

    this.commandName = 'create-admin-user';
    this.description = "Creates an admin user account.";
    this.args = [
      {
        arg: ['-u', '--username'],
        options: {
          defaultValue: 'admin',
          help: "The username for the admin account."
        }
      },
      {
        arg: ['-e', '--email'],
        options: {
          defaultValue: 'admin@example.com',
          help: "The e-mail address for the admin account."
        }
      },
      {
        arg: ['-p', '--password'],
        options: {
          defaultValue: 'password123',
          help: "The password for the admin account."
        }
      },
    ];
  }

  async handle(args) {

    let AuthSvc = Carolina.$('Carolina/Auth');
    let regSuccess = await AuthSvc.register(args.username, args.email,
      args.password);

    if (!regSuccess.success) {
      
      this.err(regSuccess.message);

      return 1;
    }

    let user = regSuccess.user;
    user.isAdmin = true;
    await user._save();

    this.success("Admin account created.");

    return 0;
  }
}

exports = module.exports = {
  'Carolina/Admin/CreateAdminUserCommand': CreateAdminUserCommand
};