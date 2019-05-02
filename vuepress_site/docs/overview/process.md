
# Basic Server Process

This section covers the basic process of what happens when you run the server
and the application receives an HTTP request.

## Server Setup

The Carolina framework uses the
[ExpressJs](https://www.npmjs.com/package/express) NPM module as the underlying
web server and router manager. You start the server by running the 
following command:

```
node . runserver
```

When you run this (or any other) terminal command, the file 
`initialize/app.js` is called first. This file reads the contents of the 
`.env` file into the environment, and creates the global Carolina object.
It registers the various Services (which are the main part of the framework)
as well as the configuration to the global Carolina object. 

The Carolina object manages a library of Services, many of which come with the 
framework, but user-defined and plugin-defined Services may be registered as 
well. One included Service is the Http Service, which manages an ExpressJs
web server. Services are 
lazy-loaded in the sense that they are singletons which are lazy-loaded the 
first time they are needed.

The Terminal Service, which handles CLI commands, is initialized, and if the 
command is `runserver`, the Http Service is initialized and set to listen for
incoming requests.

## Request Cycle

When an HTTP requests is received, it is handled by the HTTP service which
casts it into an HTTP Request object. The request is mapped to the appropriate
route and walked through the `before` methods of various Middleware singletons
(based on the route group, specific route, or Controller handling the request).
The request is then given to the Controller which returns a response.
The response is then walked through the `after` methods of the same Middleware
list but in reverse order. Once that is done, the response is sent to the
client.

During the above cycle, many other Services may be called and used.
For example, the Controller may throw an Event using the Events Service,
insantiate, modify, and save a Model using the DB Service, or send an e-mail 
using the Email Service. This library of Services is the main aspect of the 
framework.

## Tear Down

Whenever the server is stopped, or when any CLI command is complete, 
every registered Service has its `onShutdown` method called and "awaited"
before the process exits. Once you get to writing your own Services, 
you can define this method to do any shut down work it needs to do.