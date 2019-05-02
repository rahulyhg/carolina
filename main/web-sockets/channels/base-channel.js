
/* global Carolina */

class BaseChannel {

  constructor(obj) {
    this.isPrivate = obj.isPrivate || false;
    this.io = null;
    this.name = null;
  }

  _configure(io, name, socketConfig) {

    this.io = io;
    this.name = name;

    this.io.on('connection', (socket) => {

      let LoggerSvc = Carolina.$('Logger');
      LoggerSvc.log({ source: 'WebSockets', level: 5,
        message: `Connection to channel ${this.name}`});
2
      socket.on('session_id', (data) => {

        let sessionId = Carolina.$('Crypto').decryptText(data);
        // add socket to special room by sessionId
        socket.join(`session.${sessionId}`);
        Carolina.$('Session').getSession(
          sessionId).then((session) => {
            if ('user_id' in session) {
              socket.join(`user.${session.user_id}`);
              socket._userId = session.user_id;
            }
          });
      });

      if (socketConfig != null) {
        socketConfig(socket);
      }
    });
  }

  emit(eventName, data={}, room=null) {
    if (room) {
      this.io.to(room).emit(eventName, data);
    }
    else {
      this.io.emit(eventName, data);
    }
  }

  emitToSessionId(sessionId, eventName, data={}) {
    this.emit(eventName, data, `session.${sessionId}`);
  }
  emitToUser(user, eventName, data={}) {
    this.emit(eventName, data, `user.${user._id}`);
  }
}

exports = module.exports = BaseChannel;