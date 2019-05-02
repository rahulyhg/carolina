/**
 * Configuration for the carolina/plugins/auth plugin.
 */
exports = module.exports = {
  
  // whether or not new accounts can be created via registration
  allowRegistration: true,

  // where to direct users after verifying e-mail
  emailVerificationRedirect: '/home',

  // password reset EmailSvc Mailer
  forgotEmailMailer: 'default',
  // password reset e-mail sender
  forgotEmailSender: 'webmaster@example.com',
  // password reset e-mail subject line
  forgotEmailSubject: "Password Reset Link",

  // this plugin MUST know where its router is mounted
  mount: '/auth',

  // regular expression that new passwords must match
  passwordRegex: /[A-Za-z0-9!@#$%^&*]{6,16}/i,

  // user-friendly description of password requirement
  passwordRequirement: "Password must be 6-16 characters and can be made up of letters, numbers, and special characters from the number row.",

  // where to direct authenticated users
  loginRedirect: '/home',

  // where to direct users after logging out
  logoutRedirect: '/auth/login',

  // whether email verification is required for users
  requireEmailVerification: false,

  // whether or not to send email verification emails
  // if requireEmailVerification is true, email will be sent either way
  sendEmailVerification: false,

  // templates to use, override for your own custom templates
  templates: {
    badResetLink: 'carolina/auth/bad_link',
    forgot: 'carolina/auth/forgot',
    forgotEmailSent: 'carolina/auth/forgot_email_sent',
    login: 'carolina/auth/login',
    logout: 'carolina/auth/logout',
    register: 'carolina/auth/register',
    registrationClosed: "carolina/auth/registration_closed",
    resetPassword: 'carolina/auth/reset',
    resetPassEmail: 'carolina/auth/reset_pass.txt',
    emailVerificationEmail: 'carolina/auth/email_verification.txt'
  },

  // whether to throttle failed login attempts
  throttle: true,

  // how many failed login attempts trigger throttling
  throttleAttemptLimit: 4,

  // amount of time to wait after failed login attempts
  throttleBackoffTime: { seconds: 60 },

  // where to redirect unauthorized users
  unauthorizedRedirect: '/auth/login',

  // regular expressions that new usernames must match
  // the @ sign should be disallowed
  usernameRegex: /[A-Za-z0-9]{4,16}/i,

  // user-friendly description of username requirement
  usernameRequirement: "Username must be 4-16 characters and can be made up of letters and numbers",

  // email verification e-mail subject
  verifyEmailSubject: "Email Verification"
};