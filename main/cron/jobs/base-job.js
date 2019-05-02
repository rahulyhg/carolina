
class BaseJob {
  
  constructor() {
    
  }
  
  async handle(args) {
    return {
      success: true,
      message: 'BaseJob complete.'
    };
  }
}

exports = module.exports = BaseJob;