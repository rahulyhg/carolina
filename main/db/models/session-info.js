
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

/**
 * class SessionInfoSchema
 * Represents the schema for any SessionInfo object.
 * The SessionInfo class is used by the DbSessionService.
 */
class SessionInfoSchema extends BaseSchema {
  
  constructor() {
    
    super();
    
    this.table = "session_info";
    this.fields.sessionId = { type: "String", name: "Session ID", required: true };
    this.fields.sessionData = { type: "Json", defaultValue: {} };

    this.adminFields = ['sessionId'];
  } 
}

const SessionInfoSchemaInstance = new SessionInfoSchema();

/**
 * class SessionInfo
 * Represents a user's session.
 */
class SessionInfo extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

SessionInfo.prototype.schema = SessionInfoSchemaInstance;

exports = module.exports = SessionInfo;