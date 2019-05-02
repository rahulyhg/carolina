
# Events

The Events Service maintains libraries of Event classes and Listener
singletons. The Service also tracks which Listeners should listen for which
Event types, based on your configuration. Listeners react to Events when they
are fired anywhere in your application.

You can get a reference to the Events Service in order to access, contruct,
and fire Events (more details below):

```javascript
let EventsSvc = Carolina.$('Events');
let CustomEvent = EventsSvc._eventClass('CustomEvent');
let event = new CustomEvent({ ... });

event.fire();
```

Events are good way to declare that something has taken place and to
encapsulate information about it, and then allow other code to run in response
to that event asynchronously so the request can still process quickly. It also
decouples the part of your code that reacts to certain events from the part of
the code that actually fires them.

[[toc]]

## Setup

The mapping of Listeners to certain Event types is done in the configuration
file `config/events.js` in the property `eventListeners`. For example, suppose 
that you want to send an e-mail to someone after the user submits a form, but
you want to have the HTTP response return quickly and may want to be able to
later add other things that should happen in response to the form submission.

In that case, you may have defined an Event class called "FormSubmittedEvent"
and a Listener called "EmailFormConfirmationListener". You might configure
the Events Service this way:

```javascript
eventListeners: {
  EmailFormConfirmationListener: [
    'FormSubmittedEvent'
  ]
}
```

This tells the Events Service that every time a `FormSubmittedEvent` is fired,
it should be handed to the `EmailFormConfirmationListener` instance for
further processing.

### Generating Events

You can generate a new Event class using the CLI:

```
node . generate event CustomEvent
```

This would create the file
`site/events/events/custom-event.js`.

### Generating Listeners

You can generate a Listener using the CLI:

```
node . generate listener CustomListener
```

This would create the file
`site/events/listeners/custom-listener.js`.

## Writing Events

Events shouldn't do much more than encapsulate some information. The normal
way to do this is to take an object in the constructor and save some properties
to `this`.

Example Event:

```javascript
class FormSubmissionEvent extends BaseEvent {
  constructor(obj) {

    super('FormSubmissionEvent', "A user has submitted a form.");

    this.formFieldA = user.form.fieldA;
    this.formFieldB = user.form.fieldB;
  }
}

exports = module.exports = FormSubmissionEvent;
```

You would have to ensure that your Event is exported by
`site/events/events/index.js`:

```javascript
// custom event classes
exports = module.exports = {
  FormSubmissionEvent: require('./form-submission-event')
};
```

The arguments to the super constructor are its name and description.
The description is arbitrary and is only used for logging purposes,
but the *name is important*. They are bound as `event.name` and
`event.description`.

::: danger
The name passed to the `super` constructor MUST match the name of the 
Event. It is used to map the Event instance to the appropriate Listener.
:::

For clarity, you should document what type of object the Event expects to
be constructed with.

You could fire the event like this:

```javascript
let FormSubmissionEvent = EventsSvc._eventClass('FormSubmissionEvent');
let event = new FormSubmissionEvent({ form: { ... } });

event.fire();
```

## Writing Listeners

Unlike Events, which are managed by the Events Service as a class library,
Listeners are singletons which are instantiated the first time they are needed.
They are instantiated with no arguments passed to the constructor.

When an Event with a name that a Listener is configured to listen for is 
fired, the Events Service passes the Event object to the `handle` method
of that Listener and call it *without awaiting*. It does this for all 
Listeners that should receive it.

A Listener's logic goes in the `handle` method.

```javascript
class CustomListener extends BaseListener {

  constructor() {
    super();
  }

  async handle(event) {
    console.log(event.formFieldA);
    // do stuff with event
  }
}

exports = module.exports = CustomListener;
```

You would need to export the Listener in
`site/events/listeners/index.js`:

```javascript
// custom listeners
exports = module.exports = {
  CustomListener: require('./custom-listener')
};
```

