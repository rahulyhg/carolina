
# E-Mail Verification

By default in the starter project, users of your application are not required
to verify their e-mail addresses and such verification e-mails are not sent.
These features can be turned on, however. To send verification e-mails to 
newly registered users, set the `sendEmailVerification` property to `true`
in `config/carolina_auth.js`. To require that a user's e-mail be verified 
before they are treated as authenticated, set the `requireEmailVerification`
property to `true`.

## The User Object

The relevant fields on the User object with respect to e-mail verification are 
`emailVerificationToken` (a token used by the framework to verify users) and
`emailVerified` (a boolean specifying whether verification has taken place).

## Process

If `sendEmailVerification` or `requireEmailVerification` in
`config/carolina_auth.js` is set to `true`, a verification e-mail will be 
sent out upon new user registrations. If a user clicks the link, their
e-mail address will be marked as verified and they will be redirect to the
value of the `emailVerificationRedirect` in `config/carolina_auth.js`.

## Middleware

There is a Middleware class, `Carolina/Auth/EmailVerifiedGuardMiddleware`,
which you can use on any routes. It assumes that the user will have been
extracted to `request.user` and will reject all requests that do not have 
a verified e-mail address. This is unnecessary if e-mail verification is
required, as that would be enforced by `Carolina/Auth/AuthGuardMiddleware`.
But if e-mail verification is optional, you can use
`Carolina/Auth/EmailVerificationMiddleware` to restrict some routes to only
users with verified e-mail addresses.

## Events

When a user verified his or her e-mail address, a 
`Carolina/Auth/EmailVerificationEvent` Event will be thrown, containing
a `user` property which will be the user whose e-mail address was just
verified. The verification will also be logged at INFO level.