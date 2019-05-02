
# Carolina Admin

The Carolina Admin plugin, known as `carolina/plugins/admin`, is a plugin 
which provides an Admin panel for managing objects in the database and 
performing other administrative tasks.

[[toc]]

## Installation

The Carolina Admin plugin is installed in the starter project by default.
If you need to install it again, take the following steps:

1. List "carolina/plugins/admin" in the `plugins` property of `config/app.js`.
2. Run the command `node . import-plugin-resources carolina/plugins/admin -csrtf`.
3. Ensure the file `config/carolina_admin.js` is exposed by `config/index.js` as "carolina_admin".
4. Add the key "Carolina/Admin" to the `services` property of `config/app.js` with the value "carolina/plugins/admin/service".
5. Provide a route mapping, for example in `site/http/routes/browser.js` (example below).
6. Rebuild the frontend code, if necessary: `webpack --config src/carolina/admin/webpack.config.js`.

The route mapping should look like this:

```javascript
// site/http/routes/browser.js

exports = module.exports = [
  { route: "/admin", subs: require('carolina/plugins/admin/router') },
  // more routes
];
```

The command in step 6 is executed by `npm run webpack:admin` by default in 
the starter project.

## Configuration

The Admin plugin is configured by the file `config/carolina_admin.js`. It is 
included in the starter project by default, and otherwise can be copied 
from the plugin code when you run the `import-plugin-resources` command with 
the `-c` flag. 

The `sections` property is a list of sections that should be available in the 
admin panel. Each section should have a `name`, a font-awesome `icon`,
a list of `models` that should be managed in that section, and an optional 
`description`.

The `modelActions` property is an object mapping the names of Model classes 
to the collection Actions and model Actions that should be associated with the 
Model in the admin panel. See below (in the Details section)
for more details on Action classes.

## Usage

It is recommended that you route your admin panel to `/admin/` as shown above.

::: tip IMPORTANT
It is important that you visit your admin panel and link to it as 
"http://yoursite/admin/" (including the ***trailing slash***).
:::

When you visit the admin panel (which requires you to log in or be logged in as
an admin user), you will be presented with a panel with various section 
listed on the sidebar. In each section, you will see Model classes that you can
manage.

If you click on a Model class, you will see a paginated view of all 
objects of that model in the database. At the bottom of this view, you will 
also see forms for any *collection-level* Actions assigned to that Model class.
These actions may be things such as dropping the table, or creating several
new instances. If you click on a specific Model instance you will see the 
instance view - which will also allow you to edit or delete a specific instance.
At the bottom of the instance view, you will see any *instance-level* Actions 
assigned to that Model class.

## Details

### Admin Service

The Admin Service is available as "Carolina/Admin":

```javascript
let CarolinaAdminSvc = Carolina.$('Carolina/Admin');
```

You should not need to use this service directly, but it manages a library 
of singleton objects called "Actions".

#### Actions

Actions represent command that take input from forms provided to admin users 
in the Admin panel and then execute against a specific Model instance or 
the entire collection of a Model. They then return a response.

If you want to write and use your own actions, create the file 
`site/carolina_admin/actions/index.js` and expose Action classes that your 
write.

Here is an annonated example of an Action class included with the plugin, 
a *collection-level* Action which deletes all instances in a collection:

```javascript
const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

// must extend BaseAction
class DropTableAction extends BaseAction {
  
  constructor() {
    
    super();
    
    // reference a Schema by name, which describes the user input form
    this.schemaName = 'Carolina/Admin/AreYouSureSchema';
    // user friendly name
    this.name = "Drop Table";
    // user friendly description
    this.description = "Deletes ALL items in this model.";
  }
  
  // handle method takes the user-provided arguments and the given model class
  async handle(args, Model) {
    
    let allInstances = await Model.$all();
    for (let i = 0; i < allInstances.length; ++i) {
      await allInstances[i]._delete();
    }
    
    // return value must have success and message
    return {
      success: true,
      message: "Instances deleted."
    };
  }
}

exports = module.exports = DropTableAction;
```

In an Action class, you provide a schemaName which must reference a Schema.
The Schema will be used to build the form in the admin panel and validate 
its user input. When a user submits a form for a *collection-level* Action,
the `handle` method will be called with the user provided input and the 
Model class. When a user submits a form for an *instance-level* Action,
the `handle` method will be called with the user provided input, the Model
class, and the specific
Model instance.

Here is an example of an *instance-level* Acton, which is included in the 
Carolina Admin plugin, which sets a User's password to a given value:

```javascript
const BaseAction = require('carolina/plugins/admin/plugin/carolina_admin/base-action');

// extend BaseAction
class SetPasswordAction extends BaseAction {
  
  constructor() {
    
    super();
    
    this.schemaName = 'Carolina/Admin/PasswordSchema';
    this.name = "Set User password.";
    this.description = "Sets the user's password to the given value.";
  }
  
  async handle(args, User, user) {
    
    // operate on specific instance
    user.setPassword(args.password);
    await user._save();
    
    // return object with success and message
    return {
      success: true,
      message: "Password reset."
    };
  }
}

exports = module.exports = SetPasswordAction;
```

There is nothing in the Action class specifying that it is a collection-level 
or instance-level Action, nor what Models it should be used against.

Your Action classes should be exposed by name in 
`site/carolina_admin/actions/index.js`. Your Actions will be collected and
managed by the Carolina/Admin Service.

In the `config/carolina_admin.js`, there is an object mapping Model names to 
names for Actions that should be associated with it (both at the instance 
and collection levels). You can simply add the name of your new Action 
to a Model class under either level and it will be available in the 
admin panel.

Action classes that are included with the plugin are listed and described 
further below.

### Routes

All routes are taken together and exposed by 
`carolina/plugins/admin/router.js`. You should map to it like so in 
`site/http/routes/browser.js`:

```javascript

module.exports = [

  { route: '/admin/', subs: require('carolina/plugins/admin/router') }, 

  // more routes
  
];
```

This makes your entire admin panel available at `http://yoursite/admin/`.

### Exported Objects

#### Admin Actions

The Carolina Admin Service manages Action classes, and provides the following 
ones by default:

**`Carolina/Admin/CreateTestUsersActions`**

This is designed for use only as a *collection-level* Action for the User 
Model. It presents a form asking for a Username Prefix, a starting Password,
and Count. When executed,
it will create a given numbers of user accounts, with the 
given password.

For example, if the username prefix is "testuser" and the count is 10, 
it will create user accounts from "testuser0" to "testuser9".

**`Carolina/Admin/DeleteNonAdminAction`**

This is designed for use only as a *collection-level* Action for the User 
Model. It presents a form asking that you are sure you want to do this. 
It will delete all Users that have their `isAdmin` property set to `false`.

**`Carolina/Admin/DropTableAction`**

This is designed for use as a *collection-level* Action against *any* Model 
class. It will delete all items in the collection.

**`Carolina/Admin/EmailUserAction`**

This is designed for use only as an *instance-level* Action for the User Model.
It allows you to construct a quick e-mail that will be sent using the 
default Mailer to the e-mail address on file for that specific user.

**`Carolina/Admin/SetPasswordAction`**

This is designed for use only as an *instance-level* Action for the User Model.
It allows you to reset a user's password to a specific value.

#### Http Controllers

The Carolina Admin plugin exposes some Controller classes for use by the 
Http Service. Their names all begin with "Carolina/Admin/" but they are not 
designed for re-use.

#### Terminal Commands

**`Carolina/Admin/CreateAdminUserCommand`**

This Command allows you to use the CLI to create a new User account with 
admin powers.

Usage:

```
node . create-admin-user -u USERNAME -p PASSWORD -e EMAIL_ADDRESS
```

All the args are optional: the default username is "admin", the default 
password is "password123", and the default e-mail address is 
"admin@example.com".

#### Validation

The Carolina Admin plugin exposes some Schemas for use by the Validation 
Service, and they are used by Actions to validate user input and present 
forms in the admin panel.

Their names all begin with "Carolina/Admin/". The ones designed for re-use are
listed here.

**`Carolina/Admin/AreYouSureSchema`**

This schema is made up of a single property: `sure`. It is a Boolean property
that is required to be set to `true` for an object to pass validation. 
Free free to use it as the schema for an Action class if all you need from the 
user is positive confirmation that they want the Action to occur.