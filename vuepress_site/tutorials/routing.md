
# Routing Familiarization

Your routes are defined in the directory `site/http/routes/`. Don't worry 
about `api.js` at the moment (it contains a few example routes), but take a 
look at `browser.js`. This file contains the main routes to your application.

At the beginning, there are routes defined which provide mount points for 
the routes for two included Carolina plugins: one for authentication and 
one provided an admin panel. Below that, the index route is defined:

```javascript
  { route: "/", controller: 'HomeController' }
```

This is saying that requests coming in to the root URL will be be handled 
by a Controller class called "HttpController". For more information on the 
basics of routing, consult the documentation on
[Routing](../docs/basics/routing.md).

Let's look at the HomeController. It is defined in
`site/http/controllers/home.js`.

The Controller class defines a `handle()` method:

```javascript
async handle(request) {
  return this.pugTemplate("home", {}, request);
}
```

It calls a special helper method of the `BaseController` class which renders
a pug template called "home.pug"
from your `templates/` directory. We will make changes to 
this Controller soon, but if you want more information on the basics of 
Controller classes, consult the documentation on
[Controller classes](../docs/basics/controllers.md).

If you look at the file `templates/home.pug`, you may recognize it as the 
page that you saw when your first visited your application in the browser.
You can write templates in pug and render them in the same way. You can 
define whatever structure you want within the `templates/` directory,
but leave the `templates/carolina/` directory alone (it contains templates 
that go with the Carolina framework as well as its plugins). For more 
information on writing in pug, consult its
[documentation](https://pugjs.org/api/getting-started.html).

We will make changes to the routes, Controller class, and pug templates in a 
later section.