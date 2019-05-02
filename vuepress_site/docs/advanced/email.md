
# Email

The Email Service uses a set of mailers (which you configure) in order to send
e-mails. Each mailer is controlled by a driver called a Mailer class. Several 
come with the framework.

[[toc]]

## Configuring Mailers

The Email Service is configured by the file `config/email.js`, which should 
contain a `mailers` property which defines the various mailers that will be used
by your application. You must leave one called "default" in place, but you can 
define as many as you like. Every mailer configuration must have a `defaultFrom`
property (the default FROM e-mail address for all e-mails sent via this mailer)
in addition to a specified `driver`. Some drivers (Mailer classes) may
take additional configuration properties, as specified in the following 
sections.

### `TerminalMailer`

The `TerminalMailer` will "send" e-mails by simplying printing them to the 
terminal output. This is the default driver for the default mailer in the 
starter project, and can be useful for initial development.

It is simple to configure:

```javascript
  'default': {
    driver: 'TerminalMailer',
    defaultFrom: 'webmaster@example.com'
  }
```

### `FileMailer`

The `FileMailer` is similar to the `TerminalMailer` in that it is only useful
for initial development. Instead of printing e-mails to the terminal, it writes
them to `.txt` or `.html` files with metadata in a corresponding `.yml` file.
Its configuration should include a `basepath` property, a path to the directory
where such files should be made. The default value is 
`<app_dir>/.tmp/mail/`.

```javascript
  'default': {
    driver: 'FileMailer',
    defaultFrom: 'webmaster@example.com',
    basepath: path.resolve(process.cwd(), '.tmp', 'mail')
  }
```

### `MailgunMailer`

The `MailgunMailer` will send an e-mail using the Mailgun service.
You will need to go to Mailgun and establish a domain and get an API key.
The `MailgunMailer` is configured this way:

```javascript
  'default': {
    driver: 'MailgunMailer',
    defaultFrom: 'webmaster@example.com',
    mailgunApiKey: "key-12345",
    mailgunDomain: 'example.com'
  }
```

## Sending E-Mail

The easiest way to send an e-mail is to directly use the Email Service.

```javascript
let EmailSvc = Carolina.$('Email');

EmailSvc.sendEmail({
  from: 'webmaster@example.com',
  to: ['someuser@example.com'],
  subject: "Hello",
  message: 'I just wanted to say hi.'
}, 'default');
```

The `sendEmail` method is async and can be awaited. Its first argument is an
object that will be described below. The second argument (which is optional) is
the name of the mailer to use, as defined in `config/email.js`. If omitted,
the "default" mailer will be used.

The properties of the object are as follows:

* `bcc`: *Optional*. **[String,]**. An array of e-mail addresses for the BCC line.
* `cc`: *Optional*. **[String,]**. An array of e-mail addresses for the CC line.
* `from`: *Optional*. **String**. The FROM e-mail address. Defaults to the `defaultFrom` value of the mailer.
* `isHtml` *Optional*. **Boolean**. Whether or not the e-mail should be an HTML e-mail. If `true`, the `message` should be valid e-mail HTML. Defaults to `false`.
* `message`: **String**. The body of the e-mail.
* `subject`: **String**. The subject of the e-mail.
* `to`: **[String,]**. An array of e-mail addresses for the TO line.

### Sending Template E-Mails

Currently, there is support for sending a 
[nunjucks](https://www.npmjs.com/package/nunjucks) template from a file in 
your `templates/` directory. It is recommended that you create a subdirectory
for such templates, such as `templates/email/`.

Here is an example template:

```
Hello {{ username }},

We just wanted to say hi.
```

Assuming this is in the file `templates/email/hello.txt`, you can send an 
e-mail using the `sendNunjucksTemplate(template, data, obj, mailer='default')`
method:

```javascript
let EmailSvc = Carolina.$('Email');

EmailSvc.sendNunjucksTemplate('email/hello.txt',
  { username: user.username },
  {
    from: 'webmaster@example.com',
    to: ['someuser@example.com'],
    subject: "Hello",
  }, 'default');
```

The first parameter is the 
template (relative to `templates/`) and the second is the data to render the
template with.
The third and fourth parameters are the same as `sendEmail`, except for 
`message` is ignored. The content of the e-mail will be the result of rendering
the template with the givne data.

## Writing Custom Mailers

If you need to write a different class to handle sending e-mails,
custom mailers can be created very simply.

You can generate a new Mailer class using the CLI:

```
node . generate mailer MyCustomMailer
```

That would generate the file 
`site/email/mailers/my-custom-mailer.js`.

The created file will have the `sendEmail` method stubbed. Within that function
you need to send the e-mail. You don't need to overwrite the `BaseMailer`
method `sendNunjucksTemplate`, as it will automatically render a template and 
call the `sendEmail` method.

You should use the constructor to take the configuration object and do whatever
you need to do.

Once the custom Mailer is complete, you need to export it in 
`site/email/mailers/index.js`:

```javascript
/**
 * Custom mailers.
 */
exports = module.exports = {
  MyCustomMailer: require('./my-custom-mailer')
};
```

At this point, you would be able to use the custom mailer by specifying it as 
the driver for a certain mailer in `config/email.js`:

```javascript
  'default': {
    driver: 'MyCustomMailer',
    defaultFrom: 'webmaster@example.com',
    // any other custom configuration you need
  }
```