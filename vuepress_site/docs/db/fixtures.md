
# Fixtures

The Database Service can reference `.yml` files defining objects to be loaded
into the database. These files are known as Fixtures. Like the class libraries
that many Carolina Services maintain, they are assigned a name and referenced
that way. The Fixture named "Main" is defined in the starter project in 
`site/db/fixtures/main.yml` and its path is exported by 
`site/db/fixtures/index.js`.

Fixtures define groups of objects that can be loaded into the database. They 
can be tracked so that they are not added multiple times, and can be 
removed when a Fixture is undone.

[[toc]]

## Writing Fixtures

Your Fixtures should go in the `site/db/fixtures/` directory. Each should be 
a YAML file with `.yml` extension. The existing files there can serve as
examples, but this section will cover some of the concepts.

The Fixture file can have the following properties:

* `exec`: A list of groups of objects, defined in the same file, that should be added to the database in order.
* `groups`: A set of groups, each which lists objects that should be added to the database in order.
* `require`: A list of Fixture names, referencing other Fixtures that should be loaded first.

Note that since `exec` references groups by name, if the `exec` property exists
then the `groups` property must exist and have the specified groups present.
Here is a basic example:

```yaml
groups:
  group1:
    - model: MyCustomModel
      ref: group1object1
      fields:
        field1: value1
        field2: value2
  group2:
    - model: MyCustomModel
      ref: group2object1
      fields:
        field1: value1
        field2: value2
        
exec:
  - group1
```

In the above example, the object listed in `group1` would be created and added 
to the database. The object belonging to `group2` would NOT be loaded, since 
the group is not specified in `exec`. This feature allows you to develop
fixtures without having them be executed until you add the group name to 
the `exec` property.

Once a group is loaded, the DB Service tracks that the group was loaded and 
will not the load the group again (unless unloaded).

### Including Other Fixtures

Each Fixture file should be referenced by a name in `site/db/fixtures/index.js`,
which should export an object mapping names to full file paths to Fixture files.
Like some of the class types associated with Carolina Services (ie Controllers,
Models, etc), avoid name collisions.

From within a certain fixture, you can reference another fixture that must 
be loaded before the current one. You don't need to have anything else in 
a fixture. You could use a fixture with only a `require` property to list 
other fixtures you want loaded. The fixture "Main", defined in 
`site/db/fixtures/main.yml` is an example. When you run the fixture "Main",
the other fixtures reference will be checked and loaded.

### `ref`

The `ref` property on specific objects in a Fixture is optional, but it is 
very helpful for allowing Fixtures to be removed.
The `ref` name should be unique
within the group. When a Fixture is unloaded, anything that had a `ref` property
will be deleted. Objects that are not given 

## Executing Fixtures

A good idea for using Fixtures is to list a bunch of standard fixtures 
in the `require` property of the Fixture "Main", and then load those Fixtures
simply by loading "Main".

To load a Fixture using the CLI:

```
node . load-data Main
```

If you want to remove all the data from a Fixture, you can unload it like this:

```
node . load-data --unload Main
```

This means you could remove all data (as long as `ref` properties are used)
and re-seed the data base like this:

```
node . load-data --unload Main
node . load-data Main
```