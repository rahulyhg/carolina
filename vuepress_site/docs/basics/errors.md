
# Exceptions

In a new project, any uncaught
exceptions that take place during the HTTP request cycle
should return an error page to the user.

## Relevant Configuration

If the value of `debug` in `config/app.js` is true, the returned information
will have a lot of details (including sensitive information).
Do not have `debug` set to true in production as everything, including site 
secret keys, will be available to a visitor that sees the error page.

If the value of `emitErrors` in `config/errors.js` is true, 

The function `respondWithJson` in `config/errors.js` will be called to 
determine if the response page should be in JSON instead of the normal HTML
view. By default, JSON will be used if the route contains the string
"api/"
or if the request "Accept" header reads "application/json".

## Error Handling

When an error takes place anywhere within the request/response cycle,
it is raised to the **Errors Service** for handling.

### Reporting Errors

If the `emitErrors` property in `config/errors.js` is true, the Errors
Service will build an `ErrorEvent` using the thrown error, the HttpRequest
object, and the HttpResponse object (if the error took place after the
Controller returned). That Event will then be fired. By default, the 
`LogError` Listener (which will create log events for every error it 
receives as part of an `ErrorEvent`) is configured to listed for 
`ErrorEvent` Events. You could create your own Listeners and configure
them to also listen for and handle `ErrorEvent` instances. You would do
the configuration in `config/events.js`.

### Rendering Errors

After the `ErrorEvent` is thrown (if applicable), the Error is then rendered
into an HttpResponse object. How it will be returned is in part determined by
the `respondWithJson` method in `config/errors.js`. That method will be 
called, and if it returns `true` a JSON HttpResponse will be made. Otherwise,
a normal HTML response will be made and sent back to the client. The response
is further determined by the value of the `debug` property in `config/app.js`.
If `true`, the response (whether JSON or HTML) will have a lot of details.
If `false`, the response will be very basic.
