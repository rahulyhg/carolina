
# Application Structure

The basic application structure is laid out in the 
[Carolina Starter Repository](https://github.com/jfmario/carolina-starter).

It is best to start with that.

## Project Folder #

### `config/`

This directory includes configuration files. In order to be accessible
via the Carolina global object, the configuration file should export an 
object literal and should be exported in the object exported 
by `config/index.js`. 

### `data/`

This directory includes database-related files in certain cases.

### `initialize/`

This folder is for initialization stuff. The file `initialize/app.js`
is responsible for reading in `.env` and establishing the global 
Carolina object.. It is called by `index.js`
and is run before anything else happens.

### `node_modules/`

Directory created by NPM for dependencies. Don't mess with it.

### `public/`

Public static assets go here (favicons, css, front-end javascript, images, 
fonts, icons, downloadable files, etc...). Included here is the 
`public/static/carolina/` directory which is relied on by several parts of
the framework and should be left alone.

### `site/`

This directory is where most of your application logic should go. 
See below for more details.

### `src/` 

This directory is for uncompiled frontend assets (LESS or SASS stylesheets,
Vue components, etc). It is recommended that you do not alter the 
`src/carolina/` directory.

### `storage/`

Put files here.
`storage/files/` will be used sometimes for storing application uploaded files,
`storage/logs/` is sometimes used for log files, and `storage/session/` is 
sometimes used for storing session information. All of these subdirectories
are .git-ignored.

### `tests/`

To be implemented.

### `.env`

Your private environment variables are defined in this file.

### `example.env`

An example for writing your own `.env` file.

### `index.js`

The CLI entry point to the application, accessible by `node index` or 
`node .`.

### `package.json`

The NPM thing.

### `webpack.config.js`

Your webpack file for building frontend files.

## Details on the `site/` Directory

The services of the Carolina framework look in the `site/` directory for 
various object definitions such as 
[Controllers](/docs/basics/controllers.md) and
[Database Models](/docs/models/getting-started.md).

### `site/db/`

This directory contains Models exported by
in `site/db/models/index.js`, including a starter User Model. Models are 
class representations of database data.
It can also contain definitions for custom Fields in 
`site/db/fields/index.js`. Fields are representations of possible fields
of objects stored in the database.

A new custom Model class can be created by running the following command:

```
node . generate model CustomModel
```

A new custom Field class can be created by running the following command:

```
node . generate field CustomField
```

### `site/email/`

This directory can contain definitions for custom Mailers in
`site/email/mailers/index.js`. Mailer classes are objects that handle the 
sending of e-mails.

A new custom Mailer class can be created by running the following command:

```
node . generate mailer CustomMailer
```

### `site/events/`

This directory can contain definitions for custom Event classes
in `site/events/events/index.js` and 
custom Listener singletons in `site/events/listeners/index.js`. Event classes
define events that can be thrown by your applications and Listeners are 
singletons that respond to certain thrown events.

A new custom Event class can be created by running the following command:

```
node . generate event CustomEvent
```

A new custom Listener singleton
class can be created by running the following command:

```
node . generate listener CustomListener
```

### `site/errors/`

This directory can contain defintions for custom Error classes in 
`site/errors/errors/index.js`. Errors are throwable classes that can 
be rendered to templates or to JSON (with more or less detail, depending
on configuration).

A new custom Error class can be created by running the following command:

```
node . generate error CustomError
```

### `site/files/`

This directory can contain definitions for custom FileDriver classes 
in `site/files/file-drivers/index.js`. FileDrivers are classes than manage
access to files.

A new custom FileDriver
class can be created by running the following command:

```
node . generate file-driver CustomFileDriver
```

### `site/http/`

This directory is one the main directories you will work on to start with.
It contains definitions for custom Controller singletons in 
`site/http/controllers/index.js`, definitions for custom Middleware singletons
in `site/http/middleware/index.js`, and the route configuration in 
`site/http/routes/index.js`. Controllers define methods for taking HTTP 
requests and generating responses, and Middleware classes operate on incoming
requests and outgoing responses.

A new custom Controller singleton
class can be created by running the following command:

```
node . generate controller CustomController
```

A new custom Middleware singleton
class can be created by running the following command:

```
node . generate middleware CustomMiddleware
```

### `site/logger/`

This directory can contain definitions for custom Loggers in
`site/logger/loggers/index.js`. Loggers are classes that handle listening for 
and logging certain log events.

A new custom Logger class can be created by running the following command:

```
node . generate logger CustomLogger
```

### `site/terminal/`

This directory can contain definitions for custom Command classes in 
`site/terminal/command/index.js`. Commands are classes that act when called 
using the CLI.

A new custom Command can be created by running the following command
(which, in fact, calls an included Command object):

```
node . generate command CustomCommand
```

### `site/validation/`

This directory can contain definitions for custom Schemas in 
`site/validation/schemas/index.js` and definitions for custom 
Rules in `site/validations/rules/index.js`. Schemas define the structure 
of certain objects that can be validated, and they sometimes
reference configurable Rules.

A new custom Schema class can be created by running the following command:

```
node . generate schema CustomSchema
```

A new custom Rule class can be created by running the following command:

```
node . generate rule CustomRule
```