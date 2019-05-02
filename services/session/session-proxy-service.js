
const cRequire = require('carolina/_lib/c-require');
const BaseSessionService = require('carolina/services/session/base-session-service');

/**
 * service SessionProxyService
 * Proxy class for the Session core service
 */
class SessionProxyService extends BaseSessionService {
  
  constructor() {
    
    super();
    
    /* global Carolina */
    
    let SvcClass = cRequire(Carolina.config('session.service'));
    this._svc = new SvcClass();
  }
  
  async _sessionIdExists(sessionId) {
    return await this._svc.sessionIdExists(sessionId);
  }
  async getSession(id) {
    return await this._svc.getSession(id);
  }
  async saveSession(id, sess) {
    return await this._svc.saveSession(id, sess);
  }
  async newSession(sess) {
    return await this._svc.newSession(sess);
  }
  async deleteSession(id) {
    return await this._svc.deleteSession(id);
  }
}

exports = module.exports = SessionProxyService;