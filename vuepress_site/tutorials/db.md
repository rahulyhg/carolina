
# Database & Models

The Carolina framework provides a global object called `Carolina` that maintains
a library of Services which perform various functions.
It is recommended that you consult the documentation on the
[Carolina Global Object](../docs/overview/service-library.md).

## Database Configuration

Database access is controlled by the Carolina Service called "DB". Before 
using it, let's take a look at the configuration for the service, found in 
the file `config/db.js`.

Starting out, it should look something like this:

```javascript
exports = module.exports = {
  
  connections: {
    'default': {
      driver: 'JsonConnection',
      path: "./data/main/"
    }
  },
  
  connectionMap: {}
};
```

This is not at all a good configuration for a real application, but it will
work for testing out very simple applications. What this configuration is doing
is saying that the default (and only) database connection involves just a bunch
of JSON files stored in `data/main/`. We can leave it alone for now, but the 
Carolina framework includes an alternate connection driver called
"MongoDbConnection" that can use to connect to a MongoDB instance.

For more information on configuring database connections, see the first section
of the documentation on the [DB Service](../docs/db/db-service.md).

## Models

The DB Service maintains a library of model classes, which are
class-based representations of data in the database. There are some defined
as a part of the framework, and some defined by you. You can create 
your own models in the directory `site/db/models/` and ensure that they 
are exported by the file `site/db/models/index.js`.

### The User Model

If you look, you will see the the "User" model is already defined in 
`site/db/models/user.js`. Models are broken into two parts, a Schema which 
defines its various fields, and a Model class which is instantiated from 
the database information and can contain instance methods. Generally, you 
should leave the existing parts of the two classes alone, but you can 
add more fields to the Schema and more methods to the Model class if 
desired.

The User Schema and Model class will work as-is for this tutorial application.

### The Item Model

We need to create another Model for our application, the "Item" model. This will 
represent specific items in a user's inventory.

You can generate a new Model file by running the following command:

```
node . generate model Item
```

This will create the file `site/db/models/item.js`. Take a look at it.

By default, its Schema contains a "name" field. Sometimes you may want to 
remove this when creating a new Model, but in this case we will have 
a name field. Let's define some more fields. Make the Schema class look 
like this:

```javascript
class ItemSchema extends BaseSchema {
  
  constructor() {
    
    super();
    
    this.table = "item";
    this.fields.name = { type: "String", name: "Name", required: true };
    this.fields.user = { type: "Ref", model: "User" };
    this.fields.description = { type: "Text" };
    
    // list fields to be shown in admin panel here
    this.adminFields = ["name"];
  }
}
```

Note that we added the "name" property to the `name` field, and that we also
added the `name` field to `adminFields`. The purpose of these two changes 
is specifically for the default admin panel, which will be covered later.

Additionally, note that the fields `_id`, `createdAt`, and `updatedAt`, will 
be automatically added to the schema fields by the super constructor.

This is all we need to do for the Item Schema, and we can leave the Item 
Model Class alone for now.

The next thing we need to do is export the Item Model from 
`site/db/models/index.js`. Make it look like this:

```javascript
exports = module.exports = {
  Item: require('./item'),
  User: require('./user')
};
```

This tells the DB Service to notice and register our new Model.

For more information on defining Schemas and Model classes, consule the 
documentation on [Schemas and Fields](../docs/db/schemas.md).