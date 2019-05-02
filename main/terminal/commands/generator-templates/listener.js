
const BaseListener = require('carolina/main/listeners/base-listener');

/**
 * class {{ name }}
 * Represents an event listener that handles events.
 */
class {{ name }} extends BaseListener {
  
  constructor() {
    super();
  }
  
  /**
   * {{ name }}.handle(event)
   * Handles a fired event.
   * 
   * @param event The event that was fired.
   */
   async handle(event) {
  
   }
}

exports = module.exports = {{ name }};