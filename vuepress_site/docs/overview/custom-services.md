
# Custom Services

As discussed in the 
[previous section](/docs/overview/service-library.md), the global Carolina 
object maintains a library of Services. The Services which will be available
are the ones listed in the `services` property in the file `config/app.js`.
Most of them are part of the Carolina framework, but one (which is called
"App") is defined in the starter project as a starting point for a custom 
Service.

This section covers writing your own custom Service.

## Writing Services

All Services, custom or otherwise, must extend the `BaseService` class,
which is exported by the file `carolina/services/base-service.js`.

You can generate a new Service using the CLI:

```
node . generate service MyCustomService
```

The above command would generate a new Service class in the file
`site/main/services/my-custom-service.js`.

### The Service Constructor

Generally, very little should take place in the constructor for a Service.
You should **not** attempt to reference any other Services in the constructor.
Because the Carolina global object makes Services available on demand, you 
shouldn't have to either. The constructor should take no arguments, and 
should pass its name to the constructor of `BaseService`. It is not required
that this name actually match the name under which the Service will be available
from the Carolina object, but it will be used in some logging messages.

```javascript
class MyCustomService extends BaseService {
  constructor() {
    
    super('MyCustomService');
    
    // basic initialization, if necessary
    this.someKey = 'someValue';
  }
}
```

Once this Service is registered, the constructor will only be called once the
first time this Service is needed by your application.

### Service Methods

You can define your own custom methods on the Service, and this is probably 
the main use for a service.

Avoid naming methods that start with an underscore and don't call any method 
`onShutdown()` unless you are intending to write the `onShutdown()` method.
If you follow these rules, everything should be fine.

```javascript
class MyCustomService extends BaseService {
  
  // constructor 
  
  multiply(x, y) {
    return x * y;
  }
}
```

If the above Service were properly registered, you could then do the following
from any part of your application:

```javascript
let MyCustomSvc = Carolina.$('MyCustomService');
let twentyFive = MyCustomSvc.multiply(5, 5);
```

**The `onShutdown` Method**

The `onShutdown()` async method is called and awaited on every Service when 
the application shuts down - so do anything that needs to be done there. 
Your Service will be initialized even if it wasn't used at all during the 
application lifecycle, and the `onShutdown` method will be called and 
awaited (and given no arguments).

### Service Libraries

As is covered in later sections, some Services maintain libraries of class
definitions and/or singletons of a certian type. This is more advanced - and 
is probably mostly useful if you are writing a plugin, but
if you wish for your
Service to do this, there are some helper methods to make this easy.

For context and some examples,
the DB Service maintains class libraries of Models and Fields,
the Http Service maintains libraries of Controller and Middleware singletons,
and the Events Service maintains a library of Listener singletons and 
Event classes. The classes that make up these libraries are defined in the 
Carolina framework but can be loaded from your `site/` directory as well.
In fact, this is how the Http Service gets access to your custom 
Controllers and Middleware, for example.

Suppose that you want your custom Service to maintain a library of 
singletons that provide the ability to make a post on various social media 
platforms. You want all those singletons to be of classes that implement
a certain API but define different details under the hood.
In this case, you might want to elsewhere define a `BaseSocialMediaConnection`
class and document that all social media connection classes must subclass it.

You would also decide where these things should be defined in the site
directory. Perhaps under the directory `site/social/connections/`.

You would want to do this in the constructor:

```javascript
class MyCustomService extends BaseService {
  constructor() {
    
    // other stuff
    
    this._initializeLibrary("socialConnectionClasses", "socialConnections",
      'social/connections', {}, "social media connection");
  }
}
```

The `_initializeLibrary` method is defined as part of `BaseService`.
Its arguments are as follows (in order):

* `classLibraryName`: The name of an object to store the class library.
* `instanceLibraryName`: The name of an object to store the insantiations.
* `location`: Where to look in the `site/` directory or in plugins for class definitions.
* `initialClasses`: Any classes that should be a part of the library automatically.
* `name`: A user-friendly name for the object type, helpful for error messages but otherwise irrelevant.

The method does the following things when called.

* Create the property `socialConnectionClasses` on your service and initialize it to the 4th argument provided.
* Create the property `socialConnections` on your service and initialize it as an empty object.
* Update `socialConnectionClasses` with whatever is exposed by `site/social/connections.js` or `site/social/connections/index.js`.
* Update `socialConnectionClasses` with whatever is exposed by `<plugin_dir>/plugin/social/connections.js` or `<plugin_dir>/plugin/social/connections/index.js` for each installed plugin.

At the end of this, your Service object will have a `socialConnectionClasses`
property that is an object mapping names to classes.

If you want to defined social media connections, the file 
`site/social/connections/index.js` should export like so:

```javascript
exports = module.exports = {
  'FacebookConnect': FacebookConnect, // some class
  'TwitterConnect': TwitterConnect   // also some class
};
```

You will need to do one more thing, if you want these things to be a library 
of singletons:

```javascript
class MyCustomService extends BaseService {
  
  // constructor
  
  _socialConnection(name) {
    return this._lazyLoadObject(name, 'socialConnectionClasses',
      'socialConnections', "social connection");
  }
}
```

In this, the 2nd and 3rd arguments to `_lazyLoadObject` must match the 
1st and 2nd arguments to `_initializeLibrary`. The final argument is again
cosmetic.

What this does is take a name, check the property `socialConnections` for 
an existing instance. If one is found, that instance is returned. Otherwise, 
the `socialConnectionClasses` property is checked for a class definition. If
one is found, it is instantiated (with no arguments to the constructor) and 
stored in `socialConnections` for future use and returned. If there is no
existing instance and no class defined, an error like 
"no matching social connection" will be raised.

If this is all done properly, you could do the following from any part of the 
application:

```javascript
let MyCustomSvc = Carolina.$('MyCustomService');
let facebookConnection = MyCustomSvc._socialConnection('FacebookConnect');
facebookConnection.makePost({ ... });
```

Singleton libraries like this probably make the most sense in this context,
but suppose you wanted to make it only a class library of uninstantiated
classes. You would do the same thing in the constructor, but do this 
as a method instead:

```javascript
class MyCustomService extends BaseService {
  
  // constructor
  
  _socialConnectionClass(name) {
    return this._loadClass(name, 'socialConnectionClasses', 'social connection');
  }
}
```

In this case, the 2nd argument to `_loadClass` must match the 1st argument 
to `_initializeLibrary`. This simply returns the class, allowing this:

```javascript
let MyCustomSvc = Carolina.$('MyCustomService');
let FacebookConnect = MyCustomSvc._socialConnectionClass('FacebookConnect');
facebookConnection = new FacebookConnect();
```

## Registering Services

To property register your new Service, you add the following to `services`
under `config/app.js`:

```javascript
  // other services
  
  MyCustomService: "./site/services/my-custom-service",
  
  // yet more services
```

This is what allows `Carolina.$('MyCustomService');` to work.