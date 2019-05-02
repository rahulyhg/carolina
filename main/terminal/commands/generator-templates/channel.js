
const BaseChannel = require('carolina/main/web-sockets/channels/base-channel');

class {{ name }} extends BaseChannel {

  constructor(obj) {
    super(obj);
  }

  _configure(io, name) {
    super._configure(io, name, (socket) => {
      /**
      socket.on('some-event', (data) => {
        // do something
      })
      */
    });
  }
}

exports = module.exports = {{ name }};