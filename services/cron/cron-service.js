
/* global Carolina */

const moment = require('moment');

const BaseService = require('carolina/services/base-service');

class CronService extends BaseService {
  
  constructor() {
    
    super('Cron');
    
    this.intervalId = null;
    this.cronTab = Carolina.config('cron.schedule', {});
    this.hasStarted = false;
    this.nextRunTimes = {};
    
    let carolinaJobs = require('carolina/main/cron/jobs');
    this._initializeLibrary('jobClasses', 'jobs', 'cron/jobs', carolinaJobs,
      'job');
      
    let carolinaSchedules = require('carolina/main/cron/schedules');
    this._initializeLibrary('scheduleClasses', 'schedules', 'cron/schedules',
      carolinaSchedules, 'schedule');
  }
  
  _job(name) {
    return this._lazyLoadObject(name, 'jobClasses', 'jobs', "job");
  }
  _schedule(name) {
    return this._lazyLoadObject(name, 'scheduleClasses', 'schedules',
      "schedule");
  }
  
  async cron() {
      
    let now = moment();
    let CronJob = Carolina.$('DB')._modelClass('CronJob');
    
    for (let cronJob in this.cronTab) {
      
      let shouldRun = false;
      
      let cj = await CronJob.$get({ identifier: cronJob });
      if (!cj) {
        cj = new CronJob({ identifier: cronJob });
      }
      
      if (!this.hasStarted) {
        shouldRun = this._schedule(
          this.cronTab[cronJob].when.schedule).shouldRunOnStart(now,
          this.cronTab[cronJob].when.conf);
      }
      if (!shouldRun) {
        if (cronJob in this.nextRunTimes) {
          if (now.isAfter(this.nextRunTimes[cronJob])) {
            shouldRun = true;
          }
        }
        else {
          let cr = await CronJob.$get({ identifier: cronJob });
          if (cr) {
            if (now.isAfter(cr.nextRunTime)) {
              shouldRun = true;
            }
          }
        }
      }
      
      if (shouldRun) {
        let result = await this._job(this.cronTab[cronJob].job).handle(
          this.cronTab[cronJob].args);
          
        let LoggerSvc = Carolina.$('Logger');
        let logLevel = 3;

        if (!result.success) {
          logLevel = 0;
        }
        
        LoggerSvc.log({
          source: 'CRON',
          level: logLevel,
          message: result.message
        });
        
        cj.lastRun = now;
        
        delete this.nextRunTimes[cronJob];
      }
      
      if (!(cronJob in this.nextRunTimes)) {
        let nextRunTime = this._schedule(
          this.cronTab[cronJob].when.schedule).nextRunTime(now,
          this.cronTab[cronJob].when.conf);
        this.nextRunTimes[cronJob] = nextRunTime;
        cj.nextRun = nextRunTime;
      }

      await cj._save();
    }
    
    this.hasStarted = true;
  }
  
  async startService() {
    
    let shouldRunCron = Carolina.config('cron.isActive', false);
    if (!shouldRunCron) return;
    
    this.intervalId = setInterval(() => this.cron(), 60000);
  }
  
  async stopService() {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
    }
  }
  
  onShutdown() {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
    }
  }
}

exports = module.exports = CronService;