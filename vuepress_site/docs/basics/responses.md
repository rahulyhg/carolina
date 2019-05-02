
# HTTP Response Objects

## Basic Responses

All of your handler methods in controllers must return instances 
of `HttpResponse`.

```js
const HttpResponse = require('carolina/main/http/http-response');
```

Controllers contain some helper methods to generate responses for you.

### Text

A very simple response object can be created with the `BaseController`
method (inherited by your controllers) `sendText`. Send text takes a 
string as an argument and returns a 200 status HttpResponse object.

```js
async handle(request, data={}) {
  return this.sendText("Hello, world!");
}
```

You could also specify a different status code other than 200:

```js
async handle(request, data={}) {
  return this.sendText("Global error!!!", 500);
}
```

### JSON

You can use the `sendJSON` method to send an object or array in JSON form
with the `Content-Type` of `application/json`
(the status is optional here too, and defaults to 200).

```js
async handle(request, data={}) {
  return this.sendJSON({
    success: true,
    created: true
  }, 201);
}
```

### Response Objects

You can use HttpResponse objects to configure things more specifically.

```js
async handle(request, data={}) {
  let response = new HttpResponse({
    body: "Hello, World!",
    status: 200
  });
  // set a response header
  response.setHeader("X-My-Custom-Header", "Value");
  // the response must be returned
  return response;
}
```

### Response Headers

You can also set multiple headers on the response object.

```js
response.setHeaders({
  "X-Value1": "1",
  "X-Value2": "2"
});
```

### Response Cookies

You can also set cookies on the response object.

```js
response.setCookieValue("CookieName", "CookieValue");
```

If you are using `CookieEncryptionMiddleware`, then all cookies will be 
encrypted on the client, except for those listed in under the value 
`unencrypted_cookies` in `config/http.js`.

## Session Values 

You can set session values using the response object. They will be available 
on future requests during the same session.

```js
response.setSessionValue("key", "value");
```

::: warning 
What types can easily be stored in the session can depend on the type of 
Session service you are using. String values are the safest.
:::


## Redirection

You can redirect by using the controller method `redirect`.
The default status for a redirect is 302.

```js
async handle(request, data={}) {
  return this.redirect("/login", 301);
}
```

## Views

Views are special singleton classes (managed by the `Views` service) that have
helper methods for generating responses.

### Pug Template Views

One View class, the `PugTemplateView`, will return a response by rendering 
a specified [pug](https://pugjs.org/) template from your projects 
`templates` directory.

```js
class SomeController extends BaseController {
  async handle(request, data={}) {
    let PugTemplateView = Carolina.$("Views")._view("PugTemplateView");
    return await PugTemplateView.make({
      template: "mytemplate.pug",
      data: { name: "My Name" }
    }, request);
  } 
}
```

The above controller would render the pug template `templates/mytemplate.pug`,
with the value of `name` being available as `locals.name`. Several other things,
including the Carolina site configuration and session CSRF token, are 
also available to the template. For more on this, see the docs on 
[Pug Templates](/frontend/pug-templates).

### File Download

To return a file for downloading as the response, you can use the
`FileDownloadView` class.

```js
async handle(request) {
 let FileDownloadView = Carolina.$("Views")._view("FileDownloadView");
 let response = await FileDownloadView.make("temp",
  "pic.png", "m.png");
 return response;
}
```

This will look in your temp drive for `pic.png` and return a view that will 
download that picture as `m.png`. In order for this to work, you should 
use a drive that is of the type `LocalFileDriver` (the default).

For more on files and drives, see the 
[Files docs](/advanced/files).