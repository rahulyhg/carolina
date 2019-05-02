
# Models

The Database Service maintains a library of Model classes. Some Models are 
included with the framework, and some are defined by you or by installed 
plugins.

Each Model class represents a collection in a database. Before using Model 
classes, ensure that your Database Connections are properly configured as 
described in the [introduction to the DB Service](./db-service.md).

You can access Model classes from the DB Service:

```javascript
let DBSvc = Carolina.$('DB');
// get the User class
let User = DBSvc._modelClass('User');
// get the SessionInfo class
let SessionInfo = DBSvc._modelClass('SessionInfo');
```

[[toc]]

## Defining Models

Your custom Model classes should be defined inside the 
`site/db/models/` directory and exported by the file
`site/db/models/index.js`. Models that come with the framework are exported 
by the file `carolina/main/db/models/index.js`. Models that from plugins 
are exported by the file `<plugin_dir>/plugin/db/models.js` or 
`<plugin_dir>/plugin/db/models/index.js`.

You can generate a Model class using the CLI:

```
node . generate model MyCustomModel
```

This would create the file 
`site/db/models/my-custom-model.js`. That file will include the basic
scaffold of a Schema class and a Model class.

### Database Connection

By default, the DB Service will manage all Models using the "default" database
Connection. If you want to use other database Connections for specific 
models, configure those connections in `config/db.js` as described in the 
introduction to the [DB Service](./db-service.md).

## Getting Model Instances

You can get a Model class from the DB Service, and you can use static methods 
of the Model class to get all objects in the collection:

```javascript
let User = DBSvc._modelClass('User');
let allUsers = await User.$all(); // => [ User{}, User{}, ...]
```

::: warning
Don't use the `$all` method for collections that may have many objects.
:::

### Queries

You can use the `$query` method to get all instances of a Model that match 
a certain query:

```javascript
let adminUsers = await User.$query({ isAdmin: true });
```

For more details on Model queries, see the section on
[queries](./queries.md).

## Getting Single Instances

If you have the `_id` of an object, you can use the `$lookup` method:

```javascript
let specificUser = await User.$lookup('12345');
```

If you want to get the first object found that matches a specific query,
use the `$get` method:

```javascript
let firstAdminUser = await User.$get({ isAdmin: true });
```

### Checking for Null

When using the `$lookup` or `$get` methods, you should always check to see 
if the return value is `null`. Those methods will return an instance of the 
Model class if a match is found, but will otherwise return null.

```javascript
let someUser = await User.$get(query);
if (someUser == null) {
  console.log("No matching user...");
}
else {
  console.log(`Matching user: ${someUser.username}`);
}
```

## Inserts and Updates

### Creating Instances

You can create new instances of Model classes by calling their constructors, 
using any other methods on them if desired,
and then calling the async `_save` method:

```javascript
async handle(request, data={}) {
  
  let DBSvc = Carolina.$('DB');
  let User = DBSvc._modelClass('User');
  
  let user = new User({ username: request.data.name });
  user.isAdmin = true;
  user.setPassword("password123");
  let newUserId = await user._save();
  
  // other stuff
}
```

This example creates a new User object from request form data, makes the user 
and admin account, and gives it a password. The object is then saved. 
The `createdAt` and `updatedAt` properties will be automatically set, and 
an `_id` will be assigned (and returned from the `_save` method).

### Updating Instances

The same `_save` method can be used on instances that are already in the 
database. When you do this, the `updatedAt` property will be adjusted:

```javascript
let someUser = User.$lookup('12345');
console.log(someUser.updatedAt); // => moment object for some earlier time
someUser.isAdmin = true;
await someUser._save();
console.log(someUser.updateAt); // moment object for just now
```

### First or New

The Model method `$getOrNew` takes a simple query object only. If there is 
a matching object, it will be returned. Otherwise, a new instance of the 
Model class will be created. In that case, it will not yet have an `_id` 
and will not yet be persisted to the database, and will need to be saved.

To ensure that a user named "new_user" exists in the database:

```javascript
let user = await User.$getOrNew({ username: "new_user" });
await user._save();
```

## Deleting Instances 

To delete an instance from the database, call the `_delete()` method. 
It is important that you not save an item that you still have a reference 
to after you delete it.

```javascript
let user = await User.$get({ username: "bad_user" });
await user._delete();
```

## Model Comparison

To determine if two model instances refer to the same database record,
you can use the `_is` method (which compares their IDs):

```javascript
let isTheSame = (userInstance1._is(userInstance2));
```
