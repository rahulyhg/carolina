
const moment = require('moment');

exports = module.exports = {
  'every-minute': {
    shouldRunOnStart: (time) => {
      return true;
    },
    nextRunTime: (time) => {
      return time.add(1, 'minute').startOf('minute');
    }
  },
  'every-five-minutes': {
    
  }
}