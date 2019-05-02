
# CLI

The file `index.js` in the starter project acts as a command line interface
for your application. Commands for it are managed by the Terminal Service.

You can access the CLI from the root directory of the starter project by
running `node . <command>`. For example, to see a list of available commands
along with their descriptions:

```
node . help
```

[[toc]]

**Aside: Interaction**

::: tip
You can interact with an instance of the application as well. If you run
`node` from the root directory of the starter project, you can 
`require('./initialize/app')` to register the global Carolina object and 
access Services as needed.
:::


## Writing Terminal Commands

The Terminal Service looks for Commands to be exported by the file 
`site/terminal/commands/index.js`.

### Generating Commands

You can scaffold a new Command by running:

```
node . generate command MyNewCommand
```

This would create the file
`site/temrinal/commands/my-new-command.js`. You would still need to alter
`site/terminal/commands/index.js` to export it by name:

```javascript
// custom commands
exports = module.exports = {
  MyNewCommand: require('./my-new-command')
};
```

### Command Logic

Here is a basic example of a Command (with some comments).
This one simply takes a username and
sends a friendly e-mail to the corresponding user.

```javascript
class FriendlyEmailCommand extends BaseCommand {

  constructor() {

    super();

    // how it will be invoked from the CLI
    this.commandName = 'friendly-email';
    // help message
    this.description = "Sends a friendly e-mail to a user.";

    // the argparse arguments
    this.args = [
      {
        args: 'username',
        options: {
          help: "The username of the user to e-mail."
        }
      }
    ];
  }

  // actual execution of command
  async handle(args) {

    // user services / other code to do most of the work
    let DBSvc = Carolina.$('DB');
    let EmailSvc = Carolina.$('Email');

    let User = DBSvc._modelClass('User');

    // args.username available from user input
    let user = await User.$get({ username: args.username });

    // IRL maybe check if user exists and
    // throw error here and/or return 1 if user is null

    // prepare and send e-mail
    let from = 'webmaster@example.com';
    let to = [user.emailAddress];
    let subject = 'HELLO!';
    let message = `Hello, ${user.username}!`;

    EmailSvc.sendEmail({
      from: from,
      to: to,
      subject: subject,
      message: message
    });

    // return 0 if everything went well
    return 0;
  }
}
```

The `handle` method will receive the arguments passed at the command line
(more on this below). It will be awaited by the Terminal Service. Once the 
Command is complete, the Terminal Service will exit the node process using
the return value as the status code (non-zero status codes are considered
to represent some kind of error).

### Defining Arguments

The arguments that the Command will take at the command line are managed
by the NPM [argparse](https://www.npmjs.com/package/argparse) module.

The short version is that the `args` property of the Command object should
be a list of objects, each containing the properties `arg` and `options`.
Those two values are placed as the first and second arguments
to `subparser.addArgument(arg, options)` in the `argparse` library.
The values in the `args` property of the Command define the type of object
that will be received by the `handle` method.

#### Positional Arguments

Positional arugments look just like the `username` argument in the example
Command above:

```javascript
this.args = [
  {
    arg: 'username',
    options: {
      help: "The username."
    }
  }
];
```

If this were the only arg, the command invocation might look like this:

```
node . command-name admin
```

This would result in the following object being passed to the Command's 
`handle` method:

```javascript
{
  subcommand: 'command-name',
  username: 'admin'
}
```

::: warning
Note the `subcommand`. It is always there, and will be the command line
name of the 
Command. Do not name one of your custom arguments "subcommand".
:::

#### Flags and Optional Arguments

Flags are arguments that are invoked like `-f` or `--flag`
(or possibly `-f value` or `--flag value`). They come in
two forms: boolean switches and optional arguments.

Boolean switch arguments are interpreted as true if the flag (like `-f`)
is present and false otherwise. If you want to make an argument a boolean
switch, set the `action` property of the options object to `storeTrue`.

```javascript
this.args = [
  {
    arg: 'username',
    options: {
      help: "The username."
    }
  },
  {
    arg: ['-f', '--flag'],
    options: {
      action: 'storeTrue',
      help: "Whether or not flag is true or false."
    }
  }
];
```

If such a command were invoked like as `node . command-name admin`, then the
resulting object passed to `handle` would be:

```javascript
{
  subcommand: 'command-name',
  username: 'admin',
  flag: false
}
```

If the command were `node . command-name -f` or `node . command-name --flag`, then
the object would be:

```javascript
{
  subcommand: 'command-name',
  username: 'admin',
  flag: true
}
```

**Optional Arguments**

You can have optional arguments of the form `-c CC / --cc CC` by omitting
the `action` property of the `options` object:

```javascript
this.args = [
  {
    arg: 'username',
    options: {
      help: "The username."
    }
  },
  {
    arg: ['-c', '--cc'],
    options: {
      help: "Optional other user to courtesy-copy."
    }
  }
];
```

In this case, the command `node . command-name admin` would result in the 
object:

```javascript
{
  subcommand: 'command-name',
  username: 'admin',
  cc: null
}
```

The command `node . command-name admin -cc otheruser` would result in the
object:

```javascript
{
  subcommand: 'command-name',
  username: 'admin',
  cc: 'otheruser'
}
```

::: tip
If `null` is not what you want if an optional argument is omitted, you can
provide a `defaultValue` in the `options` object.
:::

#### Varargs

Arguments that do not use syntax like `-f/--flag` are considered positional
arguments. The last or only positional argument can have a `nargs` property
on the `options` object. One use case for this is to take an array of values.

Here is an example:

```javascript
this.args = [
  {
    arg: 'usernames',
    options: {
      nargs: '+'
    }
  }
];
```

Using this, the command `node . command-name admin` would result in the object:

```javascript
{
  subcommand: 'command-name',
  usernames: ['admin']
}
```

The command `node . command-name admin otheruser yetanotheruser` would result
in the object:

```javascript
{
  subcommand: 'command-name',
  usernames: ['admin', 'otheruser', 'yetanotheruser']
}
```

Using the "+" means that at least one must be present, so `node . command-name`
would fail. If you replace the "+" with "*", then `node . command-name` would
result in the object:

```javascript
{
  subcommand: 'command-name',
  usernames: []
}
```

### Defining Command Logic

You define the logic of the command in the `handle` method. You should
return an integer, preferably 0 if everything goes well and a positive 
integer otherwise.

#### The `args` Object

The object passed into the `handle` method will be argparsed from whatever
is made at the command line. See the above section for more details on how
to configure this.

#### Prompting

The `BaseCommand` class does not have any special methods for getting user 
input interactively, but I recommend the NPM
[enquirer](https://www.npmjs.com/package/enquirer) module for this purpose.

#### Output

The `BaseCommand` class has some methods you can use in your subclass Command
to write input to the console in different colors:

```javascript
async handle(args) {
  this.dim("message"); // writes in gray
  this.success("message"); // writes in green
  this.blue("message"); // writes in blue
  this.info("message"); // writes in magenta
  this.warn("message"); // writes in yellow
  this.err("message"); // writes in red
  this.println("message"); // boring, equates to console.log
}
```

**Tables**

The `BaseCommand` class has a method that uses the NPM
[table-layout](https://www.npmjs.com/package/table-layout) module for
displaying tabular data. When you this, the first row the table should be
headers:

```javascript
async handle(args) {
  let data = [
    { item: "ITEM", cost: "COST", desc: "DESC" },
    { item: "Sword", cost: 150, desc: "Does damage." },
    { item: "Shield", cost: 130, desc: "Blocks some damage." },
    { item: "Potion", cost: 60, desc: "Restores HP." }
  ];
  this.table(data);
}
```

The output of the above command would be:

```
 ITEM    COST  DESC
 Sword   150   Does damage.
 Shield  130   Blocks some damage.
 Potion  60    Restores HP.
```

**Progress Bar**

The `BaseCommand` class has a method that uses the NPM
[cli-progress](https://www.npmjs.com/package/cli-progress) module for 
showing and updating progress bars:

```javascript
async handle(args) {
  
  // set bar value at 0 with a max of 100
  let bar = this.getProgressBar(100, 0);

  for (let i = 1; i <= 100; i++) {

    // do something that takes 1% of the work

    bar.update(i);
  }

  bar.stop();

  this.success("DONE!");

  return 0;
}
```

## Command Registration

To ensure that your command is available to the Terminal Service, ensure
that the class is exported by some name in `site/terminal/commands/index.js`.

Example:

```javascript
// site/terminal/commands/index.js
exports = module.exports = {
  MyCommand: require('./my-command')
};
```

## Calling Commands

You can call other commands by getting them by name from the Terminal Service
and passing appropriate arguments to the `handle` method.

Here is an example of a command that mimics evoking 
`node . create-admin-user -u admin -e admin@example.com`,
which is a command from the 'carolina/plugins/admin' plugin:

```javascript
async handle(args) {
    
  let TerminalSvc = Carolina.$('Terminal');
  let createAdminUserCommand = TerminalSvc._command(
    'Carolina/Admin/CreateAdminUserCommand');
  
  await createAdminUserCommand.handle({
    username: 'admin',
    email: 'admin@example.com'
  });

  return 0;
}
```





