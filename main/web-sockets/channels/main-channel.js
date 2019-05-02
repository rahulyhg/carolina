
const BaseChannel = require('carolina/main/web-sockets/channels/base-channel');

class MainChannel extends BaseChannel {

  constructor(obj) {
    super(obj);
  }

  _configure(io, name) {
    super._configure(io, name, null);
  }
}

exports = module.exports = MainChannel;