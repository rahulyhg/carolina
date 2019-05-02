
# The Carolina Global Object

The Carolina global object is made global so that you can access configuration
values and Services at runtime.

Suppose you are writing a Controller and need access to the User Model. Like 
all Models classes, the User class is part of a library of Model classes
maintained by the DB Service.

```javascript
const BaseController = require('carolina/main/http/controllers/base-controller');

class MyCustomController extends BaseController {
  
  async handle(request, data={}) {
    
    let userId = request.data.id;
    
    // get DB Service
    let DBSvc = Carolina.$('DB');
    // get User model class
    let User = DBSvc._modelClass('User');
    
    let userObj = await User.$get({ _id: userId });
    
    // more stuff
  }
}
```

Here, we used the Carolina global object to get a reference to the singleton 
DB Service, and then used that service to get a reference to the User class.

All Services are singletons and available via the `$` method of the 
Carolina global object as long as they are properly registered.

## Service Registration

**Registration In `config/app.js`**

If you look at the file `config/app.js`, you will notice that the app 
configuration object has the `services` property. It maps names of Services
to the require paths of classes (all of which extend `BaseService`). Most
of the ones listed in the starter project are built-in services.

Because the framework relies on the built-in servies having the 
proper API, you should leave most of these alone, except for in the case of 
DB Service or Session Service - for which you have a few options for which
class you want to use for those Services (more on this topic in a later
section). Because of how this is structured, you could also subclass any 
Service class and use that subclass instead, but this will probably not 
be necessary. In addition to Carolina built-in services, there is a custom
service that you define, as well as the Services of
two default plugins (Auth and Admin). 

The Carolina global object will read this configuration and keep a map of
Service names to require paths. The first time any given Service is needed,
it is instantiated once, and all subsequent requests for the Service are
answered with the same object.

**Registering Arbitrary Values**

On a topic slightly similar to Services, the Carolina global object has a
propery call `values`, which is initialized as an empty object. You can 
put anything on it to retreive from anywhere else in the application.
There is the getter method `value(key, defaultValue)` and the setter
method `setValue(key, value)`.

Example:

```javascript
Carolina.setValue("SOME_KEY", "SOME_VALUE");
```

Later, in another part of the application:

```javascript
let v = Carolina.value('SOME_KEY', 'DEFAULT_VALUE') // => 'SOME_VALUE'
```

It is a good idea to always provide a default when trying to access a value 
like this. The default default is `null`.

## Accessing Services

### Lazy Loading

As mentioned above, Services are only first initialized when they are needed.
For example, the first time some part of you application needs the DB Service,
it is constructed for the first time. At this point all Fields and Model classes
are loaded as well. The next time it is needed, the same DB Service is 
available as it is for the rest of application lifecycle.

### Service Accessing

Accessing a Service is easy. You pass its canonical name to the `$(serviceName)`
method of the Carolina global object:

```javascript
let EventsSvc = Carolina.$('Events');
let DBSvc = Carolina.$('DB');
```

## The `BaseService` Class

All Services extend the `BaseService` class, which is defined in 
`carolina/services/base-service.js`. It carries a few helper methods
as well as the `onShutdown()` async method which is called for every service
when the application is shut down.