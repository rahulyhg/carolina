
/* global Carolina */

const {promisify} = require('util');

const redis = require('redis');

const generateId = require('carolina/_lib/generate-id');

const BaseSessionService = require('carolina/services/session/base-session-service');

/**
 * service RedisSessionService
 * Session service that stores session in a redis server.
 * Also works with AWS ElasticCache if set up as a redis server.
 */
class RedisSessionService extends BaseSessionService {
  
  constructor() {
    
    super();
    
    this.client = redis.createClient({
      host: Carolina.config("session.redisHost"),
      port: Carolina.config("session.redisPort")
    });
    this.keysAsync = promisify(this.client.keys).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }
  
  async _sessionIdExists(sessionId) {
    let sessionKeys = await this.keysAsync();
    if (sessionKeys.indexOf(sessionId) != -1) {
      return true;
    }
    else {
      return false;
    }
  }
  
  async getSession(sessionId) {
    let sess = await this.getAsync(sessionId);
    if (!sess) return {};
    return JSON.parse(sess);
  }
  
  async saveSession(sessionId, session) {
    await this.setAsync(sessionId, JSON.stringify(session));
  }
  
  async newSession(session={}) {
    let sessId = generateId();
    await this.setAsync(sessId, JSON.stringify(session));
    return sessId;
  }
  
  async deleteSession(sessionId) {
    return this.delAsync(sessionId);
  }
}

exports = module.exports = RedisSessionService;