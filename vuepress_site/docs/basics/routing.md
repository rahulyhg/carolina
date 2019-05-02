
# Routing

## Basic Routing

Routes are defined in `site/http/routes/index.js` and are divided into route
middleware groups.

There are two groups pre-defined: `browser` (routes designed to be accessed
by normal browsing) and `api` (routes designed to be accessed programmatically
or by AJAX calls).

A simple route, in an example `site/http/routes/browser.js` looks like this:

```js
exports = module.exports = [
  {
    route: "/",
    func: function(request, data, ctrl) {
      return ctrl.sendText("Hello, World");
    }
  }
];
```

This defines a simple route at root that will simply render the text 
"Hello, World".

Using a function like this as the `func` attribute of a route object is not
the only option. You can get the route to be handled by a 
[controller](./controllers.md). This is discussed in another section.

### Basics

#### Route Files

Your route files live in `site/http/routes/` and should all be exported in
various groups by the `index.js` file. The `index.js` file exports an object
mapping route group names to list of routes.

The `browser` group is preconfigured with some basic middleware designed
for standard web access.

The `api` group is preconfigured to be mounted at the prefix "/api/" and 
has other basic middleware designed for stateless api access.

The route groups and prefixes are specified in `site/http/routes/index.js`
and route group middleware is specified in `config/http.js`.

#### Specifying HTTP Methods

By default, a request to a matching route will go to your controller or 
handler function regardless of what method it is. However, you can list methods
that the handler applies to and other requests will be denied.

```js
exports = module.exports = [

  // other routes
  
  { route: "/get-only", controller: "SomeController", methods: ["get"] },
  { route: "/post-only", controller: "SomeController", methods: ["post"] },
  { route: "/put-only", controller: "SomeController", methods: ["put"] },
  { route: "/patch-only", controller: "SomeController", methods: ["path"] },
  { route: "/delete-only", controller: "SomeController", methods: ["delete"] },
  
  { route: "/get-or-post", controller: "SomeController", methods: ["get", "post"] },
  
  // this next one is the same as the default behavior without specifying methods
  { route: "/all-methods", controller: "SomeController", methods: ["all"] }
];
```

If "all" or "ALL" is included in the `methods` property,
the controller will apply to all methods regardless of what else is specified.
The following is redundant:

```js
  { route: "/some-route", controller: "SomeController", methods: ["get", "all"] }
```
#### CSRF

By default, any POST, PUT, PATCH, or DELETE request will be rejected without a
CSRF token.

You can generally include a CSRF token in a pug template like this
(assuming you left `templates/carolina/` alone)

```pug
include /carolina/http/mixins

form
  +csrfToken(locals.request)
```

See the docs on [CSRF](./csrf.md) and 
[views and templates](./views.md) for more information.

### Redirection

You can setup a redirect like this:

```js
exports = module.exports = [
  
  // other routes
  
  {
    route: "/from",
    redirectTo: "/api/to",
    status: 301,
    methods: ["get"]
  }
];
```

Any GET request for "/api/from" (assuming this definition is in `api.js`)
will be redirected to "/to" with status 301
(other methods may continue if a later route handles "/from").

The `status` property is optional and defaults to 302.

The `redirectTo` property should be FULL url from root (or a relative url
such as "./to" or "../to", etc).

### Template Views

As will be covered in later sections, you can render views easily from within
a controller or handler function. However, if all you need to do is render 
a pug template with automatically included data and data that can be easily
specified in your routes list, you can use this shortcut:

```js
exports = module.exports = [
  
  // other routes
  
  {
    route: "/some-route",
    template: "some-template",
    data: {
      number: 1
    }
  }
];
```

In the above example, the template `templates/some-template.pug` will 
be rendered with your data object, plus automatic values.

Note that app configuration is automatically made available to pug templates
as `locals.config` and if a user is logged in and extracted by middleware the
logged in user is available as `locals.currentUser`
and `locals.isLoggedIn` will be set to true.
This is done even if you don't use a controller.
You should not use those 
values in `data` or they will overwritten.

## Parameters

You can use route parameters to capture part of the route as parameters.
The variable will be stored in `request.params`.

Example:

```js
exports = module.exports = {
  
  // other routes
  
  {
    route: "/user/:userId",
    func: function(request, data, ctrl) {
      return ctrl.sendText("User ID: " + request.params.userId);
    }
  }
};
```

You can have multiple parameters:

```js
exports = module.exports = {
  
  // other routes
  
  {
    route: "/posts/:postId/comments/:commentId",
    func: function(request, data, ctrl) {
      
      let postId = request.params.postId;
      let commentId = request.params.commentId;
      // do stuff
    }
  }
};
```

### Regex Params

You can force a parameter to only match a particular regular expression
by putting a regex in parentheses after the parameter name.

Example:

```js
exports = module.exports = {
  
  // other routes
  
  {
    route: "/user/:userId([0-9]+)",
    func: function(request, data, ctrl) {
      return ctrl.sendText("User ID: " + request.params.userId);
    }
  }
};
```

In the above example, the "userId" parameter is forced to be a string of digits.

## Route Groups

### Middleware Groups

All routes belong to middleware groups. The file `site/http/routes/index.js` 
exports routes grouped by middleware group name. By default, the groups
`browser` (for stateful routes accessed by the browser or AJAX calls from the
browser) and `api` (for stateless routes designed for consumption from
possibly outside the browser environement altogehter) are preset.

The middleware that actually gets applied routes in
each group are defined under
`config/http.js`.

### Route Prefixing

Routes can be placed into a prefix group. This is done by default with your 
API routes in `site/http/routes/index.js`, but this can be done at every level.
The sub routes inherit the group in which the route prefix is defined.

```js
exports = module.exports = [

  // other routes
  
  {
    route: "/route-prefix",
    subs: [
      { route: "/route-suffix", controller: "SomeController" },
      // more normal route definitions
    ]
  }  
];
```

In the above example, the route `/route-prefix/route-suffix` will be bound
to "SomeController".

## Model Binding

You can use custom middleware to override request parameters, and there is 
built-in middleware, `ModelExtractionMiddleware`,
that you can use to bind a request parameter to a model
such that the model instance will be made available to the controller as 
a parameter.

You will have to specify the model and which param the middleware should look 
for the id in. If there is no matching object, the param will be `null`.

```js
exports = module.exports = [
  
  // other routes
  
  {
    route: "/user/:user",
    controller: "SomeController",
    middleware: ["ModelExtractionMiddleware"],
    data: { model: "User", param: 'user' }
  }
];
```

Using this example, in a request to `/user/2`, the User with the ID of 2 will 
be made available as `request.params.user` inside of `SomeController`.
