
# Validation

Carolina has a built-in way to validate user input or other objects, and it is 
related to the system for database models and schemas.

The Database system uses models and schema objects to represent database
entries, but schemas can be used independently of database models for the 
purposes of validation.

For more on schemas in the context of database models, see the docs on
[Schemas & Models](/db/models.md).

## Basic Validation

### Controller Method

You can use validation inside your controllers with the controllers 
`_validate` method.

Its usage looks like this:

```javascript
async handle(request, data={}) {
  
  let v = this._validate("MySchema", request.data, true);
}
```

The first argument is the name of a validation schema - an object type of the 
Validation Service. The second argument is the data to validate. The third 
argument is whether or not a `ValidationError` should be thrown if validation 
fails. If the third argument is omitted or set to false, an object describing
the validation failure will returned if validation fails. An object 
like `{ success: true }` will be returned in either case if validation 
passes.

### Writing Validation Schemas

Validation schemas are special objects managed by the Validation Service. 
The Service defines a few of its own schemas, including "LoginSchema" and 
"RegisterSchema", but will also look in installed plugins and in your 
projects `site/` directory under `validation/schemas/index.js`.

An example `site/validation/schemas/index.js` might look like this:

```javascript
/**
 * Export validation schemas here.
 */
exports = module.exports = {
  TestSchema: require('./test-schema')
};
```

The `test-schema.js` file should look like this:

```javascript
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class TestSchema extends BaseSchema {
  constructor() {
    
    // no auto date fields
    super(false);
    
    this.fields.name = { type: 'String', required: true };
  }
}

exports = module.exports = TestSchema;
```

The simple schema defined there declares that object *must* have the property 
`name`, which should match the String field type.

When validating, an object like `{ level: 10 }` would fail according to
this schema but `{ level: 10, name: "Some Name" }` would pass.

More details on the options available for schemas are further down in this page
as well as on the docs on
[Schemas & Models](/db/models.md).

Note that validation errors will only give 1 error message, although there 
may be more than one problem. The Validation Service immediately stops
checking after the first error.

In addition to applying field constraints, you can specify rules that apply 
to the entire object. Rules are checked after each field is individually
verified.

For example, the following rule asserts that a given object will provide 
`primaryPhone` and `secondaryPhone` and that they will not be the same:

```javascript
this.fields.primaryPhone = { type: 'String', required: true };
this.fields.secondaryPhone = { type: 'String', required: true };

this.rules.push({
  rule: 'Distinct',
  fields: ['primaryPhone', 'secondaryPhone']
});

```

## Displaying Validation Errors

You have a few options for showing validation failures to the client.

In many cases you should not tell the `_validate` method to throw an error,
and instead capture the response as a variable and use the `message` 
attribute.

```javascript
async handle(request, data={}) {
  let val = this._validate('SomeSchema', request.data, false);
  if (!val.success) {
    console.log(val.message); // The error message.
  }
}
```

If you are returning a response directly in case of a validation failure,
you are responsible for rendering the error message, perhaps by passing it
to a template.

If you are doing a redirect, you can flash the error to the session.

```javascript
async handle(request, data={}) {
  let val = this._validate('SomeSchema', request.data, false);
  if (!val.success) {
    let res = this.redirect("/original-form");
    res.flash(val.message, "Uh-oh!", "danger");
    return res;
  }
}
```

For more on flashing messages to the session, see the
[Session docs](/basics/session.md).

If you throw an error from the `_validate` method, the returned response with 
be a formatted Carolina error page or a JSON describing the errors. 
If `app.debug` in config is set to true, the response will contain many 
application details. Otherwise, they will be simple responses with minimal 
information. 

Most errors thrown and uncaught in the request cycle will return a 500 status 
code, but Validation errors will return a 400 status code instead.

## Useful Field Configuration

Schemas are better documented in the docs on
[Schemas & Models](/db/models.md), but here are some basics on the 
helpful properties of schema fields when it comes to validation.

**`min` and `max`**

Applies to numeric and date fields.

Also applies to string fields, but in a different way.

Forces the property to be greater than `min` if provided and/or less than 
`max` if provided.

```javascript
// date must be at or after December 21, 2012
this.fields.recentDate = { type: 'Date', min: "2012-12-21" };
// number must be an integer between 1 and 10 (inclusive)
this.fields.chosenNumber = { type: 'Integer', min: 1, max: 10 };
```

For strings, the property is enforced to be at least `min` characters in
length and at most `max` characters.

**`regex`**

Applies to "String" fields. Forces the property value to match a certain 
regular expression object.

**`requireTrue`**

Only applies to `BooleanField` ("Boolean").

Forces the property to both exist and be true.

```javascript
this.fields.acceptTermsAndConditions = { type: 'Boolean', requireTrue: true };
```

**`type`**

Many field types force the property to be of that type.

Examples include: "String", "Number", "Array", "Object", "Boolean"

## Schema Rules

Schemas can also include rules. Rules are objects, managed by the Validation
Service, that enforce certain things about an object, taking the entire object
into account.

```javascript
class CustomSchema extends BaseSchema {
  constructor() {
    super(false);

    this.fields.a = { type: 'String', required: true };
    this.fields.b = { type: 'String', required: true };
    
    this.rules = [
      { rule: 'DistinctRule', config: { fields: [ 'a', 'b' ] } }
    ];
  }
}
```

The added rule tells the Validation Service to enforce the values of properties
"a" and "b" are not the same as each other. 

Every Rule in `this.rules` must have a rule name (as `rule`) and a config object.
The contents of the latter depend on the specific rule. In the case of 
`DistictRule`, the `fields` property of the config object lists the fields
that must be distinct.

### Included Rules

Here is a list of included Rules:

**`DistinctRule`**

Enforces that certain fields have distinct values. The config object should
have a `fields` property which should be a list of fields that must be
distinct.

**`SamenessRule`**

Enforces that certain files have the same value. The config object should
have a `fields` property which should be a list of fields that must have
the same value.

### Custom Rules

You can make your own rules to then include in Schemas. You can generate
a new Rule class via the CLI:

```
node . generate rule ExampleRule
```

This would create the file
`site/validation/rules/example-rule.js`.

A rule has one critical method, `validate()`. It takes a config that
may provided details about the rule should be enforced as the first argument
and as the second argument it takes the object to be validated.
The method should return an object with a boolean `success` property,
specifying whether or not validation passes this rule. If `success` is 
`false`, a `message` property should also be included.

Example Rule (the sameness rule):

```javascript

const BaseRule = require('carolina/main/validation/rules/base-rule');

/**
 * Rule SamenessRule
 * Enforces that the given properties have the same value.
 */
class SamenessRule extends BaseRule {

  constructor() {
    super();
  }

  validate(config, obj) {

    // console.log("SamenessRule.validate");

    // set val to the first field's value
    let val = obj[config.fields[0]];

    for (let i = 1; i < config.fields.length; ++i) {
      // if a value is not the same, fail validation
      if (obj[config.fields[i]] != val) {
        return {
          success: false,
          message: `${config.fields[i]} does not have the same value as ${config.fields[0]}.`
        };
      }
    }

    return { success: true };
  }
}

exports = module.exports = SamenessRule;
```

If would be up to you to expose the class by name via
`site/validation/rules/index.js`:

```javascript
exports = module.exports = {
  SamenessRule: require('./sameness-rule')
};
```

`SamenessRule` is already included in the Carolina framework, but if you did
this same thing with `ExampleRule`, you would be able to reference
`ExampleRule` in Schemas. You should document what kind of object 
you expect for the `config` somewhere.
