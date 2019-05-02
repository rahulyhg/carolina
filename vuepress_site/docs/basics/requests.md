
# HTTP Request Objects

Controllers and route functions take as the first argument an 
`HttpRequest` object.

## Request Path and Method

The path of the request is available as `request.url`.

```js
async handle(request, data={}) {
  request.url // => "/some/path"
}
```

The method of the request is available as `request.method`.

```js
async handle(request, data={}) {
  request.method // => "GET"
}
```

## The Express Request

If you are using `ExpressHttpService` as the underlying Http service
(currently the only one available), then the
[Express.js](https://expressjs.com/) request object will be available 
as `request._req`.

If there are any other Http service implementations available, whatever
object is used to represent requests by the framework in use should be
available as `request._req`. Otherwise, `request._req` will be null.

## Request Parameters

If your route has any parameters, they will be available in the 
`request.params` object.

Assume that you have a route to the path `/users/:name`, and 
a request was received for `/users/johnsmith`:

```js
async handle(request, data={}) {
  request.params // => { name: "johnsmith" }
}
```

## Request Input

Any incoming requests with a 
body and the a Content-Type of `multipart/formdata`,
`application/x-www-form-urlencoded`, or
`application/json` will be parsed and made available as `request.data`.

If a user posts the data `{ "x": 9, "y": 4 }`, then `request.data` might look
like this:

```js
async handle(request, data={}) {
  request.data // => { x: 9, y: 4 }
  request.data.x // => 9
}
```

## Query Arguments

Any URL query args are parsed and made available as `request.query`.

If an incoming requests goes to url `/some/url?n=9`, then `request.query` 
might look like this:

```js
async handle(request, data={}) {
  request.query // => { n: 9 }
}
```

## Cookies

### Request Cookies

If you are using the `CookieMiddleware`, any cookies will be available as an
object as
`request.cookies`.

```js
async handle(request, data={}) {
  request.cookies // => { cookie_key: "some_cookie_value" }
}
```

### Response Cookies

If you are returning an [HttpResponse Object](/basics/responses) directly from 
your handler, you can set cookies on it.

```js
async handle(request, data={}) {
  let response = new HttpResponse({ body: "Response text." });
  response.setCookieValue("cookie_name", "cookie_value");
  return response;
}
```

## Upload Files

Carolina automatically supports uploading files via `multipart/form-data` 
POST requests. Any files uploaded will be placed in your "temp" drive
with a random name.

For more on files and drives, see the 
[Files docs](/advanced/files).

The data from such multipart forms is available
(as with regular forms) as `request.data`. The entries in that object 
for uploaded files will show some metadata about the files, however 
the files are available more conveniently as Carolina File objects 
under `request.files`.

For example, if a file form input had the name of `upload`, then the File 
object pointing to the uploaded file would be available as
`request.files.upload`.

```js
async handle(request, data={}) {
  let fileObject = request.files.upload;
  let fileData = await fileObject.getBytes();
  let fileString = await fileObject.getAsString();
  // copy to "public" or "private" drive with intended filename instead of junk one
  await fileObject.copyTo("private", request.data.upload.originalFilename);
  return this.sendText(fileString);
}
```