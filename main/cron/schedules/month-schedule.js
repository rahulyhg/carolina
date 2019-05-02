
const moment = require('moment');

const BaseSchedule = require('carolina/main/cron/schedules/base-schedule');

class MonthSchedule extends BaseSchedule {
  
  constructor() {
    super();
  }
  
  shouldRunOnStart(time, conf={}) {
    return false;
  }
  
  nextRunTime(time, conf={}) {
    conf = {
      day: 0,
      hour: 0,
      minute: 0,
      every: 1,
      ...conf
    };
    return moment(time).add(conf.every, 'months').startOf('month').date(
      conf.day).hour(
      conf.hour).minute(conf.minute);
  }
}

exports = module.exports = MonthSchedule;