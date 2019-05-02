
const BaseMiddleware = require('carolina/main/http/middleware/base-middleware');

/**
 * ModelExtractionMiddleware
 * Extracts a model from an id in the params.
 */
class ModelExtractionMiddleware extends BaseMiddleware {
  async before(request, data) {
    
    /* global Carolina */
    
    if (data.hasOwnProperty('model') && data.hasOwnProperty('param')) {
      if (request.params.hasOwnProperty(data.param)) {
        request.params[data.param] = await Carolina.$("DB")
          ._modelClass(data.model).$lookup(request.params[data.param]);
      }
    }
    
    return request;
  }
}

exports = module.exports = ModelExtractionMiddleware;