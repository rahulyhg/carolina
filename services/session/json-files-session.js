
/* global Carolina */

const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');

const moment = require('moment');

const InMemorySessionService = require('carolina/services/session/in-memory-session');

/**
 * service JsonFilesSessionService
 * Manages session in memory, but saves files on shutdown.
 */
class JsonFilesSessionService extends InMemorySessionService {
  
  constructor() {
    
    super();
    
    fs.ensureDirSync(path.join(Carolina.config("session.sessionFilesDir")));
    
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
    if (this.sessionData.hasOwnProperty(sessionId)) {
      return true;
    }
    else {
      if (fs.existsSync(path.join(Carolina.config("session.sessionFilesDir"), `${sessionId}.json`))) {
        this.sessionData[sessionId] = JSON.parse(fs.readFileSync(path.join(
          Carolina.config("session.sessionFilesDir"),
          `${sessionId}.json`)).toString());
          return true;
      }
      else {
        return false;
      }
    }
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
  
  async onShutdown() {
    for (let sessionId in this.sessionData) {
      fs.writeFileSync(path.resolve(Carolina.config('session.sessionFilesDir'),
        `${sessionId}.json`), JSON.stringify(this.sessionData[sessionId], null,
        2));
    }
  }
}

exports = module.exports = JsonFilesSessionService;