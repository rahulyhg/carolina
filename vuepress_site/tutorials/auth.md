
# Auth Plugin Familiarization

Since our application will need users to be able to login, we will take 
advantage of the Carolina Auth plugin, which is already installed and 
configured by default. If you remember looking at the file 
`site/http/routes/browser.js`, the route `auth/` was bound to a list of 
routes defined by the Auth plugin. The plugin provides routes for user 
login, registration, and other authentication functions.
If you want, you can check out that 
routes file on
[GitHub](https://github.com/jfmario/carolina/blob/master/plugins/auth/router.js).

If you want, you can also view the templates for the Auth plugin, which 
have already been populated in the starter project in the directory
`templates/carolina/auth`.

Now that we've looked at our routes and the Auth plugin, it's almost time to 
start editing the application (in the next section).

If you want more information about the Auth plugin, see the docs on the 
[Carolina Auth Plugin](../docs/plugins/auth.md).

