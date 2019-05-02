
# Logging

The Logger Service facilitates writing logs. It does so by checking the various
Loggers that it maintains (which you configure) and sending log entries to each
Logger that should record it. This makes it easy to log things throughout
your application (at various levels) and editing the Logger configuration
to determine which logs will actually get recorded and how.

The Logger Service is available from the Carolina global object:

```javascript
let LoggerSvc = Carolina.$('Logger');
```

## Configuring Log Channels

The Logger Service sends logs to logger channels, each of which is an instance
of some type of Logger class which is designed for writing logs in various
ways. 

The configuration for logger channels is found in the `logChannels` property
of `config/logger.js`. It is an object which maps logger names to objects 
that will be used to create Logger instances. The actual Logger class used
is specified by the property `driver`. Each logger configuration object
in the configuration must at least specify the `driver` and the `level`.
Levels will be explained in more detail further below. The objects may 
also specify `sources`, an array of strings. If provided, only log entries
from those named sources will be used. Source names are arbitrary and are 
specified when writing log entries, but internally the Carolina framework
uses Service names as the source of all log entries it sends.

In addition to those properties, some actual driver types for logger channels
may have other configuration options available.

Example configuration:

```javascript
exports = module.exports = {
  logChannels: {
    main: {
      driver: 'TerminalLogger',
      level: 5, // all log levels
      useColors: true
      // logs from all sources
    },
    httpLogs: {
      driver: 'FileLogger',
      level: 4,
      filePattern: 'http.[].txt', // the [] is replaced with the date
      baseDir: path.resolve(process.cwd(), 'storage', 'logs'), // this is the default
      subDir: 'http-logs'
      // this logger will create files like storage/logs/http-logs/http.20181111.txt
    }
  }
}
```

The above shows an example configuration using `TerminalLogger` instance and a
`FileLogger` instance, as well as configuration examples for each.

### Specific Logger Types

For logger drivers, you can use any of these classes that come with the
framework.

**Logger Drivers**

| Type | Description |
| --- | --- |
| `DbLogger` | Writes log messages to the `log_entry` database table. |
| `EmailLogger` | Emails log messages. |
| `FileLogger` | Writes log messages to a daily file. |
| `JsonPostLogger` | Posts log messages to an API. |
| `TerminalLogger` | Writes log messages to the terminal output. |

Some Logger types have special configuration values you can use in
`config/logger.js`.

**`DbLogger`**

No additional configuration.

**`EmailLogger`**

* `mailer`: **String**. The `mailer` to use. Defaults to "default".
* `mailfrom`: **String**. The FROM e-mail address to use.
* `mailto`: **String**. The TO e-mail address to use.
* `subject`: **String**. The subject to use.

Example:

```javascript
{
  driver: "EmailLogger",
  level: 1, // WARN and ERROR levels only
  mailer: "default",
  mailfrom: "webmaster@example.com",
  mailto: "logs@example.com",
  subject: "Error/Warning from your application."
}
```

**`FileLogger`**

* `baseDir`: **String**. The base directory for log files. Defaults to `storage/logs`.
* `subDir`: **String**. The subdirectory to use.
* `filePattern`: **String**. The file name to write logs to. If "[]" is in the value, it will be replaced with the date and be a rotating log.

Example:

```javascript
{
  driver: 'FileLogger',
  level: 1,
  subDir: 'daily',
  filePattern: '[].log'
}
```

**`JsonPostLogger`**

* `headers`: **Object**. Request headers to use. Defaults to `{ 'Content-Type': "application/json" }`.
* `url`: **String**. The URL to send POST requests to.

Example:

```javascript
{
  driver: 'JsonPostLogger',
  level: 1,
  url: 'http://example.com/api/submit-log-entry'
}
```

**`TerminalLogger`**

* `useColors`: **Boolean**. Whether or not to use different colors for different levels when printing to console. Defaults to `false`.

Example:

```javascript
{
  driver: 'TerminalLogger',
  level: 5,
  useColors: true
}
```

### Log Levels

The following section will cover how to use the Logger Service to submit log
entries. Each log entry will need to have a level, a number from 0-5. They
correspond with standard NPM log levels (listed from most severe to lease
severe):

| Level | Name | Color | Usage |
| --- | --- | --- | --- |
| 0 | ERROR | Red | Use this for bad errors. It is automatically use by the LogErrors Listener. |
| 1 | WARN | Yellow | Use this for things that aren't ideal, but don't necessarily end the world. |
| 2 | INFO | Magenta | Use this for useful informative log entries. |
| 3 | VERBOSE | Blue | Use this for additional information. |
| 4 | DEBUG | Green | Use this for extra information helpful for debugging issues.
| 5 | SILLY | Gray | Use this for generally extraneous entries. |

Each logger specified in your configuration will have a level associated with 
it. This tells the Logger to only log entries at the specified level 
*or below*. 

## Writing Logs

You can write log entries using the Logger Service. Each log entry should
have a level, a message, and optionally a source. Note that log entries
without a named source will only be logged by loggers listening for all
sources.

Example:

```javascript
let LoggerSvc = Carolina.$('Logger');
LoggerSvc.log({ level: 3, message: "This is a verbose log entry." });
LoggerSvc.log({ source: 'App', level: 3, message: "This is a verbose log entry with a source." });
```

When you use the `log` method of the Logger Service, each logger object (per
configuration in `config/logger.js`) will be checked to see if it should act
on it. If so, the log entry will be made according to the type and
configuration of each 
specific logger.

### Shortcut Methods

The Logger Service also has shortcut methods for each level:

```javascript
// first arg is message, second is optional source. level is automatic
LoggerSvc.error("A critical error has occured.", "App");
LoggerSvc.warn("There is a slight problem here.");
LoggerSvc.info("Here is some information.");
LoggerSvc.verbose("Here is some extra information.");
LoggerSvc.debug("Now calling myFunc()...");
LoggerSvc.silly("LOL hahahaha i don't even know what im doing...");
```

