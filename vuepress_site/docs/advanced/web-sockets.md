
# Web Sockets

The WebSockets Service uses the
[socket.io](https://www.npmjs.com/package/socket.io) module to allow the 
application to send messages from the server to clients on various channels.
Doing this requires you to write frontend code that cooperates with this 
effort, and some helper files are provided with the framework.

::: tip
Sockets are disabled by default and your application may not need to 
enable them.
:::

[[toc]]

## Configuration

Configuration for the WebSockets Service is done in the file
`config/web_sockets.js`.

The main purpose of this is to set up Channel drivers, described in more
detail below. In the configuration file, Channels are mapped Channel classes
and correspond to Socket IO namespaces. The keys for Channels should therefore
look like paths (even though they are not related to the actual paths in your
application). Example:

```javascript
exports = module.exports = {
  channels: {
    '/': { driver: 'MainChannel' },
    '/other': { driver: 'MyCustomChannel' }
  }
}
```

The driver attribute references a Channel class. You would create custom
Channel classes to configure the Socket IO namespace.

### Turning Web Sockets On

The `useSockets` property is a Boolean value. The Socket IO system will only
be made if `useSockets` is set to true.

## Frontend Subscription

You can use the *frontend* WebSocketsSvc to connect to channels and configure
them. The frontend WebSockets Service is a singleton exported
in the starter project in
`src/carolina/web-sockets/web-sockets-svc.js`.

You could use it in a webpack application like this
(assume this is an entry file located directly in `src/`):

```javascript
import WebSocketsSvc from './carolina/web-sockets/web-sockets-svc';

// configure socket connection to default channel
WebSocketsSvc.configureChannel('/', (socket) => {
  socket.on('connect', () => {
    console.log("Connection made...");
  });
});

// get access to socket connection anywhere else
// connection already established, connect returns it
let socket = WebSocketsSvc.connect("/");
socket.on(...);
```

The `connect(channel='/')` method establishes the channel connection and 
returns the Socket object. If the channel has already been connected to,
it still returns the same Socket object. This allows you to access the 
Socket from across the application.

## Overview

The general purposes of the WebSockets Service is to enable the sending of
information from the server to the client (and back if necessary).
This is done over various channels, some of which are public and some of
which are private. Private channels will have to validate whether or not
a user can join. Within channels, connections can be placed in various 
rooms.

If you use the front end Session Service and the backend Channel properly
calls the `_configure` method of `BaseChannel` (more below), incoming
socket connections will automatically be added to a room called 
`session.{sessionId}`. If a user is logged in to that session, the socket
will also be added to a room called `user.{user._id}`. This allows easy 
emitting of events from anywhere in the application so specific users
and sessions.

### Sending Events

#### Broadcast Event

Suppose something takes place and you want to notify
the frontend Javascript of all connections on the 
main channel to its occurrence.

```javascript
let WebSocketsSvc = Carolina.$('WebSockets');
WebSocketsSvc.channels['/'].emit('some-event', data);
```

To configure frontend applications to listen for this, use the same frontend
WebSocketsSvc described above:

```javascript
import WebSocketsSvc from './carolina/web-sockets/web-sockets-svc';

WebSocketsSvc.configureChannel('/', (socket) => {
  socket.on('connect', () => {
    console.log("Connection made...");
  });
  socket.on('some-event', (data) => {
    // data from the server
    console.log(data);
  });
});
```

#### Send Event to Specific User

Say a user filled out a form on single page application that required action
from another user. Perhaps another user goes in and approves the form - you
may want to notify the original user that the next action was taken if they
are still online and connected by socket:

```javascript
let User = Carolina.$('DB')._modelClass('User');
let specificUser = await User.$get({ username: 'username' });
let WebSocketsSvc = Carolina.$('WebSockets');
WebSocketsSvc.channels['/'].emitToUser(specificUser, 'some-event', data);
```

The above code will emit to the room `user.{specificUser._id}` only.

## Custom Channel Classes

The `MainChannel` class is the default driver for the '/' channel.
It doesn't add any functionality over the `BaseChannel` class, which
adds socket connections to rooms for the session and user. If all you want to
do is be able to send arbitrary messages to all connections or to specific 
users, you may not need any other channels or drivers. 

However, if you need more specific room assignments and handling of client
events, you will need to make a custom Channel.

You can generate a new Channel using the CLI:

```
node . generate channel MyCustomChannel
```

This would generate the file
`site/web-sockets/channels/my-custom-channel.js`.

The class might look like this:

```javascript
class MyCustomChannel extends BaseChannel {
  
  constructor(obj) {
    super(obj);
  }

  _configure(io, name) {
    // third argument is an optional function used to configure the socket
    // after it first connects
    super._configure(io, name, (socket) => {
      socket.on('checkin', (data) => {
        // socket may have _userId if using front service
        if (socket._userId) {
          socket.join('authenticated');
        }
        // do something with data
      });
    });
  }
}

exports = module.exports = MyCustomChannel;
```

The `_configure()` method of `BaseChannel` will log new connections at SILLY
level and will react to `session_id` events (from the client-side service),
by adding the socket to a room for its session id and, if authenticated, adding
it to a room for the user id and setting `socket._userId`. You can then listen
for any socket event that you expect to be thrown first, and use it to check
for a user and assign the socket to special rooms as appropriate.

To ensure that the WebSockets Service knows of your Channel type, ensure that 
it is exported by `site/web-sockets/channels/index.js`:

```javascript
// custom channels
exports = module.exports = {
  MyCustomChannel: require('./my-custom-channel')
};
```

To use it as a driver for a channel, do this in `config/web_sockets.js`:

```javascript
  channels: {
    // other channels

    '/custom': { driver: 'MyCustomChannel' }
  },
```

## Frontend

The frontend is more simple. Here is how you could interact with the above
channel:

```javascript
import WebSocketsSvc from './carolina/web-sockets/web-sockets-svc';

// connect channel and configure socket connection
WebSocketsSvc.configureChannel('/', (socket) => {
  socket.on('connect', () => {
    console.log("Connection made...");
  });
  socket.on('some-event', (data) => {
    // data from the server
    console.log(data);
  });

  // more events

  // send initial checkin
  socket.emit('checkin');
});
```

The `configureChannel` method will create the initial connection and send a 
`session_id` event with the Session ID from the cookie.