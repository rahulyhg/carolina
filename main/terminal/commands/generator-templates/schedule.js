
const moment = require('moment');

const BaseSchedule = require('carolina/main/cron/schedules/base-schedule');

class {{ name }} extends BaseSchedule {
  
  constructor() {
    super();
  }
  
  /**
   * Whether or not it should run when the app first starts.
   */
  shouldRunOnStart(time, conf={}) {
    return  true;
  }
  
  /**
   * After running, when should it run again.
   */
  nextRunTime(time, conf={}) {
    return moment(time).add(1, 'minute').startOf('minute');
  }
}

exports = module.exports = {{ name }};