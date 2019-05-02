
const BaseEvent = require('carolina/main/events/events/base-event');

class InitializeServiceEvent extends BaseEvent {
  constructor(serviceName, serviceObject) {
    
    super("InitializeServiceEvent", `Service ${serviceName} initialized.`);
    
    this.serviceName = serviceName;
    this.serviceObject = serviceObject;
  }
}

exports = module.exports = InitializeServiceEvent;