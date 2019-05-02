
const BaseController = require('carolina/main/http/controllers/base-controller');

/**
 * RedirectController
 * Used to redirect from one route to another.
 */
class RedirectController extends BaseController {
  async handle(request, data) {
    return this.redirect(data.redirectTo, data.status || 302);
  }
}

exports = module.exports = RedirectController;