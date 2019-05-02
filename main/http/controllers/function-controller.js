
const BaseController = require('carolina/main/http/controllers/base-controller');

/**
 * FunctionController
 * Special controller used when the developer supplies a function instead
 * of a full controller on a route.
 */
class FunctionController extends BaseController {
  async handle(request, data) {
    let func = data.func;
    return await func(request, data.data, this);
  }
}

exports = module.exports = FunctionController;