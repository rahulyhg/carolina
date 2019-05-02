
/* global Carolina */

const BaseService = require('carolina/services/base-service');

class EventsService extends BaseService {
  
  constructor() {
    
    super("Events");
    
    let events = require('carolina/main/events/events');
    this._initializeLibrary("eventClasses", "events", "events/events", events,
      "event");
      
    let listeners = require('carolina/main/events/listeners');
    this._initializeLibrary("listenerClasses", "listeners", "events/listeners",
      listeners, "listener");
    
    /**
    this.eventListenerMap = {};
      
    for (let listenerKey in this.listenerClasses) {
      let Listener = this._listener(listenerKey);
      for (let i = 0; i < Listener.events.length; ++i) {
        if (!this.eventListenerMap.hasOwnProperty(Listener.events[i])) {
          this.eventListenerMap[Listener.events[i]] = [];
        }
        this.eventListenerMap[Listener.events[i]].push(listenerKey);
      }
    }
    */
  }
  
  _eventClass(name) {
    if (this.eventClasses.hasOwnProperty(name)) {
      return this.eventClasses[name];
    }
    else {
      throw `No event ${name}.`;
    }
  }
  
  _listener(name) {
    return this._lazyLoadObject(name, "listenerClasses", "listeners",
      "listener");
  }
  
  fireEvent(e, eventName) {
    
    let dontFireEvents = Carolina.config('events.dontFire');
    if (dontFireEvents.indexOf(eventName) != -1) {
      return false;
    }
    
    let eventListeners = Carolina.config("events.eventListeners");
    let listenerList = eventListeners[eventName] || [];
    for (let i = 0; i < listenerList.length; ++i) {
      let Listener = this._listener(listenerList[i]);
      Listener.handle(e);
    }
    
    return true;
  }
}

exports = module.exports = EventsService;