
const BaseService = require('carolina/services/base-service');

/**
 * service BaseSessionService
 * Manages session.
 */
class BaseSessionService extends BaseService {
  
  constructor() {
    super("Session");
  }
  
  /**
   * Check whether or not a given session ID exists.
   * 
   * @param  sessionID String  The session ID to check.
   * 
   * @return exists    Boolean Returns true if the session exists, otherwise false.
   */
  async _sessionIdExists(sessionId) {}
  
  /**
   * Returns a session by sessionId.
   * 
   * @param  sessionId String The ID of the session to return.
   * 
   * @return session   Object The session matching the given ID, otherwise null.
   */
  async getSession(sessionId) {}
  
  /**
   * Saves the session object.
   * 
   * @param  sessionId String The session ID to be stored.
   * @param  session   Object The session data to be stored.
   */
  async saveSession(sessionId, session) {}
  
  /**
   * Generate a new session from the object.
   * 
   * @param  session   Object The session to save as a new session.
   * 
   * @return sessionId String The new session ID.
   */
  async newSession(session={}) {}
  
  /**
   * Deletes the session.
   * 
   * @param sessionId String The ID of the session to delete.
   */
  async deleteSession(sessionId) {}
}

exports = module.exports = BaseSessionService;