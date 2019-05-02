
/* global Carolina */

const BaseController = require('carolina/main/http/controllers/base-controller');

class AuthController extends BaseController {

  constructor() {
    
    super();

    this.templates = Carolina.config('carolina_auth.templates', {});
  }
  
  async handle(request, data={}) {
    return this.sendText("Auth Controller");
  }

  async forgot(request, data={}) {

    if (request.method == 'POST') {
      
      let ValidationSvc = Carolina.$('Validation');
      let res = ValidationSvc.validate('Carolina/Auth/ForgotPasswordInputSchema', 
        request.data);

      if (!res.success) {
        let response = this.redirect('forgot');
        response.flash("Please input a valid e-mail address.", null, 'danger');
        return response;
      }

      let AuthSvc = Carolina.$('Carolina/Auth');
      AuthSvc.forgotPasswordEmail(request.data.email);

      let template = this.templates.forgotEmailSent || 'carolina/auth/forgot_email_sent';
      return await this.pugTemplate(template,
        { emailAddress: request.data.email }, request);
    }

    let template = this.templates.forgot || 'carolina/auth/forgot';
    return await this.pugTemplate(template, {}, request);
  }

  async login(request, data={}) {
    
    // redirect if login was successful according to middleware
    if (request.user) {
      
      let redirectUrl = Carolina.config('carolina_auth.loginRedirect', '/home');
      
      if ("next" in request.query) {
        redirectUrl = request.query.next;
      }
      
      let response = this.redirect(redirectUrl);
      return response;
    }

    if (request.method == 'POST') {

      let ValidationSvc = Carolina.$('Validation');
      let res = ValidationSvc.validate('Carolina/Auth/LoginInputSchema', 
        request.data);

      if (!res.success) {

        // console.log(res);

        let response = this.redirect('login');
        response.flash("Bad input.", null, 'danger');
        return response;
      }

      let canProceed = true;

      if (Carolina.config('carolina_auth.throttle', true)) {
        canProceed = Carolina.$('Carolina/Auth').checkThrottle(
          request.data.username, request.ipAddress);
      }
      if (!canProceed) {
        let response = this.redirect('login');
        response.flash(
          "Login is throttled. After several failed attempts you must wait a bit.",
          "Wait!", 'warning');
        return response;
      }

      let user = await Carolina.$('Carolina/Auth').login(request.data.username,
        request.data.password)
      if (user) {
        
        let redirectUrl = Carolina.config('carolina_auth.loginRedirect', '/home');
        
        if ("next" in request.query) {
          redirectUrl = request.query.next;
        }
        
        let response = this.redirect(redirectUrl);
        response.setSessionValue('user_id', user._id);
        return response;
      }
      else {
        Carolina.$('Carolina/Auth').registerFailedAttempt(
          request.data.username, request.ipAddress);
        let response = this.redirect('login');
        response.flash("Bad username or password.", "Uh-oh!", 'danger');
        return response;
      }
    }

    let template = this.templates.login || 'carolina/auth/login';
    return await this.pugTemplate(template, {}, request);
  }

  async logout(request, data={}) {

    if (request.method == 'POST') {
      let response = this.redirect(
      Carolina.config('carolina_auth.logoutRedirect', '/auth/login'));
      response.setSessionValue('user_id', null);
      response.flash("You have been logged out.", "Information:", 'info');
      return response;
    }

    let template = this.templates.logout || 'carolina/auth/logout';
    return await this.pugTemplate(template, { user: request.user }, request);
  }

  async register(request, data={}) {
    
    if (request.method == 'POST') {
      
      let ValidationSvc = Carolina.$('Validation');
      let res = ValidationSvc.validate('Carolina/Auth/RegisterInputSchema', request.data);

      if (!res.success) {

        // console.log(res);
        
        let response = this.redirect("register");

        let message = "Something is wrong with your registration input. " +
          Carolina.config('carolina_auth.usernameRequirement', "") + " " +
          "The e-mail address must be valid. " +
          Carolina.config('carolina_auth.passwordRequirement', "") + " " +
          "Both password inputs must match. " +
          "Please try again.";
        response.flash(message, "Uh-Oh!", 'danger');

        return response;
      }

      let registrationSuccess = await Carolina.$('Carolina/Auth').register(
        request.data.username, request.data.email, request.data.password1);

      if (!registrationSuccess.success) {
        let response = this.redirect('register');
        response.flash(registrationSuccess.message, 'Uh-Oh!', 'danger');
        return response;
      }

      let response = this.redirect('login');
      let message = "You may now log in.";
      let severity = 'success';

      if (Carolina.config('carolina_auth.requireEmailVerification', false)) {
        message = "You will need to verify your e-mail address before logging in.";
        severity = 'info';
      }

      response.flash(message, "Registration successful!", severity);
      return response;
    }

    let template = this.templates.register || 'carolina/auth/register';
    
    if (Carolina.config('carolina_auth.allowRegistration', true) == false) {
      template = this.templates.registrationClosed || 'carolina/auth/registration_closed';
    }
    return await this.pugTemplate(template, {}, request);
  }

  async reset(request, data) {

    // console.log(request.params);

    let User = Carolina.$('DB')._modelClass('User');
    let user = await User.$get({
      _id: request.params.userId,
      forgotPasswordToken: request.params.token
    });

    if (!user) {
      let template = this.templates.badResetLink || 'carolina/auth/bad_link';
      return await this.pugTemplate(template, {}, request);
    }

    if (request.method == 'POST') {

      let ValidationSvc = Carolina.$('Validation');
      let res = ValidationSvc.validate('Carolina/Auth/ResetPasswordInputSchema', 
        request.data);

      if (!res.success) {

        // console.log(res);
        
        let response = this.redirect(request.url);

        let message = "Something is wrong with your input. " +
          Carolina.config('carolina_auth.passwordRequirement', "") + " " +
          "Both password inputs must match. " +
          "Please try again.";
        response.flash(message, "Uh-Oh!", 'danger');

        return response;
      }

      user.setPassword(request.data.password1);
      await user._save();

      let response = this.redirect('../../login');
      let message = "You may now log in.";

      response.flash(message, "Password Reset!", 'success');
      return response;
    }

    let template = this.templates.resetPassword || 'carolina/auth/reset';
    return await this.pugTemplate(template, {}, request);
  }

  async verifyEmail(request, data) {

    let User = Carolina.$('DB')._modelClass('User');
    let user = await User.$get({
      _id: request.params.userId,
      emailVerificationToken: request.params.token
    });

    if (!user) {
      let template = this.templates.badResetLink || 'carolina/auth/bad_link';
      return await this.pugTemplate(template, {}, request);
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user._save();

    let EmailVerificationEvent = Carolina.$('Events')._eventClass(
      'Carolina/Auth/EmailVerificationEvent');
    let event = new EmailVerificationEvent(user);

    event.fire();

    Carolina.$('Logger').info(`User ${user.username} verified ${user.emailAddress}.`, 'Auth');

    let response = this.redirect(Carolina.config(
      'carolina_auth.emailVerificationRedirect', '/home'));
    response.flash("Your e-mail address has been verified.", "Success!",
      'success');
    return response;
  }
}

exports = module.exports = {
  'Carolina/Auth/AuthController': AuthController
};
