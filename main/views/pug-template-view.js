
const path = require('path');

const pug = require('pug');

const HttpResponse = require('carolina/main/http/http-response')
const BaseView = require('carolina/main/views/base-view');

/**
 * PugTemplateView
 * Returns an HttpResponse from a rendered pug template.
 */
class PugTemplateView extends BaseView {
  
  constructor() {
    super();
  }
  
  /**
   * Renders the given template.
   */
  async make(data, request=null) {
    
    /* global Carolina */
    
    let templateFilePath = path.resolve(Carolina.getPath(), "templates",
      `${data.template}.pug`);
    let localsData = data.data || {};
    
    localsData.config = Carolina._conf;
    localsData.filename = data.template;
    localsData.basedir = path.resolve(Carolina.getPath(), "templates");
    localsData.cache = true;
    localsData.request = request;
    
    try {
      let html = pug.renderFile(templateFilePath, localsData);
      let res = new HttpResponse({
        body: html
      });
      res.setHeader("Content-Type", "text/html");
      return res;
    }
    catch (err) {
      if (err.message.startsWith("ENOENT")) {
        let TemplateNotFoundError = Carolina.$("Errors")._errorClass("TemplateNotFoundError");
        throw new TemplateNotFoundError(`${data.template}.pug`);
      }
      else {
        throw err;
      }
    }
  }
}

exports = module.exports = PugTemplateView;