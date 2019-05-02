
# Schemas and Fields

The DB Service looks for custom Model classes to be defined in 
`site/db/models/index.js`. The `User` model comes predefined there
(other Model classes that are included with the framework are defined
inside Carolina itself). A Model class consists of two parts: a Schema 
(which includes Fields) and the actual Model class which will be 
instantiated.

[[toc]]

## Generating Models

You can generate a new model class using the CLI: 

```
node . generate model MyCustomModel
```

This would create the file
`site/db/models/my-custom-model.js`.
Inside the file would be the definition of both a Schema and a Model, with an 
instance of the Schema attached to the Model class's prototype.

## Model Structure

An example Model might look something like this:

```javascript
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class MovieShowingSchema extends Schema {
  constructor() {
    
    super();
    
    this.table = 'moving_showing';
    
    this.fields.movieName = { type: 'String' };
    this.fields.theatreNumber = { type: 'Number', min: 1, max: 10 };
    this.fields.showTime = { type: 'Date' };
    this.fields.durationMinutes = { type: 'Number' };
    
    this.adminFields = ['movieName', 'showTime'];
  }
}

const schemaInstance = new MovieShowingSchema();

class MovieShowing extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

MovieShowing.prototype.schema = schemaInstance;

exports = module.exports = MovieShowing;
```

## Writing Schemas

In the example above, the instances of the MovieShowing class will have the 
properties `movieName`, `theatreNumber`, `showTime`, and `durationMinutes`
as specified in the schema. All of this is done by the BaseModel 
constructor. The Schema field definitions reference objects in the library of
Field classes managed by the DB Service.

### Table Name

The `table` property of the Schema is required. The value will be used by the
particular connection of the Database object to place objects in the correct 
collections.

::: danger
Once instances of a Model are in the database, you MUST NOT change the `table`
property.
:::

### Object IDs

As described in more detail below, a Schema is made up of certain fields 
defining what a Model class instance will have as properties. In addition to 
what is defined in the Schema, there will be an `_id` property, which is used 
by the underly database Connection (usually as a primary key).

```javascript
let User = DBSvc._modelClass('User');
let adminUser = await User.$get({ username: 'admin' });
console.log(adminUser._id); // => "12345"
```

The `_id` is always a String.

### Timestamp Fields

In addition to fields which you define, the super constructor for 
`BaseSchema` will set up the `fields` property with two Fields. 

::: danger IMPORTANT
Note that after the `super()` call in the Scheme constructor, you are 
attaching new properties to the `fields` object. Do not reset the `fields` 
object or you will get rid of default fields.
:::

The `BaseSchema` constructor has already created two `Date` fields, 
`createdAt` and `updatedAt`. The `createdAt` field will be assigned to every 
Model instance the first time it is created and the `updatedAt` field will 
be  updated every time an Model instance is saved.

Example:

```javascript
let User = DBSvc._modelClass('User');
let adminUser = await User.$get({ username: 'admin' });

let userCreated = adminUser.createdAt; // => moment object
let userUpdated = adminUser.updatedAt; // => moment object
```

## Schema Fields

Each particular attribute in a Schema, and therefore each object as a whole
belonging to a schema, has three forms:

* **Database Form**: The form that will be present in a database. Should be representable in a simple Javascript object.
* **Object Form**: The form that will be present as part of an instance of a Model class. Can be essentially anything.
* **JSON Form**: The form that will be present when an object is serialized to JSON for transit or other purposes. Also the form from which model instances will be constructed. Must be compatible with `JSON.stringify()`.

An example of these three forms in action is the "DateField". An attribute
belonging to a model instance that has the field type of "DateField" is 
represented as a [Moment.js](https://momentjs.com/) object in Object Form,
a plain Javascript Date in Database Form, and as a UTC string in JSON Form.

### Included Field Types

Every field is subclass of `BaseField`. The `BaseField` class is not available
via the DB Service and should never be used directly. However, several of 
the attributes you can use as part of schemas are defined in `BaseField`.

* `allowedValues`: An array that, when provided and not empty, means that the given value for the field must be one of these listed values.
* `bannedValues`: An array that, when provided and not empty, means that the given value for the field must **not** be one of the listed values. The `allowedValues` attribute supercedes `bannedValues`.
* `defaultValue`: When provided, the given value will be used when creating objects of the schema when a value has not been supplied.
* `description`: A human-friendly description of the field. This is used in the admin panel and other places.
* `min`: For numeric fields (including dates), this enforces the value of a schema attribute must be greater than or equal to the given minimum. For string fields, this enforces that the value must be at least a certain number of characters in length.
* `max`: For numeric fields (including dates), this enforces the value of a schema attribute must be less than or equal to the given maximum. For string fields, this enforces that the value must be at most a certain number of characters in length.
* `name`: **String**. The user-friendly name of the field.
* `required`: When true, the value of schema attribute must exist and not be null. 
* `verbose`: A human-friendly version of the field name. This is used in the admin panel and other places.

For fields such as `defaultValue`, `min`, and `max`, the JSON Form of the 
value should be used. So `min` and `max` dates should be provided as 
Strings such as "20180805T232700".

#### `Array`

The `Array` field class is defined in 
`carolina/main/db/fields/array-field.js`.

An array field represents an array (or list) attribute. It retains the same 
form in Database Form, Object Form, and JSON Form.

Example (in a Schema):

```javascript
this.fields.groupNames = { type: "Array", defaultValue: ["visitors"] };
```

**Attributes**

The Array Field can be configured with all the basic attributes of
`BaseField`. The attributes `min` and `max`, if provided, enforce that the 
array will have at least `min` items and at most `max` items.

#### `Boolean`

The `Boolean` field class is defined in
`carolina/main/db/fields/boolean-field.js`.

A `Boolean` field must be either `true` for `false` (or null, if allowed).

Example (in a Schema):

```javascript
this.fields.acceptTermsAndConditions = { type: "Boolean", requireTrue: true };
```

**Attributes**

The Boolean Field can be configured with all the basic attributes of
`BaseField` (although `min` and `max` should not be used) and the following
additional attributes.

* `requireTrue`: Enforces that the attribute exists and is true.

#### `Date`

The `Date` field class is defined in
`carolina/main/db/fields/date-field.js`.

A `Date` field, in JSON form, must be a string that can be constructed into 
a [Moment.js](https://momentjs.com/) object.

In Object Form, a `Date` attribute will be a Moment.js object.

In Database Form, a `Date` attribute will either be a String or Javascript 
Date.

Example (in a Schema):

```javascript
this.fields.birthday = { type: "Date", max: moment().subtract(18, 'years').format() };
```

**Attributes**

The `Date` Field can be configured with all the basic attributes of
`BaseField`.

The `min` attribute enforces that the date must be cannot be before the 
date specified and the `max` attribute enforces that the date cannot be after
the date specified.

The `Date` field also has the following
additional attributes.

* `updateOnSave`: Specifies that the attribute will be updated with the current datetime during the `preSave` event.
* `useCurrentTimeAsDefault`: Specifies that the current time should be used as a default value.

#### `Email`

The `Email` Field class is defined in
`carolina/main/db/fields/email-field.js`.
It is a subclass of the `String` Field.

The `Email` Field is just a `String` Field with a regex property enforcing
that values are legitimate e-mail addresses. The following fields are
equivalent:

```javascript
this.fields.email1 = { type: 'String', regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i };
this.fields.email2 = { type: 'Email' };
```

**Attributes**

The `Email` Field can be configured with all the same
attributes as the `String`
field, except for `regex`, which will be overwritten with the 
e-mail regex shown above.

#### `Integer`

The `Integer` field class is defined in
`carolina/main/db/fields/integer-field.js`.
It is a subclass of the `Number` field.

An `Integer` field must be a whole number, although numbers like "35.0" will
be accepted and coerced into an integer.

Example (in a Schema):

```javascript
this.fields.age = { type: "Integer", min: 16, max: 969 };
```

**Attributes**

The `Integer` Field can be configured with all the basic attributes of
`BaseField`.

#### `IPv4`

The `IPv4` Field class is defined in
`carolina/main/db/fields/ip-v4-field.js`.
It is a subclass of the `String` Field.

The `IPv4` Field is just a `String` Field with a regex property enforcing
that values are legitimate IPv4 addresses. The following fields are
equivalent:

```javascript
this.fields.ip1 = { type: 'String', regex: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i };
this.fields.ip2 = { type: 'IPv4' };
```

**Attributes**

The `IPv4` Field can be configured with all the same
attributes as the `String`
field, except for `regex`, which will be overwritten with the 
IP regex shown above.

#### `Json`

The `Json` field class is defined in
`carolina/main/db/fields/json-field.js`.

A `Json` field can be a Javascript object or array.

In Object Form and Database Form it is an actual array or object.
In JSON Form it is serialized an actual **string** (although for 
post requests an object construction it *may* be an array or object).

Example (in a Schema):

```javascript
this.fields.location = { type: "Json", defaultValue: { x: 0, y: 0 }, format: false };
```

**Attributes**

The `Json` Field can be configured with all the basic attributes of
`BaseField` and the following
additional attributes.

* `format`: Whether or not the JSON serialized version should be formatted with spaces and indentation or not. Defaults to true.

#### `Number`

The `Number` field class is defined in
`carolina/main/db/fields/number-field.js`.

The `Number` field can be any number and is the same in Database, Object,
and JSON forms.

Example (in a Schema):

```javascript
this.fields.locationX = { type: "Number", defaultValue: 96.5 };
```

#### `Ref`

The `Ref` field points to an instance of another Model.
For more information on references, see the section on
[Reference Fields](./relations.md).

#### `String`

The `String` field class is defined in
`carolina/main/db/fields/string-field.js`.

The `String` value represents a simple string.

Example (in a Schema):

```javascript
this.fields.terrain = { type: "String", defaultValue: "plains" };
```

**Attributes**

The `String` Field can be configured with all the basic attributes of
`BaseField`. The attributes `min` and `max`, if provided, enforce that the 
string will have at least `min` characters and at most `max` characters.
The `String` field can also be configured with the following additional 
attributes:

* `regex`: A pattern that, if provided, enforces that the string must match it.
  It can be either a string or a `RegExp`.

#### `Text`

The `Text` Field class is defined in
`carolina/main/db/fields/text-field.js`.

It extends `String` Field and has all its attributes. It is designed to 
be used for longer blocks of text.