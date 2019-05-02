
# Carolina Auth

The Carolina Auth plugin, known as `carolina/plugins/auth`, provides pages 
for users to register accounts and log in to them, as well as some helpful 
Middleware.

[[toc]]

## Installation

The Carolina Auth plugin is installed in the starter project by default.
If you need to install it again, take the following steps:

1. List "carolina/plugins/auth" in the `plugins` property of `config/app.js`.
2. Run the command `node . import-plugin-resources carolina/plugins/auth -csrtf`.
3. Ensure the file `config/carolina_auth.js` is exposed by `config/index.js` as "carolina_auth".
4. Add the key "Carolina/Auth" to the `services` property of `config/app.js` with the value "carolina/plugins/auth/plugins/service".
5. Provide a route mapping, for example in `site/http/routes/browser.js` (example below).

The route mapping should look like this:

```javascript
// site/http/routes/browser.js

exports = module.exports = [
  { route: "/auth", subs: require('carolina/plugins/auth/router') },
  // more routes
];
```

## Configuration

The Carolina Auth
plugin is configured by the file `config/carolina_auth.js`. It is 
included in the starter project by default, and otherwise can be copied 
from the plugin code when you run the `import-plugin-resources` command with 
the `-c` flag. 

**Configuration Values**

| Key | Description |
| --- | --- |
| `allowRegistration` | Whether or not the registration page is open for new user account creation. |
| `emailVerificationRedirect` | Where to redirect user's after they click the e-mail verification link successfully. |
| `forgotEmailMailer` | Which Mailer to use to send forgot password e-mails. |
| `forgotEmailSender` | The FROM e-mail address for all forgot password e-mails. |
| `forgotEmailSubject` | The Subject line for all forgot password e-mails. |
| `mount` | The route to which this plugin's router is mounted. This plugin must know where it is. |
| `passwordRegex` | A regular expression that user-created passwords must match. |
| `passwordRequirement` | An explanation of password requirements which will be shown to users. |
| `loginRedirect` | The default route to redirect users to once they successfully log in. |
| `logoutRedirect` | The default route to redirect users to once they successfully log out. |
| `requireEmailVerification` | Whether or not new users can log in without verifying their e-mail address first. |
| `sendEmailVerification` | Whether or not new users will receive e-mail verification e-mails after they register. |
| `templates` | Which template files to use for certain functions. More details below this table. |
| `throttle` | Whether or not to throttle repeated login attempts. |
| `throttleAttemptLimit` | How many failed login attempts triggers throttling. |
| `throttleBackoffTime` | How long users must wait when throttled. An object that could be added to a `moment` time. |
| `unauthorizedRedirect` | Where users should be redirected to if they are rejected by the Middleware requiring login. |
| `usernameRegex` | A regular expression that user-created usernames must match. |
| `usernameRequirement` | An explanation of the username requirements which will be shown to users. |
| `verifyEmailSubject` | The Subject line for e-mail verification e-mails. |

**Templates**

The Carolina Auth plugin contains several templates that are used for the 
login workflow. Instead of editing them in the `templates/carolina/auth`
(which will get them overwritten if you re-install the plugin),
you can create your own and specify overrides in the `templates` property of 
`config/carolina_auth.js`. Here are the templates you can override:

* `badResetLink`

Will be presented to users who access an invalid or expired reset password 
or e-mail verification link. The template should explain this.

* `forgot`

Will be presented to users who need to reset their password. Should contain 
a form sending a POST request with an input named "email" (for the user's 
e-mail address) and a hidden CSRF token.

* `forgotEmailSent`

Will be presented to users that have completed the forgot password form. It 
should explain to users that they have been sent an e-mail if the provided
e-mail address
belonged to an account.

* `login`

The login form. Should contain a form sending a POST request with an input 
named "username", an input named "password, and a hidden CSRF token.

* `logout`

The logout button. Should contain a form sending a POST request with a hidden 
CSRF token (and a message explain to the user that submitted will log them out).

* `register`

The registration form. Should contain form sending a POST request with
an input named "username", an input 
named "email", an input named "password1", an input named "password2", and a
hidden CSRF token.

* `registrationClosed`

Will be presented to users who go to the register page when the configuration
value `allowRegistration` is set to `false`. Should explain to the user that 
registration is currently closed.

* `resetPassword`

The form to create a new password for users who have forgotten theirs. Should 
contain a form sending a POST request with an input named "password1", an 
input named "password2" (which should be labeled Confirm Password), an a hidden
CSRF token.

* `resetPassEmail`

A text template that will be used to send the reset password link to users. 
It should be a nunjucks template that expects the properties "baseUrl"
and "user". It should build the correct reset password link this way:

```
{{ baseUrl }}/{{ user._id }}/{{ user.forgotPasswordToken }}
```

* `emailVerificationEmail`

A text template that will be used to send the e-mail verification link to 
users. It should be a nunjucks template that expects the properties "baseUrl"
and "user". It should build the correct e-mail verification lnk this way:

```
{{ baseUrl }}/{{ user._id }}/{{ user.emailVerificationToken }}
```

## Usage

Once you mount the plugin to a route, that route will contain all the pages 
necessary for users to login and logout. The link to log in to your side 
will be `/<mount>/login` and the link to the logout confirmation button will
be `/<mount>/logout`. The recommended (and default) mount point for this plugin
is "/auth".

The login page will contain a link to the registration page (and vice versa).
The login page will contain a link for users who have forgotten their password 
to receive an e-mail with a password reset link. Users who have successfully 
registered will be redirected to the login page. Users who have logged in 
will be redirected according to the configuration (to "/home" by default). 
Users who log out will be redirected according to the configuration 
(to the login page by default).

## Details

### The Carolina/Auth Service

The Auth Service is exposed by the name "Carolina/Auth" in the Carolina 
Service library:

```javascript
let AuthSvc = Carolina.$('Carolina/Auth');
```

The Service contains some methods that you might use.

#### Check a Username/Password Combination

The `async login(identifier, password)` method can be used to check a login 
combination. The `identifier` can either be a username or an e-mail address 
(if an "@" is present, it is assumed to be an e-mail address). If the
combination is valid, the User instance will be returned. Otherwise, the return
value is `null`.

```javascript
let customLoginAttempt = await AuthSvc.login("testuser", "password123");
if (customLoginAttempt != null) {
  console.log("Valid");
}
else {
  console.log("Invalid");
}
```

::: tip IMPORTANT
The `login` method does not actually add the User to the Session as logged in.
To do that, you must set the session value on the response.
For more information, see [Authentication Basics](../auth/auth.md).
:::

#### Register a New User

The `async register(username, emailAddress, password)` method can be used to 
create a new user account. An object will be returned with the `success` key 
set to `true` if registration was successful and a new account was created.
The `success` property will be set to `false` otherwise. The User object will 
be attached as the `user` property if the successful, otherwise the `message`
property will be set with an explanation.

```javascript
let customRegistrationResult = await AuthSvc.register("testuser1000", 
  "testuser1000@example.com", "password123");
if (customRegistrationResult.success == true) {
  let newUser = customRegistrationResult.user;
  // more stuff
}
else {
  console.log("Registration failed for the following reason:");
  console.log(customRegistrationResult.message);
}
```

### Routes

All routes are taken together and exposed by 
`carolina/plugins/auth/router.js`. You should map to it like so in 
`site/http/routes/browser.js`:

```javascript

module.exports = [

  { route: '/auth/', subs: require('carolina/plugins/auth/router') }, 

  // more routes
  
];
```

### Exposed Service Objects

#### Event Classes

The Carolina/Auth Service exposes several Event classes that are thrown 
by the Service based on different events. You can configure Listeners to listen 
to them.

**`Carolina/Auth/EmailVerificationEvent`**

This event is fired when a User successfully verifies their e-mail address.
The user object is attached to the event as `event.user`.

**`Carolina/Auth/LoginEvent`**

This event is fired when a User successfully logs in. The User object is
attached as `event.user`.

**`Carolina/Auth/LoginFailureEvent`**

This event is fired when there is a failed login attempt. The identifier of 
the attempted login is attached as `event.identifier`.

**`Carolina/Auth/RegistrationEvent`**

This event is fired when a new User successfully registers a new account. 
The User object is attached as `event.user`.

#### Http Controllers

The Carolina/Auth plugin exposes some Controller classes for use by the 
Http Service. Their names all begin with "Carolina/Auth/" but they are not 
designed for re-use.

#### Http Middleware

The Carolina/Auth plugin exposes some Middleware classes. Their names all begin 
with "Carolina/Auth/" and some can be used by you. All of the "guard" middleware
with redirect unauthorized users to the value of `unauthorizedRedirect` in 
`config/carolina_auth.js` with the url of the attempted page attached under 
the query arg "next" (overriding the default redirect if the user successfully
logs in immediately).

**`Carolina/Auth/AdminGuardMiddleware`**

This will protect routes from access by users that are not admin accounts.

**`Carolina/Auth/AuthGuardMiddleware`**

This will protect routes from access by users who are not logged in.

**`Carolina/Auth/EmailVerifiedGuardMiddleware`**

This will protect routes from access by users who do not have verified e-mail 
addresses.

**`Carolina/Auth/ExtractUserMiddleware`**

This Middleware is applied to all browser requests by default. It inspects the 
Session for a logged in user and adds it to the incoming request object 
as `request.user`.

#### Validation Schemas

The Carolina/Auth Service exposes some Validation Schemas. Their names all begin
with "Carolina/Auth/", but they are not documented for re-use.