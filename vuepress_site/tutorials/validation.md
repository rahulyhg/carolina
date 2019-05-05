
# Validating Input

The Validation Service is one of the included Carolina Services, and it handles 
validating that given objects comply with specific schemas. Before working 
with the Validation Service in the Controller class, let's create a schema 
representing the data we expect from user input.

You can create a new Validation Schema class using the CLI:

```
node . generate validation-schema NewItemSchema
```

The above command will create the file
`site/validation/schemas/new-item-schema.js`. Validation Schemas are just like 
Schema classes for Database models, except that they are not attached to any
Models. Make the new Schema look like this:

```javascript
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class NewItemSchema extends BaseSchema {
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.item = { type: 'String', required: true };
    this.fields.description = { type: 'String' };
  }
}

exports = module.exports = NewItemSchema;
```

Notice that `false` is passed to the super constructor. This tells the 
super constructor that this Schema is designed for use with a Database 
Model class and should not have the auto date fields assigned. Note that 
the `item` field is also marked as required. The fields of the Schema match
the fields in the HTML form that was created in the last section. 

Ensure that this Schema is exported by the file 
`site/validation/schemas/index.js` like this:

```javascript
exports = module.exports = {
  NewItemSchema: require('./new-item-schema')
};
```

This registers the Schema class with the Validation Service.
In any part of the application, you can access the Validation Service from
the global Carolina object:

```javascript
let ValidationSvc = Carolina.$('Validation');
```

The Validation Service allows you to compare certain objects to defined Schema 
classes, which we will do shortly. For more information about the Validation
Service, see the documentation on [validation](../docs/basics/validation.md).

The Base Controller class defines a `_validate()` method which provides 
a shortcut to the Validation Service. Let's use that in the Controller method
that handles POST requests for the "New Item" form:

```javascript
async createItem(request, data={}) {
  const val = this._validate('NewItemSchema', request.data, false);
  if (val.success) {
    return this.sendText("Validation success.");
  }
  else {
    let res = this.redirect("/items");
    res.flash(val.message, `Error in ${val.field}:`, 'danger');
    return res;
  }
}
```

The `_validate` method takes 3 arguments: the name of a Schema registered with 
the Validation Service, an object to validate, and a boolean value specifying
whether or not a "ValidationError" should be thrown on validation failure.

This method now tries to validate the incoming data from the New Item Form.
If validation succeeds, a success message is sent. Otherwise, an error 
is "flashed" to the session. This "flashing" was the purpose of including 
the `flashMessages` mixin in the pug template. 

Run the server again and visit `http://localhost:8080/items` and try to 
submit the form without putting anything in the "Item Name" input. You 
will see the flash message after being redirected back. Input an item name 
and submit again and you should see the text "Validation success".

The behavior upon validation failure is exactly what is needed, but 
when validation succeeds, we want to actually create the new item.