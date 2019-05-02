
/* global Carolina */

const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

const HttpResponse = require('carolina/main/http/http-response');

/**
 * Carolina/Auth/AdminGuardMiddleware
 * Rejects requests that do not have a logged-in admin user
 * Must be AFTER Carolina/Auth/ExtractUserMiddleware
 */
class AdminGuardMiddleware extends BaseMiddleware {
  async before(request, data={}) {
    if (!request.user) {
      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/') + "?next=" + request.url);
      response.flash("You must be logged in to view that page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    if (!request.user.isAdmin) {

      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/') + "?next=" + request.url);
      response.flash("You must be logged in as an admin account to view that page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    return request;
  }
}

/**
 * Carolina/Auth/AuthGuardMiddleware
 * Rejects requests that do not have a logged-in user.
 * Must be AFTER Carolina/Auth/ExtractUserMiddleware
 */
class AuthGuardMiddleware extends BaseMiddleware {
  async before(request, data={}) {
    if (!request.user) {
      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/') + "?next=" + request.url);
      response.flash("You must be logged in to view that page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    else if (Carolina.config('carolina_auth.requireEmailVerification', true)) {
      if (!request.user.emailVerified) {

        let response = new HttpResponse({});
        response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
          '/') + "?next=" + request.url);
        response.flash("You must verify your e-mail to view that page.",
          'Email Verification Required.', 'warning');
        
        request.response = response;
        request.shouldContinue = false;
        return request;
      }
    }
    return request;
  }
}

/**
 * Carolina/Auth/EmailVerifiedGuardMiddleware
 * Rejects requests unless the user is both logged in and has a verified
 * e-mail address.
 */
class EmailVerifiedGuardMiddleware extends BaseMiddleware {
  async before(request, data={}) {
    if (!request.user) {
      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/') + "?next=" + request.url);
      response.flash("You must be logged in to view that page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    if (!request.user.emailVerified) {

      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/') + "?next=" + request.url);
      response.flash("You must verify your e-mail to view that page.",
        'Email Verification Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    return request;
  }
}

/**
 * Carolina/Auth/ExtractUserMiddleware
 * Populates `request.user` based on `user_id` in the Session data.
 */
class ExtractUserMiddleware extends BaseMiddleware {
  async before(request, data={}) {
    if ('user_id' in request.session) {
      let DBSvc = Carolina.$('DB');
      let User = DBSvc._modelClass('User');
      request.user = await User.$lookup(request.session.user_id);
    }
    return request;
  }
}

exports = module.exports = {
  'Carolina/Auth/AdminGuardMiddleware': AdminGuardMiddleware,
  'Carolina/Auth/AuthGuardMiddleware': AuthGuardMiddleware,
  'Carolina/Auth/EmailVerifiedGuardMiddleware': EmailVerifiedGuardMiddleware,
  'Carolina/Auth/ExtractUserMiddleware': ExtractUserMiddleware
};