
# Carolina AWS

The Carolina AWS plugin, referenced as `carolina/plugins/aws`, provides 
a few driver classes for existing Carolina Services to connect to 
various platforms on AWS (Amazon Web Services).

[[toc]]

## Installation

The Carolina AWS plugin is **not** installed by default, follow the following
steps if you wish to install it:

1. List "carolina/plugins/aws" in the `plugins` property of `config/app.js`.
2. Run the command `node . import-plugin-resources carolina/plugins/aws -c`.
3. Ensure the file `config/carolina_aws.js` is exposed by `config/index.js` as "carolina_aws".
4. Ensure that the npm module `aws-sdk` is installed.

One this is installed, a few new service
classes (which are documented below) will 
be available and configurable.

## Configuration

The Carolina AWS plugin contains classes for communicating with a few 
AWS Services and does so by using a profile in the 
file `~/.aws/credentials` (which is standard for using AWS). Look into 
AWS documentation for how to set up this file with various profiles.

The
plugin is configured by the file `config/carolina_aws.js`. It can be copied 
from the plugin code when you run the `import-plugin-resources` command with 
the `-c` flag. 

**Configuration Values**

| Key | Description |
| --- | --- |
| `profile` | Which profile in `~/.aws/credentials` to use by default. |
| `region` | Which region to use for AWS services by default. |

Note that configurations for specific drivers can override these values if 
you wish.

## Details 

### Database Connection Class: Carolina/AWS/DynamoDBConnection

The plugin adds the class `Carolina/AWS/DynamoDBConnection` to the possible
database connection classes you can use and configure. Like other database
connection classes, you don't need to interact with it directly. If you 
wish, you can configure a connection in `config/db.js`.

You must create the DynamoDB table yourself.

A configuration may look like this:

```javascript
// config/db.js
exports = module.exports = {
  connections: {
    'default': { /* default connection here */ }
    'dynamo_db': {
      // specify the driver class
      driver: "Carolina/AWS/DynamoDBConnection",
      // name of dynomoDB table
      tableName: "my_table",
      // credential profile to use
      profile: "default", // optional, defaults to value in config/carolina_aws.js or 'default'
      // AWS region
      region: "us-east-1", // optional, defaults to value in config/carolina_aws.js or "us-east-1"
    }
  }
};
```

In order to use this, you must create the table in DynamoDB first. It must 
have a Partition Key called "model" (a String) and a Primary sort key 
called "id" (also a String). Once configured, the `DynamoDBConnection` 
instance will populate it!

### Mailer Class: Carolina/AWS/SESMailer

This plugin adds `Carolina/AWS/SESMailer` to your options for Mailer types.
It interacts with AWS SES (Simple Email Service).
If the plugin is installed and you have a working SES domain, you can configure
it as a mailer for sending e-mails.

Sample configuration:

```javascript
// config/email.js
exports = module.exports = {
  mailers: {
    'default': {
      driver: "Carolina/AWS/SESMailer",
      defaultFrom: "something@example.com", // domain should match SES configuration
      region: "us-west-2" // optional
    }
  }
};
```

This will allow sending e-mails the same ways as with other built-in 
[Mailer classes](../advanced/email.md).

### File Driver Class: Carolina/AWS/S3FileDriver

This plugin adds `Carolina/AWS/S3FileDriver` to your options for File drivers.
It communicates with an existing S3 bucket. Here is how you configure it:

```javascript
// config/files.js
exports = module.exports = {
  fileDrives: {
    temp: { /* temp driver */ },
    'public': {
      driver: 'Carolina/AWS/S3FileDriver',
      bucketName: "some_s3_bucket",
      region: "us-east-1",
      isPublic: true, // optional, defaults to false
      publicUrl: "http://s3_domain.aws.com/" // required if isPublic is true
    }
  }
};
```