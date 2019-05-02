
# Middleware

Middleware are classes that operate HTTP request and response objects both 
before and after the request is handled by its controller.
Middleware classes are capable of rejected a call entirely, for example if the 
route requires a user to be logged in.

You can specify configuration on each route that can be used to alter the 
behavior of middleware.

In addition to allowing you to create your own,
the Carolina framework includes the following middleware that you can 
use:

| Name | Purpose |
| --- | --- |
| `CookieEncryptionMiddleware` | Encrypts all outgoing cookies that start with "carolina" and decrypts all incoming cookies that start with "carolina". |
| `CookieMiddleware` | Extracts all cookies from the HTTP request header and puts them into an object as `request.cookies`. |
| `CsrfMiddleware` | Enforces the existence of a valid CSRF token in the request header or data body for all POST, PUT, PATCH, and DELETE requests. |
| `LogRequestsMiddleware` | Logs incoming HTTP requests at the VERBOSE level. |
| `ModelExtractionMiddleware` | Extracts the model instance based on the ID in one of the route parameters. |
| `SessionMiddleware` | Provides the session as `request.session` for incoming requests and stores the session from all outgoing responses. |

## Custom Middleware

Your middleware should be defined in the `site/http/middleware` directory
and exported by name in `site/http/middleware/index.js`.

You can create middleware using the CLI shortcut:

`node . generate middleware ExampleMiddleware`

An example middleware (that logs all incoming requests) might look like this
(in fact, the actual "LogRequestsMiddleware" looks very much like this except
that is uses the Logger Service to send the log):

```js
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

class LogRequestsMiddleware extends BaseMiddleware {
  
  async before(request, data) {
    // do nothing for incoming requests
    return request;
  }
  
  async after(request, response, data) {
    // log the request on the way out
    console.log(`http-request from ${request.ipAddress} for ${request.url} (${response.status})`);
    return response;
  }
}

exports = module.exports = LogRequestsMiddleware;
```

::: tip
This particular middleware already exists.
:::

Note that the `before` method must return the request and the `after` method 
must return the response.

To ensure that this middleware is referable by name, it must be 
exported in `site/http/middleware/index.js`:

```js
exports = module.exports = {
  LogRequestsMiddleware: require('./log-requests-middleware.js')
};
```

## Declaring Middleware

All middleware is referenced by a unique name. The builtin middleware that 
comes with Carolina is listed above. Your middleware should be exposed by 
`site/http/middleware/index.js` and is referenced by key name. Middleware from 
any installed plugins will also be available as
`<plugin_name>/MiddlewareClassName` (by convention).

### Sitewide Middleware

Any middleware that you want to run against all routes should be listed 
by name in the `sitewide_middleware` property exposed by 
`config/http.js`.

### Route Group Middleware

The `middleware_groups` property of the HTTP config is an object mapping 
route group names to lists of middleware names.
They should correspond to the named route groups exposed by
`site/http/routes/index.js`. If a route group name matches the name of a 
middleware group, that middleware will be applied to all routes in the group.

### Route Specific Middleware

When declaring routes, you can specify a list of middleware that should apply 
to that specific route:

```js
exports = module.exports = {
  // other routes
  {
    route: "/some/route",
    controller: "SomeController",
    middleware: ["SomeMiddleware"],
    data: {}
  }
};
```

The middleware provided will be applied.

### Middleware Execution Order

As request comes in to your application, it goes through middleware and the 
controller in the following order:

1. Request received from client.
1. The `before` method of all sitewide middleware, in the order defined in the config value `http.sitewide_middleware`.
1. The `before` method of any route group middleware for the specific route's group, in the order defined for the group in the config value `http.middleware_groups`.
1. The `before` method of any middleware defined for the specific route, in the order provided.
1. The `before` method of any middleware defined for the specific controller, in the order provided.
1. The `handle` method of the controller.
1. The `after` method of controller-specific middleware in reverse order.
1. The `after` method of route-specific middleware in reverse order.
1. The `after` method of route group middleware in reverse order.
1. The `after` method of sitewide middleware in reverse order.
1. Response sent to client.

## Custom Route Data

The middleware is configurable by data that goes with the route. 
The `data` property assigned to the relevant route is passed to the middleware 
functions (as the 2nd argument to `before` and the 3rd argument to `after`).

## Stopping Request Progress

If in the middleware it is determined that the route should not proceed,
you can terminate it by setting `request.shouldContinue` to `false` and 
providing a response as `request.response`. If you do this,
the HTTP service will send the response back out through any previous middleware
and out to the client without letting the request continue to the controller.

This can be useful for redirecting or throwing errors based on conditions
detected in the middleware.

```js
function handle(request, data) {
  if (!request.user) {
    
    request.shouldContinue = false;
    
    let response = new HttpResponse();
    response.redirect("/login");
    request.response = response;
  }
  return request;
}
```
