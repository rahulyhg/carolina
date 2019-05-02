
# Controller Classes

While you can write the route handling logic for an entire app using the
`func` property of all your route specifications (see [Routing](/basics/routes)),
it is generally better to group your handling logic in controller classes.

Those classes are stored in the `site/http/controllers` directory and must 
be exposed by name in `site/http/controllers/index.js`.

## Basic Controllers

### Writing Controllers

You can generate a new controller using the generator command:

```
node . generate controller ExampleController
```

Running the above command would generate the file
`site/http/controllers/example-controller.js`. 
It would look something like this:

```js
const BaseController = require('carolina/main/http/controllers/base-controller');

class ExampleController extends BaseController {
  
  constructor() {
    super();
  }
  
  async handle(request, data={}) {
    return this.sendText("Hello, world!");
  }
}

exports = module.exports = ExampleController;
```

You would need to export this class in your `site/http/controllers/index.js`
file like this:

```js
exports = module.exports = {
  // other controllers
  "ExampleController": require('./example-controller')
};
```

Note the default controller method "handle" is stubbed.

This controller could be referenced in your routes like this:

```js
exports = module.exports = [
  {
    route: "/some/route",
    controller: "ExampleController",
    method: "handle"
  }
];
```

The `method` property here is not needed, since `handle` is assumed as the 
default controller method when one is not provided.

The `method` property allows you to defined multiple alternative handler 
functions in the same controller and map specific routes to them.

For example, you could add a method with the same signature called 
`otherHandler`:

```js
async otherHandler(request, data={}) {
  return this.sendText("Other Handler Response.");
}
```

You would reference it like this in your routes:

```js
exports = module.exports = [
  {
    route: "/some/route",
    controller: "ExampleController" 
    // will use the handle method by default
  },
  {
    route: "/some/other/route",
    controller: "ExampleController",
    method: "otherHandler"
  }
];
```

Now, incoming requests to `/some/other/route` will be handled by the 
`otherHandler` method, returning the text "Other Handler Response." to the 
browser.

::: info
Note that your controller classes are not technically required to extend 
the carolina `BaseController` class, but `BaseController` provides
several convenience methods such as `sendText()`.
:::

When creating controller methods, avoid overriding the following methods:

* `getMiddleware`
* `pugTemplate`
* `redirect`
* `sendJSON`
* `sendText`

## Carolina Controllers and Package Controllers

### Carolina Controllers

The Carolina Http service keeps a mapping of all controller names to controller 
classes. You should avoid overriding built-in Carolina controllers.
The built-in controllers handle special route functions like processing 
route `func` properties, performing redirects, and rendering templates.

This is a list of built-in controllers:

| Name | Purpose |
| --- | --- |
| `FunctionController` | Automatically used to process routes that define a `func` property by wrapping the provided function. |
| `RedirectController` | Automatically used to process routes that define redirects. |
| `TemplateController` | Automatically used to process routes that specify templates. |

### Package Controllers

Packages built for Carolina should export controllers by names like 
`<package_name>/<controller_name>`, for example `my-package/MyController`.

This convention is not enforced but is recommended to avoid possible name 
collisions.

As long as the package is installed in `node_modules` and listed as a
package in your config (see [Using Packages](/advanced/using-packages)),
you can reference its controllers like this:

```javascript
exports = module.exports = [
  {
    route: "/some/route",
    controller: "my-package/MyController"
    // specify method if needed
  }
];
```

## Controller Middleware

It is easy to specify middleware (in addition to sitewide middleware and 
route group middleware) in the route specification:

```javascript
exports = module.exports = [
  {
    route: "/some/route",
    controller: "SomeController",
    middleware: ["SomeMiddleware", "SomeOtherMiddleware"]
  }
];
```

In cases where you are grouping related handlers into a single controller 
class, it might be helpful to specify middleware at the controller level.
This is done by overriding the `getMiddleware` method of your controller 
class. 

```javascript
getMiddleware() {
  return ["SomeMiddleware"];
}
```

The middleware defined here will be executed last (after sitewide middleware,
route group middleware, and route-specific middleware).