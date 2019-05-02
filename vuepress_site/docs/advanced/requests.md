
# The Requests Service

The Requests Service, which is available from the Carolina object, 
maintains a library of "browsers" for making HTTP request within your 
application.

```javascript
let RequestsSvc = Carolina.$('Requests');
```

## Configuration

The Requests Service is configured by the file `config/requests.js`. The
configuration should contain a value `browsers` an object mapping
names to configuration objects for specific browser instances (described 
more further down). You can use additional custom names, but one named 
"default" MUST exist.

```javascript
// config/requests.js
exports = module.exports = {
  browsers: {
    'default': {
      driver: 'AxiosBrowser',
      defaultHeaders: { 'Accept': "application/json" } }
  }
};
```

## Browsers

Browsers are a driver class which are used to send HTTP requests. The only
Browser type that comes with the framework is called "AxiosBrowser", which 
is a simple wrapper around the "axios" library.  More drivers may be 
added in a future release.

You can configure as many instances as you want, but one of them must be named 
"default". You configuration may define the following values, in addition 
to driver:

* `defaultHeaders`: Default headers to use with all requests.
* `defaultParams`: Default parameters to use with all requests.
* `baseUrl`: Url prefix for all requests, but this should NOT be set for the default browser.

Suppose you want to regularly interact with an API. You could configure 
a specific browser like this:

```javascript
// config/browser.js
exports = module.exports = {
  browsers: {
    'default': { /* whatever */ };
    'api_consumer': {
      driver: 'AxiosBrowser',
      baseUrl: 'http://some_api/v1/',
      defaultHeaders: { 'X-API-KEY': "abc123" }
    }
  }
}
```

You could then use the API like this:

```javascript
let apiBrowser = RequestsSvc.browsers.api_consumer;
// send request to http://some_api/v1/users/1234
let response = await apiBrowser.get({ url: "users/1234" });
console.log(response.data);
```

Or using the Requests Service directly:

```javascript
let response = await RequestsSvc.get({ url: "users/1234" }, 'api_consumer');
console.log(response.status, response.data);
```

## Usage

Each browser (and the Requests Service itself) has a set of methods listed 
below. Each one takes an object with the keys described.

| Method | Object Keys | Description |
| --- | --- | --- |
| `get(obj)` | `url`, `headers`, `params` | Sends a GET request. |
| `post(obj)` | `url`, `headers`, `params`, `data` | Sends the data as a POST request. |
| `patch(obj)` | `url`, `headers`, `params`, `data` | Sends the data as a PATCH request. |
| `put(obj)` | `url`, `headers`, `params`, `data` | Sends the data as a PUT request. |
| `delete(obj)` | `url`, `headers`, `params` | Sends a DELETE request. |

If using the Requests Service, the second argument any of those methods 
should be the name of a browser. If none is provided, the "default" browser
configuration will be used.
