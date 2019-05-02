
# Configuration

The configuration values for the Carolina framework and its plugins are all
found in the `config/` directory, in files exposed by `config/index.js`.

Each config
file that comes with the starter project should have all of its values
documented by comments. It is worth looking through them to see what options
are available to you.

## The `.env` File

Many configuration values might need to change depending on where the
application is running. These should be stored in the file `.env`. 
An example `example.env` is included with the starter project, and it contains
the values that are already read from `.env` by the starter project config
files. The `.env` file is read into the environment using the 
NPM [dotenv](https://www.npmjs.com/package/dotenv) package in the initial
startup file.

If you ran `node . generate-key` after getting the starter project, `.env`
has already been created.

### Example `.env`

The `example.env` file can be used to place example values that should be 
present in `.env`.


An example `.env` file might look like this:

```
APP_NAME="My Carolina Site"
APP_URL="http://localhost:8080"

PROTOCOL=http
HOST="127.0.0.1"
PORT=8080

CAROLINA_SECRET=abc123
```

### Reading Environment Variables

Many options in the `config/` directory already check for environment variables,
and you could configure others to do the same.

Environment variables are accessible as `process.env`. When accessing an 
environment variable, you should always provide a default value in case the 
variable is not provided.

Here is an example, from `config/app.js`:

```javascript
  name: process.env.APP_NAME || "Carolina",
```


::: tip INFO
You should note that the environment variables are *always* processed
as strings.
:::

## Accessing Config Values

From anywhere in your application, configuration values can be accessed
using the global Carolina object.

If you notice the file `config/index.js`, you will see that it exposes an
object mapping strings to objects which defined in other files. This means that
the structure of the configuration, once loaded, is something like this:

```javascript
let conf = {
  app: {
    name: "Carolina App",
    // more
  },
  db: { ... },
  // more
};
```

You can use the Carolina global object's `config` method to get config values 
from specific sections:

```javascript
let appName = Carolina.config('app.name', "Default Name");
```

The second argument provides a default if the requested value cannot be 
found. The default default is `null`.

Note that the "." here will be parsed to be asking for 
`configuration.app.name`, but it can only go one level deep. For nested values,
you will have to just grap the first level and get the object:

```javascript
let mailers = Carolina.config('email.mailers');
let defaultMailer = mailers.default;
```

You do not have to use the dot notation. You can grap the entire "app" config
like this:

```javascript
let appConfig = Carolina.config('app');
let appName = appConfig.name;
```