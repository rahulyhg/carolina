
# Authentication Basics

The starter project comes with the official plugin 
'carolina/plugins/auth' (Carolina/Auth)
already installed and configured.
It provides some of the basics for providing authentication functionality to
your application. It provides basics routes and templates
for user login and registration as well as Middleware to allow you to 
guard routes for logged-in users only. For basic apps, you probably do not
need to alter the default settings.

The starter project includes a basic User model, defined in 
`site/db/models/user.js`. You can add methods to it and fields to its schema,
but you should leave the existing fields alone and not make any additional
fields required to allow it to interact with 
the Carolina/Auth plugin.

[[toc]]

## The `Carolina/Auth` Plugin

The `Carolina/Auth` plugin (which is installed as 'carolina/plugins/auth')
comes with the starter project. It provides the Controller
`Carolina/Auth/AuthController` for handling requests to the authentication
routes and it uses the Service `Carolina/Auth` to do much of the work.
The required Service is already configured in the `services` property of
`config/app.js`.

If, for whatever reason, you do not have the plugin installed, here are the 
basic steps to take:

* Add 'carolina/plugins/auth' to the `plugins` property of `config/app.js`.
* Add the key 'Carolina/Auth' to the `services` property of `config/app.js` with the value 'carolina/plugins/auth/plugin/service'.
* Run the command CLI `node . import-plugin-resources -p carolina/plugins/auth -crt`. Note that this will **overwrite** `config/carolina_auth.js` if it exists. If you already have the file and keep its contents, do `-rt` instead of `-crt`.
* Export the config file in `config/index.js`, like this: `carolina_auth: require('/carolina_auth'),`
* Change any desired settings in `config/carolina_auth.js`.
* Add `{ route: "/auth", subs: require('carolina/plugins/auth/router') }` to `site/http/routes/browser.js` to mount the authentication routes.
* Set the value of `mount` in `config/carolina_auth.js` to whatever the mount point is (if something other than "/auth").

### Routes

Assuming you chose `/auth` as the mount point for the plugin router
(which is the default configuration in the starter project), the login 
screen is available at `/auth/login` and the registration screen is available
at `/auth/register`.

If a user makes too many failed login attempts with the same username and from
the same IP address, that user will be throttled for a certain amount of time.
The configuration for this throttling is in `config/carolina_auth.js`.

### Templates

The templates used by the Carolina/Auth plugin are found in
`templates/carolina/auth/`. You shouldn't alter them directly, but you
can copy them to another part of your `templates/` directory and alter them.
You can then tell the plugin (by editing `config/carolina_auth.js`) to use
those other templates instead. If you do use other
templates, you will need to ensure
that the form data POSTed would still be the same.

### Authentication Process

A user registers and logs in via the routes `/auth/register` and `/auth/login`.
Once a user successfully logs in, they will be redirected to the value of
the `loginRedirect` property of `config/carolina_auth.js` (which defaults to
"/home"). Also, the `_id` of the User is added to the current session object.

### The `Carolina/Auth/ExtractUserMiddleware` Class

The Middleware `Carolina/Auth/ExtractUserMiddleware` is applied in the 
starter project to all routes in the "browser" route group. It requires the 
`SessionMiddleware` to be before it in order to work properly. This Middleware
will check the session of all incoming requests for a valid user id. If one
is found, the `User` object corresponding to the logged-in user will be 
populated as `request.user` and therefore
available to later Middleware and the 
Controller.

Example (in a Controller):

```javascript
async handle(request, data={}) {
  let user = request.user;
  if (user) {
    // user is logged in
    console.log(user.username); // => "user123"
  }
  else {
    // no user is logged in
  }
}
```

### The `Carolina/Auth/AuthGuardMiddleware` Class

The Carolina/Auth plugin also provides the `Carolina/Auth/AuthGuardMiddleware`
class to reserve some routes for logged-in users only. A good way to use it
is to define a Controller with a group of related handler methods for routes
that should only be accessed by authenticated users.

The Middleware will check to see if `request.user` is populated, only allowing
requests to proceed if it is. Otherwise, the user is redirected to the value
of the `unauthorizedRedirect` property in `config/carolina_auth.js` (which
defaults to '/auth/login').

Example Controller:

```javascript
class MyCustomController extends BaseController {
  constructor() {}

  getMiddleware() {
    return ['Carolina/Auth/AuthGuardMiddleware'];
  }
  async handle(requeset, data={}) {
    // provide a response
  }
  // more handler methods
}
```

## Manual Authentication

If you don't want to use the built-in routes or want to also authenticate
users elsewhere in the application, you can use some methods associated of
the Carolina/Auth Service.

You can get a reference to the Service from the Carolina global object.

```javascript
let AuthSvc = Carolina.$('Carolina/Auth');
```

**User Registration**

You can register a user (creating a new User object) using the `register`
method.

```javascript
let registrationSuccess = await AuthSvc.register('username', 'user@example.com',
  'password123');
if (registrationSuccess.success) {
  // user has already been created and saved
  let user = registrationSuccess.user;
}
else {
  console.log(registrationSuccess.message); // string explaining why registration failed
}
```

**User Login**

You can attempt to login a user using the `login` method.

```javascript
// first argument can be either username or e-mail address
// treated as an e-mail address if "@" is present
let user = await AuthSvc.login('username', 'password123');
if (user) {
  // credentials matched
  // you must manually add user_id to the session to save the login
  response.setSessionValue('user_id', user._id);
}
else {
  // authentication failed
}
```

**User Logout**

To log a user out, simply nullify the `user_id` property of the current
Session.

```javascript
response.setSessionValue('user_id', null);
```

**Password Reset**

To manually reset a user's password and have a Reset Password E-Mail sent to
them, use the `forgotPasswordEmail` method and pass in the user's email
address.

```javascript
await AuthSvc.forgotPasswordEmail('username@example.com');
```

## Custom Guard Middleware

You can write your own guard Middleware to do more precise protection of 
certain routes. Here is an example that limits access to user's with a username
that begins with "a".

```javascript
class LetterAGuardMiddleware extends BaseMiddleware {
  async before(request, data={}) {
    if (!request.user) {
      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/'));
      response.flash("You must be logged in as an admin account to view that page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    if (request.user.username[0] != 'a') {

      let response = new HttpResponse({});
      response.redirect(Carolina.config('carolina_auth.unauthorizedRedirect',
        '/'));
      response.flash("You do not have access to this page.",
        'Login Required.', 'warning');
      
      request.response = response;
      request.shouldContinue = false;
      return request;
    }
    return request;
  }
}
```

All requests with non-authenticated users or with users without usernames 
beginning with the lowercase letter "a" will be redirected to the value of
the `unauthorizedRedirect` property of `config/carolina_auth.js` with a 
flash message provided.

## Editing the User Model

Outside of the following restrictions, you can alter the User model
(defined in `site/db/models/user.js`) to suit your needs:

* Leave the existing fields (`username`, `password`, `salt`, `forgotPasswordToken`, and `isAdmin`) in place.
* Do not make ANY field other than `username` a required field.
* Do not override or alter existing methods of the User class.


## Relevant Events

There are several Event classes constructed and thrown by the Carolina/Auth
plugin. You can listen for them using Listeners. The events that such
Listeners will receive are documented below.

Note that log messages are already generated for all of these as well,
so you should not need to use these events for logging purposes. Just configure
a logger to listen for log messages with a source of "Auth".

* `Carolina/Auth/LoginEvent`

Thrown whenever a user *successfully* logs in. Attached to the event is the
`user` property, the User object of the newly logged-in user.

Usage (in a Listener class):

```javascript
async handle(event) {
  console.log(event.user.username);
}
```

* `Carolina/Auth/LoginFailureEvent`

Thrown whenever a user login attempt fails. Attached to the event is the
`identifier` property, the username or e-mail address associated with the
failed attempt.

* `Carolina/Auth/RegistrationEvent`

Thrown whenever a new user is registered by the `register()` method of
the Carolina/Auth Service (whether manually or in a built-in route).
Attached to the event is the `user` property, the User object of the newly
registered user.



