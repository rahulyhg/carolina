
const BaseJob = require('carolina/main/cron/jobs/base-job');

/**
 * class {{ name }}
 * A job that does a thing.
 */
class {{ name }} extends BaseJob {
  
  constructor() {
    super();
  }
  
  async handle(args) {
    let isSuccess = true;
    if (isSuccess) {
      return {
        success: true,
        message: 'Job successful!'
      };
    }
    else {
      return {
        success: false,
        message: 'Job failed!'
      };
    }
  }
}

exports = module.exports = {{ name }};