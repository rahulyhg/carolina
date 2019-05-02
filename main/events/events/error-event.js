
const BaseEvent = require('carolina/main/events/events/base-event');

class ErrorEvent extends BaseEvent {
  constructor(err, request=null, response=null) {
    super("ErrorEvent", `Error: ${err.name}.`);
    this.err = err;
    this.request = request;
    this.response = response;
  }
}

exports = module.exports = ErrorEvent;