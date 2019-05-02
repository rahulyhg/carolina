
const BaseEvent = require('carolina/main/events/events/base-event');

class EmailVerificationEvent extends BaseEvent {
  constructor(user) {
    super('Carolina/Auth/EmailVerificationEvent', "E-mail verification.");
    this.user = user;
  }
}

class LoginEvent extends BaseEvent {
  constructor(user) {
    super('Carolina/Auth/LoginEvent', "New login.");
    this.user = user;
  }
}

class LoginFailureEvent extends BaseEvent {
  constructor(identifier) {
    super('Carolina/Auth/LoginFailureEvent', "Failed login attempt.");
    this.identifier = identifier;
  }
}

class RegistrationEvent extends BaseEvent {
  constructor(user) {
    super("Carolina/Auth/RegistrationEvent", "New user registered.");
    this.user = user;
  } 
}

exports = module.exports = {
  'Carolina/Auth/EmailVerificationEvent': EmailVerificationEvent,
  'Carolina/Auth/LoginEvent': LoginEvent,
  'Carolina/Auth/LoginFailureEvent': LoginFailureEvent,
  'Carolina/Auth/RegistrationEvent': RegistrationEvent
};