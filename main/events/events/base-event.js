
/**
 * class BaseEvent
 * Representation of a firable event.
 * Events, unlike many Carolina Objects, are NOT singletons.
 */
class BaseEvent {
  
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  
  fire() {
    
    /* global Carolina */
    
    /**
    let LoggerSvc = Carolina.$("Logger");
    LoggerSvc.log({
      source: 'Events',
      level: 4,
      message: `Firing instance of ${this.name}.`
    });
    */
    Carolina.$("Events").fireEvent(this, this.name);
  }
}

exports = module.exports = BaseEvent;