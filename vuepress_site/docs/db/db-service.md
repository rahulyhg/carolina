
# The DB Service

The Database (or "DB") Service manages access to instances of Models that 
are stored in databases. It manages a set of database connections, which 
are configured in `config/db.js`.

The framework comes with two connection types:

* `JsonConnection`: The starting default. Stores the "database" as JSON files in the `data/` directory. Should only be used for very small scale testing.
* `MongoDbConnection`: Connects to a MongoDB instance.

[[toc]]

## Connection Configuration

Database connections are configured in the `connections` property
of `config/db.js`. It is an object mapping connection names to their 
configurations. You can have as many connections as needed, but one called 
"default" must exist.

**`JsonConnection` Configuration**

To configure an instance of `JsonConnection`, you must supply a path 
to a directory. The path will be interpreted with the current working directory
set to your project root and should point to a directory.

Example:

```javascript
'default': {
  driver: 'JsonConnection',
  path: './data/main/'
}
```

With this configuration, files like `user.json` and `log_entry.json` will be 
created in `data/main/` to be the database.

**`MongoDbConnection` Configuration**

To configure an instance of `MongoDbConnection`, you may need to identify the
`host`, `port`, and `dbName`. The default is a database called "main" 
on `localhost:27017`. You can also specify a `clientOptions` property, 
which will be passed into the second argument of the constructor
for `MongoClient` from the [mongodb](https://www.npmjs.com/package/mongodb)
NPM module (this may be necessary for supplying a username and password
for example).

Example:

```javascript
'default': {
  driver: 'MongoDbConnection',
  host: 'localhost',
  port: 27017,
  dbName: 'main'
}
```

### Mutiple Connections

You can have more than one DB Connection, but normally the "default" one is
used for everything. You can specify that certain tables belong to certain 
connections in the `connectionMap` property of `config/db.js`. For example,
you could define a "userdb" connection in `connections`, and reference it
for Users:

```javascript
exports = module.exports = {
  connections: {
    'default': {
      driver: 'JsonConnection',
      path: "./data/main/"
    },
    'userdb': {
      driver: 'MongoDbConnection',
      // default host and port
      dbName: 'auth'
    }
  },
  
  connectionMap: {
    user: 'userdb'
  }
};
```

The table name associated with each Model class is specified in the Model's
Schema. Under this example configuration, objects of the User model will be 
stored in the local MongoDB database "auth", and all other models will
be stored in local JSON files.

## Database Operations

Generally, you should use Model classes to perform Database operations, which 
is covered in a later section. You can use the DB Service to directly 
do stuff on the database.

You can get a reference to the DB Service from the Carolina global object:

```javascript
let DBSvc = Carolina.$('DB');
```

Every data for every Model instance has three forms, also described in more
detail in a later section. Those forms are DB Form, Object From, and JSON
Form. For example, a `DateField` entry is a Javascript Date in DB Form,
a [moment](https://www.npmjs.com/package/moment) object in Object Form,
and a string timestamp in JSON Form. When dealing with the DB Service directory,
everything is in DB Form and returned objects will be plain objects 
not Model class instances.

It is the methods of the Model class that translate
data between forms and instantiate instances.

::: danger
You will need to be careful when inserting or updating records in tables 
that are bound to Models. Schemas are not enforced when dealing with the 
DB Service directly.
:::

### Listing Records

You can get a list of all records in a table using the 
`async _all(tableName)` method. Be careful about doing this against large
tables.

```javascript
let allUsers = await DBSvc._all('user');
```

::: tip
More precise queries and pagination are covered in later sections of this
documentation.
:::

### Getting a Record by Id

Each Connection type has a way of working with IDs. Every object in a
table has an ID. You can look up a specific object based on ID using the 
`async _lookup(tableName, id)` method:

```javascript
let id = // some id
let specificUser = await DBSvc._lookup('user', id);
```

### Updating Records

You can update any records that match a certain query using the 
`async _update(tableName, query, update)` method:

```javascript
// make user100 an admin user and set emailVerified to true
await DBSvc._update('user', { username: 'user100' }, {
  emailVerified: true,
  isAdmin: true
});
```

### Creating a Record

You can create a record in a table using the `async _create(tableName, object)`
method. It will return the ID of the newly created object.

```javascript
let newUserId = await DBSvc._create('user', {
  username: 'user100',
  emailAddress: 'user100@example.com',
  isAdmin: true
});
```

### Deleting Records

You can delete any objects that match a query using the 
`async _delete(tableName, query)` method:

```javascript
// delete all non-admin users
let deletedCount = DBSvc._delete('user', { isAdmin: false });
```

## Database Logs

The Database Service creates logs using the Logger Service. All read-only
actions are logged at SILLY level, all write actions are logged at DEBUG 
level, and queries for single objects that return no results are logged at 
WARN level. The "source" for all such logs is "DB".