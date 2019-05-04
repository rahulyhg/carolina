
# Guarding the Routes

We need to apply an authentication guard to all the routes we just defined,
since we only want logged-in users to be able to access them. We could 
specify middleware in the route configuration, but since we want the 
auth guard to apply to all handlers of the Controller class, we can do it 
there.

In `site/http/controllers/item-controller.js`, below the constructor but above
the handler methods, create the method `getMiddleware`:

```javascript
getMiddleware() {
  return ['Carolina/Auth/AuthGuardMiddleware'];
}
```

The named Middleware class is provided by the Carolina Auth plugin, and 
protects all routes handled by this Controller class for access by users
who are not logged in. Let's try it. 

Run the server using `node . runserver` and visit the homepage of the running
application. Then try to visit `http://localhost:8080/items`. You will be 
redirected to the login page.

We haven't created any accounts yet and registration should be open by default,
so click the "Register" link at the top right and create some account.

Once you create the account you should be able to immediately login since 
requiring e-mail verification is disabled by default. Once you login, you 
will be redirect to "/home", which we haven't defined a controller for.

We don't want users redirect to "/home". Open the config file for the auth 
plugin, `config/carolina_auth.js`. Look for the value `loginRedirect`, which 
is set to "/home" by default and change it to say "/items".

Restart the server and go to `http://localhost:8080/auth/login`
and you will be redirected to 
`/items`.

Go to `http://localhost:8080/auth/logout` and click the logout button. 
Then try going to `http://localhost:8080/items` and you should be blocked 
and sent to the login page again. The Auth Guard is now working!