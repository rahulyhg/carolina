
# Testing

The Carolina starter project does not have full end to end testing setup, 
but it does include some basic tests with 
[mocha](https://www.npmjs.com/package/mocha) and 
[chai](https://www.npmjs.com/package/chai).

## Running Tests

The tests are located in the `tests` directory, and are currently divided 
into two subdirectories. The directory `tests/carolina/` contains some basic
tests of the Carolina framework. The directory `tests/site/` contains only 
1 test file, which enforces that you have all of the required Carolina 
Services configured. You should add more site tests to that directory if
desired.

To run the Carolina tests, run the following command from your project
directory:

```
mocha tests/carolina
```

To run site tests, run the following command from your project directory:

```
mocha tests/site
```

To run all tests, run the following command:

```
mocha tests/*
```

Or:

```
npm run test
```

## Testing Configuration

When you run tests, one of the files specifies to run the method exported 
by `tests/testing_bootstrap.js`. It reads the file `tests/testing.config.js`,
which provides configuration values specific for testing.

The values specified by `fixtures` will be loaded into the database before
testing begins.

The values in `configOverrides` will replace values in your `config/` 
directory. Keep in mind that values in your `config` directory will be 
overwritten. 

## Writing Tests

Consult the documentation for mocha and chai for more details on writing 
tests. Simply place your test files in `tests/site/` and they will 
be run when you execute `npm run test`.