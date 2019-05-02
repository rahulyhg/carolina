
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class LogEntrySchema extends BaseSchema {
  
  constructor() {

    super();

    this.table = 'log_entry';
    this.fields.source = { type: 'String', name: "Source" };
    this.fields.time = { type: 'Date', name: "Datetime" };
    this.fields.level = { type: 'Integer', name: "Level", min: 0, max: 7 };
    this.fields.levelString = { type: 'String' };
    this.fields.message = { type: 'Text' };

    this.adminFields = ['source', 'time', 'level'];
  }
}

const LogEntrySchemaInstance = new LogEntrySchema();

class LogEntry extends BaseModel {
  constructor(obj={}) {
    super(obj);
  }
}

LogEntry.prototype.schema = LogEntrySchemaInstance;

exports = module.exports = LogEntry;