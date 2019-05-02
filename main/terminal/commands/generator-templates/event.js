
const BaseEvent = require('carolina/main/events/base-event');

/**
 * class {{ name }}
 * Representation of a firable event.
 */
class {{ name }} extends BaseEvent {
  
  constructor(obj={}) {
    
    super("{{ name }}", "Description of event.");

    // add properties here
  }

}

exports = module.exports = {{ name }};