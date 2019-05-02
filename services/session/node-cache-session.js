
/* global Carolina */

const NodeCache = require('node-cache');

const generateId = require('carolina/_lib/generate-id');

const BaseSessionService = require('carolina/services/session/base-session-service');

/**
 * service NodeCacheSessionService
 * Session service that stores session data in a node-cache.
 */
class NodeCacheSessionService extends BaseSessionService {
  
  constructor() {
    
    super();
    
    this.sessionCache = new NodeCache();
  }
  
  async _sessionIdExists(sessionId) {
    let sessionKeys = this.sessionCache.keys();
    if (sessionKeys.indexOf(sessionId) != -1) {
      return true;
    }
    else {
      return false;
    }
  }
  
  async getSession(sessionId) {
    let sess = this.sessionCache.get(sessionId);
    if (!sess) return {};
    else return sess;
  }
  
  async saveSession(sessionId, session) {
    this.sessionCache.set(sessionId, session);
  }
  
  async newSession(session={}) {
    let sessId = generateId();
    this.sessionCache.set(sessId, session);
    return sessId;
  }
  
  async deleteSession(sessionId) {
    return this.sessionCache.del(sessionId);
  }
}

exports = module.exports = NodeCacheSessionService;