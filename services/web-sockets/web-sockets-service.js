
/* global Carolina */

const socketio = require('socket.io');

const BaseService = require('carolina/services/base-service');

class WebSocketsService extends BaseService {

  constructor() {

    super('WebSockets');

    this.io = null;

    let carolinaChannels = require('carolina/main/web-sockets/channels');
    this._initializeLibrary('channelClasses', 'channels', 'web-sockets/channels',
      carolinaChannels, "channel");

    let channels = Carolina.config('web_sockets.channels', {});
    for (let channelName in channels) {
      let ChannelClass = this._channelClass(channels[channelName].driver);
      this.channels[channelName] = new ChannelClass(channels[channelName]);
    }
  }

  _channelClass(name) {
    return this._loadClass(name, 'channelClasses', "channel");
  }

  configureServer(server) {
    let shouldConfigure = Carolina.config('web_sockets.useSockets', false);
    if (shouldConfigure) {

      this.io = socketio(server);

      for (let channelName in this.channels) {
        if (channelName == '/') {
          this.channels[channelName]._configure(this.io, '/');
        }
        else {
          this.channels[channelName]._configure(this.io.of(channelName),
            channelName);
        }
      }
    }
  }
}

exports = module.exports = WebSocketsService;