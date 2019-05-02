
const BaseEvent = require('carolina/main/events/events/base-event');

class SystemShutdownEvent extends BaseEvent {
  constructor(obj) {
    
    super("SystemShutdownEvent", `System shutdown for reason: ${obj.reason}.`);
    
    this.err = obj.err || null;
    this.reason = obj.reason || "unknown cause";
  }
}

exports = module.exports = SystemShutdownEvent;