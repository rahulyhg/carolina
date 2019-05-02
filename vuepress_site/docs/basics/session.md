
# Session

A session is a way of storing values across multiple requests from the same 
user. Carolina comes with several options for a "Session" service.

## Session Configuration

The following Session Service implementations are included with Carolina.
Specify the path to the one
you want to use in `config/app.js`.

| Class Name | Path | Description |
| --- | --- | --- |
| **`DbSessionService`** | `carolina/services/session/db-session` | Stores session data in the database using the built-in `SessionInfo` model. This is the default for new projects. |
| `InMemorySessionService` | `carolina/services/session/in-memory-session` | Stores session data as an object in memory. Does not persist and should only be used in development. |
| `JsonFilesSessionService` | `carolina/services/session/json-files-session` | Subclass of `InMemorySessionService`, but saves session data to local files during `onShutdown()`. |
| `NodeCacheSessionService` | `carolina/services/session/node-cache-session` | Stores session data using the NPM module `node-cache`. Does not persist. |
| `RedisSessionService` | `carolina/services/session/redis-session` | Stores session data in a redis server. Works with AWS ElastiCache. |

## Session Service Configuration

The Session Service to use is specified in `config/app.js`. 
Configuration for the Session Service is located in `config/session.js`.

If you are using `JsonFilesSessionService`, you will need to have 
the `sessionFilesDir` attribute point to a folder where you want JSON files 
be stored. By default, it points to `storage/session/` which is also 
git-ignored by default.

If you are using `RedisSessionService`, you will need to have a Redis server 
set up. The `RedisSessionService` works well with AWS ElastiCache Redis 
servers, provided you set up the security and permissions.
To use `RedisSessionService`, you will need to configure the `redisHost` and 
`redisPort` attributes. By default, they look for "REDIS\_HOST"
and "REDIS\_PORT" in your `.env` file and fall back, respectively, to 
"localhost" and "6397".

## Using Session Data

### Accessing Session Data

By default, all incoming requests to the "browser" middleware group go through 
the `SessionMiddleware` middleware (this is specified in `config/http.js`).
In that case, if session ID is found in the cookies of an incoming request,
and that session ID matches a valid session, the sesson data will be available
as `request.session`. In all other cases (including when the middleware 
is not used at all), `request.session` will be an empty object.

Here is an example method in a route controller:

```js
async handle(request, data={}) {
  
  // get the key out of the session if it exists.
  let specialKey = request.session.specialKey || null;
  
  // do something with the special key
  
  console.log(request.session) // => { specialKey: 1, csrf_token: "some_token", etc... }
}
```

### Setting Session Data

When you create an `HttpResponse` object, it will have an empty object as
`response.session`. You can add any JSON-stringifiable data to it.

If the route is using `SessionMiddleware`, then the pre-existing session 
from the request will be updated with the `response.session` (overwriting
any existing keys) and saved with the `SessionService` (and made available
in the next request).

```js
async handle(request, data={}) {
  let response = this.sendText("Hello, World!");
  response.session.specialKey = 1;
  return response;
}
```

::: danger DANGER
Be careful about what you assign to `response.session`. Some implementations 
of the Session Service need to call `JSON.stringify` against the session 
object. It is safest to stick to basic types (strings, numbers, arrays, objects)
and avoid insantiated classes or circular references.
:::

In setting session values, you should avoid the following values which 
are used by various parts of the Carolina framework:

* `csrf_token`
* `flash_messages`

## Flash Messages

Flash Messages are special messages that will appear only on the next 
request (to anywhere on your site that uses `SessionMiddleware`). 
Flash message objects are stored in the session as `flash_messages`, and 
old ones are automatically deleted.

Flash messages are useful for carrying information through following a 
redirect.

The easiest way to use flash messages is to use the
`response.flash(message, title, severity)` method.

```javascript
async handle(request, data={}) {
  let response = this.redirect("/other-page");
  response.flash("You were redirected.", "Attention!");
  response.flash("Your last operation was successful.", null, "success");
  return response;
}
```

Note that the default title is null and the default severity is "primary".
You can access this data in your pug templates as
`request.session.flash_messages`, but there is a built-in mixin 
provided in `templates/carolina/session/mixins.pug`.

Suppose that after the above redirect, the controller for "/other-page"
returned the template below:

```pug
extends carolina/base/bootstrap_base

include carolina/session/mixins

block body
  div.container
    +flashMessages(locals.request)
```

In that case, the relevant generated HTML would be this:

```html
<div class="alert alert-primary">
  <b>Attention!</b>
  You were redirected.
</div>
<div class="alert alert-success">
  Your last operation was successful.
</div>
```

You are free of course to make your own mixins to work better with frameworks 
other than bootstrap.

## Custom Session Service Implementation

For information on writing your own implementation of the Session Service 
to work with the Carolina framework, see the
[Custom Session Service](/customservices/session.md) page.


