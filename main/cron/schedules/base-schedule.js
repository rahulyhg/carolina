
const moment = require('moment');

class BaseSchedule {
  
  constructor() {}
  
  shouldRunOnStart(time, conf={}) {
    return true;
  }
  
  nextRunTime(time, conf={}) {
    return moment(time).add(1, 'minute').startOf('minute');
  }
}

exports = module.exports = BaseSchedule;