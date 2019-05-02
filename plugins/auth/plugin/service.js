
/* global Carolina */

const moment = require('moment');

const generateId = require('carolina/_lib/generate-id');

const BaseService = require('carolina/services/base-service');

class AuthService extends BaseService {

  constructor() {
    
    super('Carolina/Auth');

    this.throttleTimer = {};
    this.failedAttempts = {};
  }

  checkThrottle(identifier, ip) {
    
    let key = `${identifier}|${ip}`;
    if (this.throttleTimer.hasOwnProperty(key)) {
      if (moment().isBefore(this.throttleTimer[key])) {

        Carolina.$('Logger').warn(
          `User ${identifier} from ${ip} attempted to log in while throttled.`,
          'Auth');

        return false;
      }
      else {
        delete this.throttleTimer[key];
      }
    }

    return true;
  }
  
  registerFailedAttempt(identifier, ip) {

    let allowedAttempts = Carolina.config(
      'carolina_auth.throttleAttemptLimit', 4);
    let backoffTime = Carolina.config(
      'carolina_auth.throttleBackoffTime', { seconds: 60 });

    let key = `${identifier}|${ip}`;
    if (this.failedAttempts.hasOwnProperty(key)) {
      this.failedAttempts[key] += 1;
      if (this.failedAttempts[key] == allowedAttempts) {
        this.throttleTimer[key] = moment().add(backoffTime);
      }
    }
    else {
      this.failedAttempts[key] = 1;
    }
    
    Carolina.$('Logger').info(
      `Bad login attempt by ${identifier} from ${ip}.`,
      'Auth');
  }

  async forgotPasswordEmail(emailAddress) {

    let DBSvc = Carolina.$('DB');
    let User = DBSvc._modelClass('User');
    let user = await User.$get({ emailAddress: emailAddress });

    if (user) {

      let resetToken = user.resetPasswordAndGetToken();
      await user._save();
      
      let baseUrl = `${Carolina.config('app.url')}${Carolina.config('carolina_auth.mount', '/auth')}/forgot`;
      let EmailSvc = Carolina.$('Email');

      EmailSvc.sendNunjucksTemplate(
        Carolina.config('carolina_auth.templates', {}).resetPassEmail || 'carolina/auth/reset_pass.txt',
        { user: user, baseUrl: baseUrl },
        {
          from: Carolina.config('carolina_auth.forgotEmailSender') || 'webmaster@example.com',
          to: [user.emailAddress],
          subject: Carolina.config('carolina_auth.forgotEmailSubject') || 'Password Reset Link',
        },
        Carolina.config('carolina_auth.forgotEmailMailer') || 'default'
      );
    }

    return;
  }

  async sendEmailVerificationLink(user) {

    user.emailVerificationToken = generateId();
    await user._save();

    let baseUrl = `${Carolina.config('app.url')}${Carolina.config('carolina_auth.mount', '/auth')}/verify`;
    let EmailSvc = Carolina.$('Email');

    EmailSvc.sendNunjucksTemplate(
        Carolina.config('carolina_auth.templates', {}).emailVerificationEmail || 'carolina/auth/email_verification.txt',
        { user: user, baseUrl: baseUrl },
        {
          from: Carolina.config('carolina_auth.forgotEmailSender') || 'webmaster@example.com',
          to: [user.emailAddress],
          subject: Carolina.config('carolina_auth.verifyEmailSubject') || 'Email Verification Link',
        },
        Carolina.config('carolina_auth.forgotEmailMailer') || 'default'
      );

    return;
  }

  async login(identifier, password) {

    let DBSvc = Carolina.$('DB');
    let User = DBSvc._modelClass('User');
    let user = null;

    if (identifier.indexOf('@') != -1) {
      user = await User.$get({ emailAddress: identifier });
    }
    else {
      user = await User.$get({ username: identifier });
    }

    if (!user) {
      return null;
    }

    let success = user.checkPassword(password);
    if (success) {

      let LoginEvent = Carolina.$('Events')._eventClass(
        'Carolina/Auth/LoginEvent');
      let event = new LoginEvent(user);

      event.fire();

      Carolina.$('Logger').verbose(`User ${user.username} logged in.`, 'Auth');

      return user;
    }
    else {

      let LoginFailureEvent = Carolina.$('Events')._eventClass(
        'Carolina/Auth/LoginFailureEvent');
      let event = new LoginFailureEvent(identifier);

      event.fire();

      return null;
    }
  }

  async register(username, emailAddress, password) {

    let DBSvc = Carolina.$('DB');
    let User = DBSvc._modelClass('User');

    let existingUsernameUser = await User.$get({
      username: username
    });
    if (existingUsernameUser) {
      return {
        success: false,
        message: "That username is taken."
      };
    }
    
    let existingEmailUser = await User.$get({ emailAddress: emailAddress });
    if (existingEmailUser) {
      return {
        success: false,
        message: "That e-mail address is already in use."
      };
    }

    let user = new User({
      username: username,
      emailAddress: emailAddress,
      isAdmin: false
    });
    user.setPassword(password);
    await user._save();

    let RegistrationEvent = Carolina.$('Events')._eventClass(
      'Carolina/Auth/RegistrationEvent');

    let event = new RegistrationEvent(user);
    event.fire();

    Carolina.$('Logger').info(`New user ${user.username} registered.`, 'Auth');

    if (Carolina.config('carolina_auth.requireEmailVerification', false)) {
      await this.sendEmailVerificationLink(user);
    }
    else if (Carolina.config('carolina_auth.sendEmailVerification', false)) {
      await this.sendEmailVerificationLink(user);
    }

    return {
      user,
      success: true
    };
  }
}

exports = module.exports = AuthService;