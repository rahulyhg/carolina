
const crypto = require('crypto');

const moment = require('moment');

const BaseSessionService = require('carolina/services/session/base-session-service');

/**
 * service InMemorySessionService
 * Manages session.
 */
class InMemorySessionService extends BaseSessionService {
  
  constructor() {
    
    super();
    
    this.sessionData = {};
  }
  
  /**
   * Check whether or not a given session ID exists.
   * 
   * @param  sessionID String  The session ID to check.
   * 
   * @return exists    Boolean Returns true if the session exists, otherwise false.
   */
  async _sessionIdExists(sessionId) {
    return (this.sessionData.hasOwnProperty(sessionId));
  }
  
  /**
   * Returns a session by sessionId.
   * 
   * @param  sessionId String The ID of the session to return.
   * 
   * @return session   Object The session matching the given ID, otherwise {}.
   */
  async getSession(sessionId) {
    let sessionExists = await this._sessionIdExists(sessionId);
    if (sessionExists) {
      return this.sessionData[sessionId];
    }
    else {
      return {};
    }
  }
  
  /**
   * Saves the session object.
   * 
   * @param  sessionId String The session ID to be stored.
   * @param  session   Object The session data to be stored.
   */
  async saveSession(sessionId, session) {
    this.sessionData[sessionId] = session;
    // console.log("sessiondata", this.sessionData);
  }
  
  /**
   * Generate a new session from the object.
   * 
   * @param  session   Object The session to save as a new session.
   * 
   * @return sessionId String The new session ID.
   */
  async newSession(session={}) {
    let sessionKey = crypto.randomBytes(8).toString("hex") + moment().format();
    this.sessionData[sessionKey] = session;
    return sessionKey;
  }
  
  /**
   * Deletes the session.
   * 
   * @param sessionId String The ID of the session to delete.
   */
  async deleteSession(sessionId) {
    delete this.sessionData[sessionId];
  }
}

exports = module.exports = InMemorySessionService;