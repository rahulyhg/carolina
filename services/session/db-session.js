
/* global Carolina */

const generateId = require('carolina/_lib/generate-id');

const BaseSessionService = require('carolina/services/session/base-session-service');

/**
 * service DbSessionService
 * Manages session by storing it in the database.
 */
class DbSessionService extends BaseSessionService {
  
  constructor() {
    super();
  }
  
  async _sessionIdExists(sessionId) {
    let SessionInfo = Carolina.$("DB")._modelClass("SessionInfo");
    let sess = await SessionInfo.$get({ sessionId: sessionId });
    if (sess) return true;
    return false;
  }
  
  async getSession(sessionId) {
    let SessionInfo = Carolina.$("DB")._modelClass("SessionInfo");
    let sess = await SessionInfo.$get({ sessionId: sessionId });
    if (sess) return sess.sessionData;
    return {};
  }
  
  async saveSession(sessionId, session) {
    let SessionInfo = Carolina.$("DB")._modelClass("SessionInfo");
    let sess = await SessionInfo.$get({ sessionId: sessionId });
    if (sess) {
      
      sess.sessionData = session;
      await sess._save();
      
      return;
    }
    else {
      
      // console.log("No session found, creating new...");
      
      let sess = new SessionInfo({
        sessionData: session,
        sessionId: sessionId
      });
      await sess._save();
      
      return;
    }
  }
  
  async newSession(session={}) {
    
    let SessionInfo = Carolina.$("DB")._modelClass("SessionInfo");
    let sess = new SessionInfo({
      sessionData: session,
      sessionId: generateId()
    });
    
    await sess._save();
    
    return sess.sessionId;
  }
  
  async deleteSession(sessionId) {
    
    let SessionInfo = Carolina.$("DB")._modelClass("SessionInfo");
    let sess = await SessionInfo.$get({ sessionId: sessionId });
    
    await sess._delete();
  }
}

exports = module.exports = DbSessionService;