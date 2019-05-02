
const BaseModel = require('carolina/main/db/models/base-model');
const BaseSchema = require('carolina/main/db/schemas/base-schema');

class CronJobSchema extends BaseSchema {
  
  constructor() {
    
    super();
    
    this.table = 'cron_job';
    this.fields.identifier = { type: 'String', name: 'Identifier' };
    this.fields.lastRun = { type: 'Date', name: "Last Run" };
    this.fields.nextRun = { type: 'Date', name: "Next Run" };
    
    this.adminFields = ['identifier', 'lastRun', 'nextRun'];
  }
  
  getLabel(obj) {
    return obj.identifier;
  }
}

const CronJobSchemaInstance = new CronJobSchema();

class CronJob extends BaseModel {
  constructor(obj) {
    super(obj);
  }
}

CronJob.prototype.schema = CronJobSchemaInstance;

exports = module.exports = CronJob;