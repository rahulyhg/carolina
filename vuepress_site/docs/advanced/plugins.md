
# Plugins

Plugins are good ways to group functionality together. They can add 
functionality to the framework itself, provide templates, routes, or
our public assets, and define Services. There are some plugins that are 
official, including some which are installed by default. They are covered 
in another section. 

This section covers the generic basics of installing plugins as well as 
information about when and how to write your own plugins.

[[toc]]

## Installing Plugins 

A few plugins are automatically installed and configured in the starter 
project. They are listed by "require" path in the `plugins` property in
`config/app.js`.

These are the steps to take for installed additional plugins
(but plugins should define specific guidance):


**Step 1: List in `config/app.js`**

To install a plugin, list it under the array `plugins` in `config/app.js`.
List a plugin by the import path to a file that exports the plugin info,
which each plugin should document. It should either be to a module in 
`node_modules` or a relative path from the root of your project 
directory.


**Step 2: Import Files**

Some plugins define files to be copied into your project directory (such as
a config file, static assets, templates, etc). Once you have listed a new
plugin in your `config/app.js` file, you should copy any files it has.

```
node . import-plugin-resources -p PLUGIN -crstf
```

This will copy the files over. Before running this, you should consult the
plugin's documentation to see what files will be copied. Any existing files
will be overwritten.

::: tip
Once a plugin is installed, if it is updated you can use the above command 
to import any changes to those copied files. However, the you may not want to
overwrite the config file. To copy over file except for the plugin config file,
run `node . import-plugin-resources -p PLUGIN -rstf`.
:::

**Step 3: Register Service(s)**

Some plugins define Services that can be added to the Carolina global object,
and sometimes this may be required for the plugin to work.
Add any such Services to the `services` object in `config/app.js` as instructed
in the plugin documentation.

**Step 4: Mount Plugin Router**

Some plugins export a router, which you can add to your site's routing
configuration. For example, an admin plugin might be mountable at any 
prefix, but preferably at `/admin` or something like that.
Consult the plugin documentation.

## Writing Plugins

A plugin is a group of code that interacts with the Carolina framework and 
may provide additional service objects (like Models, Middleware, or Event 
classes), a new Service, extra templates, public assets, and/or 
"mountable" sub-routers. It is best if a plugin could easily be added to 
any Carolina project. An example of a plugin might be the entirety of all files
related to the blog section of a site, or a supplemental library of objects
for use by Carolina services (such as a File Driver for Google Drive, a 
Mailer class for GMail, and maybe a logger that adds notes to Google Keep).

**Some Considerations**

Your plugin may contain Services or Service objects/classes that will be 
referenced by the Carolina framework by name. It is important to avoid name 
collisions, especially if you are writing a plugin for use in multiple projects.
It is recommended that you use the NPM name of the package containing 
the plugin as a baseline. For example, if your plugin's NPM name was 
"MyPluginName", a custom User Model might be named "MyPluginName/User". 
There is nothing wrong with using slashes like this and that is encouraged 
for re-useable plugins. If you are exposing only one service, you could 
name it "MyPluginName". If you are exposing multiple services, you should 
name it something like "MyPluginName/Service1".

The structure of a plugin is like this:

```
plugin_dir/
  config/                 # directory for config file
    my_plugin_name.js     # config file for plugin, to be copied into project
  plugin/                 # mimics the site directory of the carolina project
  services/               # place for services
    my-custom-service.js  # a service
  src/                    # source files, to be copied into project
  templates/              # templates, to be copied into project
  index.js                # plugin details, required
  router.js               # a router file
```

### Plugin Index File

The main `index.js` of the plugin should look like this:

```javascript

const path = require('path');

// user friendly name of plugin
this.pluginName = "My Plugin";
// plugin root
this.pluginPath = __dirname;

// types of files exported by app
this.exportConfigFile = true;
this.exportPrivateFiles = false;
this.exportSrcFiles = false;
this.exportStaticFiles = false;
this.exportTemplates = false;

/**
 * Where files are copied into projects
 */

// name of output config file (relative to config/)
this.outputConfigFile = 'plugin_name.js';
// required export name of output config
this.outputConfigExportName = "plugin_name";
// location of output private files (relative to storage/)
this.outputPrivateFilesDir = 'plugin_name';
// location of output src files (relative to src/)
this.outputSrcFilesDir = 'plugin_name/';
// location of output static files (relative to public/)
this.outputStaticFilesDir = 'static/plugin_name/';
// location of output templates (relative to templates)
this.outputTemplatesDir = 'plugin_name';

/**
 * Where files are in the plugin directory that are to be copied out
 */ 

// location of config file to copy over
this.localConfigFile = path.resolve(__dirname, 'config', 'plugin_name.js');
// location of private files to copy over
this.localPrivateFilesDir = path.resolve(__dirname, 'private');
// location of static files to copy over
this.localSrcFilesDir = path.resolve(__dirname, 'src');
// location of static files to copy over
this.localStaticFilesDir = path.resolve(__dirname, 'static', 'plugin-name');
// location of templates to copy over
this.localTemplatesDir = path.resolve(__dirname, 'templates');

// required services under required name and import path
this.requiredServices = {
  'MyPluginName/MyCustomService': 'package_root/services/my-custom-service'
};
```

### Services

A plugin can expose any number of Services if you want it to. It is recommended
to expose only one Serivce if possible.

Here is an example:

Define a service in `<plugin_root>/services/my-custom-service.js`:

```javascript
/* global Carolina */

// extends BaseService
const BaseService = require('carolina/services/base-service');

/**
 * MyCustomService
 * Does stuff.
 */
class MyCustomService extends BaseService {
  
  // call super constructor with Service Name
  constructor() {
    super("MyPluginName/MyCustomService");
  }

  // define custom methods here
  add(a, b) {
    return a + b;
  }

  async onShutdown() {
    // put things to do upon application shutdown here
  }
}

exports = module.exports = MyCustomService;
```

In your documentation, you should tell your users how they need to reference
this service in the `services` object of `config/app.js`.

If you were exposing this Service, the `services` object should contain a line
like this:

```
  'MyPluginName/MyCustomService': 'my-plugin-name/services/my-custom--service'
```

This would allow an application that uses your plugin to do this anywhere 
in their code:

```javascript
let MyCustomService = Carolina.$('MyPluginName/MyCustomService');
let sum = MyCustomService.add(1, 2); // => 3
```

### Other Resources

Aside from Services, there are two types of things that might be in a plugin:

* Files that will be copied into the project directory somewhere.
* Services objects/classes, such as those defined in the projects `site/` directory.

#### Configuration

Your plugin can and probably should specify 1 configuration file, which will 
be copied into the `config/` directory of a project that uses the plugin. It
should be named the same or something similar to the plugin NPM name. It can
be helpful to use underscores instead of dashes if you want.

If your plugin is providing a config file, in the `index.js` of the plugin 
you should define `exportConfigFile` as `true`, `outputConfigFile` as 
the name of the file to create (ie, `"my_plugin_name.js"`),
`outputConfigExportName` as the name by which the file should be exported by 
a project's `config/index.js` file (ie, `'my_plugin_name'`), and 
`localConfigFile` as the full path the configuration file in the plugin.

A configuration file should expose an object and a user of your plugin can 
edit. It is the main way to provide options to plugin users for controlling 
the behavior of the plugin.

Once a user has installed the plugin and imported its resources using the 
`import-plugin-resources` command, they will need to expose it from 
`config/index.js`. The output of the `import-plugin-resources` command 
will indicate this, instructing them to export the config file based on its
name. If you config file is called `my_plugin_name.js`, it should 
be exported like this in `config/index.js`:

```javascript
  my_plugin_name: require('./my_plugin_name')
```

This means that anywhere in your plugin or an application using it, a 
config value from the object exported by the config file can be accessed 
like this:

```javascript
let someConfigValue = Carolina.config('my_plugin_name.some_attr', 'defaultValue');
```

In your plugin files, you should always provide a sane default when accessing
configuration values in case a 
user neglects to provide a custom value.

The configuration file is copied from a plugin to a site with the command:
`node . import-plugin-resources -p PLUGIN -c`.

#### Router

You could provide a router file that exports a list of route objects
(exactly as you would have in `site/http/routes/`). If you do define a router
(recommended as `plugin_dir/router.js`), you should document considerations
for mounting it. You should try to write everything such that a site could mount
it anywhere.

The starter project mounts the router of the Admin plugin this way
(in `site/http/routes/browser.js`):

```javascript
  { route: '/admin', subs: require('carolina/plugins/admin/router') },
```

Since the admin router defines a route at '/', it will be accessed in the main 
site at `/admin/`.

#### Service Objects

Many Carolina Services look for certain class definitions in a projects `site/`
directory, but they will also check the `plugin/` directory of all installed 
plugins.

For example, the DB Service will check for Model classes
in `site/db/models/index.js`
(or `site/db/model.js`), and it will also check in 
`<plugin_dir>/db/models/index.js` (or `<plugin_dir>/db/model.js`). This happens
automatically, and all you have to do is define those objects and export them 
just as you would in the `site/` directory.

#### Template Files

Your plugin may need to define templates, either for use by plugin Controllers
or simply as a feature of your plugin. 
These templates will need to be copied into the application's `templates/`
directory. You will want to avoid name conflict in the `templates/` directory
so you should have your templates be copied into 
`templates/<vendor_name>/<plugin_name>/`.
You should define `.pug` and other
templates (such as nunjucks templates for e-mails) in `<plugin_dir>/templates/`.

To have a plugin set up for exporting templates, in your plugin's `index.js`
file, set `exportTemplates` to `true`, `outputTemplatesDir` to the name 
of the directory relative to a projects `templates/` dir that you want your
templates to be copied into, and `localTemplatesDir` to the full path of 
the directory where templates to be copied over reside.

Template files are copied from a plugin to a project with the command:
`node . import-plugin-resources -p PLUGIN -t`.

#### Public or Private Assets and Frontend Source Files

Your plugin may need to have public assets and frontend source files copied over
into a projects `public/` directory and `src/` directory. Follow the same 
practices as above for templates.

Public assets ("static files") are copied from a plugin to a project with the 
command:
`node . import-plugin-resources -p PLUGIN -s`.

Private files are copied from a plugin to a project's `storage/` dir with the 
command:
`node . import-plugin-resources -p PLUGIN -f`.

Source files are copied from a plugin to a project's `src/` dir with the
command:
`node . import-plugin-resources -p PLUGIN -r`.

::: tip
If you use the template `index.js` above, you do not need to worry about local 
private files not existing if you dont need to export them. Simply set the 
export boolean values to `false` for any type of file that your plugin 
does not export.
:::