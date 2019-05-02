
/* global Carolina */

const BaseController = require('carolina/main/http/controllers/base-controller');

class TemplateController extends BaseController {
  async handle(request, data) {
    let PugTemplateView = Carolina.$("Views")._view("PugTemplateView");
    return PugTemplateView.make(data, request);
  }
}

exports = module.exports = TemplateController;