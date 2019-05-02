
const moment = require('moment');

const BaseSchedule = require('carolina/main/cron/schedules/base-schedule');

class MinuteSchedule extends BaseSchedule {
  
  constructor() {
    super();
  }
  
  nextRunTime(time, conf={}) {
    conf = { every: 1, ...conf };
    return moment(time).add(conf.every, 'minute').startOf('minute');
  }
}

exports = module.exports = MinuteSchedule;