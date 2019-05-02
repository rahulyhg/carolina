
# Framework Services & Class Libraries

The Services of the Carolina library are available, as documented 
in an [earlier section](/docs/overview/service-library.md), are available 
from the Carolina global object via the `$(serviceName)` method. This section
includes more details on the Services available as well as how to use the 
class libraries that many of these Services maintain.

Many parts of this section are not required for all applications, and this
section can be skimmed.

## Class Libraries

There are two basic types of class libraries: libraries of actual classes
and libraries of singletons. There is also the special case of "drivers",
which are a part of some Services.

Regardless of the type, each item in such a library has a canonical name.
The libraries are made up of items that come as a part of the framework, those 
exported by a certain file in your `site/` directory, and those exported 
by plugins.

### Singleton Objects

Singleton libraries are sets of singleton classes accessible from a certain 
Service. Examples include Controllers (maintained by the Http Service)
and Listeners (maintained by the Events Service).

You would rarely need to gain access directly to most of these singletons.
Controllers, for example, are automatically called by the Http Service to 
handle incoming requests and Listeners are automatically called by the 
Events Service when Events are thrown.

Supposing you need to inspect a certain Listener (perhaps, since its a 
singleton, it keeps a count of something going):

```javascript
let EventsSvc = Carolina.$('Events');
let myCustomListenerInstance = EventsSvc._listener('MyCustomListener');
```

These are the types of singleton objects in the Carolina framework,
along with descriptions. See the bottom of this page for a list 
of class types with their associated Services.

**Listeners**

Listeners are classes that define an `async handle(event)` method that are 
passed an Event object everytime one is thrown that the Listener is configured 
to listen for. The configuration mapping Event classes to Listeners is found 
in `config/events.js`.

**Controllers**

Controllers are classes that define one or more
`async methodName(request, data={})` methods that take HttpRequest objects
and return HttpResponse objects. The mapping of certain routes to certain
Controllers and their methods is found in `site/http/routes/index.js`.

**Middleware**

Middleware are classes that define an `async before(request, data={})` method
and an `async after(request, response, data={})`. They are called automatically
by the Http Service on incoming requests and outgoing responses.

**Rules**

Rules are classes that define a `validate(config, value)` method that 
returns true or false based on whether an object passes validation based on that
rule. Rules are often attached to Schemas that are used by the Validation 
Service to validate certain objects and inputs and by the DB Service to define
database Models.

**Schemas**

Schemas are classes that are made of Fields and sometimes Rules. They are used 
by the Validation Service and sometimes attached to database Models.

### Classes

Class libraries are sets of classes available from certain Services. Examples
include Models (maintained by the DB Service) and Errors (maintained by
the Errors Service).

Suppose that you need an Event (from the Events Service). You can get one
to fire this way:

```javascript
let EventsSvc = Carolina.$('Events');
let MyCustomEvent = EventsSvc._eventClass('MyCustomEvent');

let event = new MyCustomEvent({ ... });
event.fire();
```

**Fields**

Fields are classes that describe what an attribute on an object or database 
model should look like. Schemas are made up of Fields.

**Models**

Models are classes that represent certain data objects in the database.
They are correlated with Schemas.

**Errors**

Errors are classes that can be constructed and then thrown, and contain
metadata describing an error.

**Events**

Events are objects that define data and can be "fired", being passed to any
Listeners configured to listen to the specific Event type.

### Drivers

Drivers are sets of classes that you generally don't need to access directly.
Instead, a Service maintains a limited number of instances based on 
configuration found in the `config/` directory. Examples include
Loggers (maintained by the Logger Service) and Mailers (maintained by the 
Email Service). They are often referenced by name.

For example, the "public" File Driver is accessible from the Files Service.

```javascript
let FilesSvc = Carolina.$('Files');
let publicFileDriver = FilesService.drivers['public'];
```

**Mailers**

Mailers are e-mail sending configured objects. They are managed by the
Email Service based on the configuration found in `config/email.js`.
Every project must at least
define a "default" Mailer.

**File Drivers**

File drivers are objects that manage access to files. They are managed by 
the Files Service based on the configuration found in `config/files.js`.
Every project must define at least the "public", "private", and "temp"
file drivers.

**Loggers**

Loggers are objects that react to log events and handle them in various
ways. They are managed by the Logger Service based on the configuration
found in `config/logger.js`.

## Class Reference

| Class Name | Type | Managing Service | Method | Base Class |
| --- | --- | --- | --- | --- |
| Command | Special | Terminal | *Accessed via CLI* | `BaseCommand` |
| Controller | Singleton | Http | `HttpSvc._controller(name)` | `BaseController` |
| Error | Class | Errors | `ErrorsSvc._errorClass(name)` | `BaseError` |
| Event | Class | Events | `EventsSvc._eventClass(name)` | `BaseEvent` |
| Field | Class | DB | `DBSvc._fieldClass(name)` | `BaseField` |
| FileDriver | Driver | Files | `FilesSvc.drivers[name]` | `BaseFileDriver` |
| Listener | Singleton | Events | `EventsSvc._listener(name)` | `BaseListener` |
| Logger | Driver | Logger | `LoggerSvc.loggers[name]` | `BaseLogger` |
| Middleware | Singleton | Http | `HttpSvc._middleware(name)` | `BaseMiddleware` |
| Mailer | Driver | Email | `EmailSvc.mailer[name]` | `BaseMailer` |
| Model | Class | DB | `DBSvc._modelClass(name)` | `BaseModel` |
| Rule | Singleton | Validation | `ValidationSvc._rule(name)` | `BaseRule` |
| Schema | Singleton | Validation | `ValidationSvc._schema(name)` | `BaseSchema` |

