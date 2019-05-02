
const moment = require('moment');

const BaseSchedule = require('carolina/main/cron/schedules/base-schedule');

class HourSchedule extends BaseSchedule {
  
  constructor() {
    super();
  }
  
  shouldRunOnStart(time, conf={}) {
    return false;
  }
  
  nextRunTime(time, conf={}) {
    conf = {
      minute: 0,
      every: 1,
      ...conf
    };
    return moment(time).add(conf.every, 'hours').startOf(
      'hour').add(conf.minute,
      'minutes');
  }
}

exports = module.exports = HourSchedule;