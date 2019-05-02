
const moment = require('moment');

const BaseSchedule = require('carolina/main/cron/schedules/base-schedule');

class DaySchedule extends BaseSchedule {
  
  constructor() {
    super();
  }
  
  shouldRunOnStart(time, conf={}) {
    return false;
  }
  
  nextRunTime(time, conf={}) {
    conf = {
      hour: 0,
      minute: 0,
      every: 1,
      ...conf
    };
    return moment(time).add(conf.every, 'days').startOf('day').hour(
      conf.hour).minute(conf.minute);
  }
}

exports = module.exports = DaySchedule;